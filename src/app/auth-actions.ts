"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerAuthClient } from "@/app/config";
import { executeGraphQL } from "@/lib/graphql";
import {
        AccountRegisterDocument,
        RequestPasswordResetDocument,
        SetPasswordDocument,
        ConfirmAccountDocument,
        AccountUpdateDocument,
} from "@/gql/graphql";

export type AuthError = {
        field: string | null;
        message: string | null;
        code: string;
};

export type AuthResult = {
        success: boolean;
        errors: AuthError[];
        requiresConfirmation?: boolean;
};

export async function login(
        _prevState: AuthResult | null,
        formData: FormData
): Promise<AuthResult> {
        const email = formData.get("email")?.toString();
        const password = formData.get("password")?.toString();
        const redirectTo = formData.get("redirectTo")?.toString() || "/";

        if (!email || !password) {
                return {
                        success: false,
                        errors: [{ field: null, message: "Email and password are required", code: "REQUIRED" }],
                };
        }

        try {
                const authClient = await getServerAuthClient();
                const { data } = await authClient.signIn({ email, password }, { cache: "no-store" });

                if (data.tokenCreate.errors.length > 0) {
                        return {
                                success: false,
                                errors: data.tokenCreate.errors.map((error: { field?: string | null; message?: string | null; code?: string }) => ({
                                        field: error.field ?? null,
                                        message: error.message ?? null,
                                        code: error.code ?? "UNKNOWN",
                                })),
                        };
                }

                revalidatePath("/");
        } catch (error) {
                return {
                        success: false,
                        errors: [{ field: null, message: "An unexpected error occurred", code: "UNKNOWN" }],
                };
        }

        redirect(redirectTo);
}

export async function register(
        _prevState: AuthResult | null,
        formData: FormData
): Promise<AuthResult> {
        const email = formData.get("email")?.toString();
        const password = formData.get("password")?.toString();
        const firstName = formData.get("firstName")?.toString() || "";
        const lastName = formData.get("lastName")?.toString() || "";
        const channel = formData.get("channel")?.toString() || "default-channel";
        const redirectUrl = formData.get("redirectUrl")?.toString() || "";

        if (!email || !password) {
                return {
                        success: false,
                        errors: [{ field: null, message: "Email and password are required", code: "REQUIRED" }],
                };
        }

        try {
                const result = await executeGraphQL(AccountRegisterDocument, {
                        variables: {
                                input: {
                                        email,
                                        password,
                                        firstName,
                                        lastName,
                                        channel,
                                        redirectUrl,
                                },
                        },
                        cache: "no-store",
                });

                if (result.accountRegister?.errors && result.accountRegister.errors.length > 0) {
                        return {
                                success: false,
                                errors: result.accountRegister.errors.map((error) => ({
                                        field: error.field ?? null,
                                        message: error.message ?? null,
                                        code: error.code ?? "UNKNOWN",
                                })),
                        };
                }

                return {
                        success: true,
                        errors: [],
                        requiresConfirmation: result.accountRegister?.requiresConfirmation ?? false,
                };
        } catch (error) {
                return {
                        success: false,
                        errors: [{ field: null, message: "An unexpected error occurred", code: "UNKNOWN" }],
                };
        }
}

export async function requestPasswordReset(
        _prevState: AuthResult | null,
        formData: FormData
): Promise<AuthResult> {
        const email = formData.get("email")?.toString();
        const channel = formData.get("channel")?.toString() || "default-channel";
        const redirectUrl = formData.get("redirectUrl")?.toString() || "";

        if (!email) {
                return {
                        success: false,
                        errors: [{ field: "email", message: "Email is required", code: "REQUIRED" }],
                };
        }

        try {
                const result = await executeGraphQL(RequestPasswordResetDocument, {
                        variables: {
                                email,
                                channel,
                                redirectUrl,
                        },
                        cache: "no-store",
                });

                if (result.requestPasswordReset?.errors && result.requestPasswordReset.errors.length > 0) {
                        return {
                                success: false,
                                errors: result.requestPasswordReset.errors.map((error) => ({
                                        field: error.field ?? null,
                                        message: error.message ?? null,
                                        code: error.code ?? "UNKNOWN",
                                })),
                        };
                }

                return { success: true, errors: [] };
        } catch (error) {
                return {
                        success: false,
                        errors: [{ field: null, message: "An unexpected error occurred", code: "UNKNOWN" }],
                };
        }
}

export async function setPassword(
        _prevState: AuthResult | null,
        formData: FormData
): Promise<AuthResult> {
        const email = formData.get("email")?.toString();
        const password = formData.get("password")?.toString();
        const token = formData.get("token")?.toString();

        if (!email || !password || !token) {
                return {
                        success: false,
                        errors: [{ field: null, message: "All fields are required", code: "REQUIRED" }],
                };
        }

        try {
                const result = await executeGraphQL(SetPasswordDocument, {
                        variables: {
                                email,
                                password,
                                token,
                        },
                        cache: "no-store",
                });

                if (result.setPassword?.errors && result.setPassword.errors.length > 0) {
                        return {
                                success: false,
                                errors: result.setPassword.errors.map((error) => ({
                                        field: error.field ?? null,
                                        message: error.message ?? null,
                                        code: error.code ?? "UNKNOWN",
                                })),
                        };
                }

                return { success: true, errors: [] };
        } catch (error) {
                return {
                        success: false,
                        errors: [{ field: null, message: "An unexpected error occurred", code: "UNKNOWN" }],
                };
        }
}

export async function confirmAccount(
        _prevState: AuthResult | null,
        formData: FormData
): Promise<AuthResult> {
        const email = formData.get("email")?.toString();
        const token = formData.get("token")?.toString();

        if (!email || !token) {
                return {
                        success: false,
                        errors: [{ field: null, message: "Email and token are required", code: "REQUIRED" }],
                };
        }

        try {
                const result = await executeGraphQL(ConfirmAccountDocument, {
                        variables: {
                                email,
                                token,
                        },
                        cache: "no-store",
                });

                if (result.confirmAccount?.errors && result.confirmAccount.errors.length > 0) {
                        return {
                                success: false,
                                errors: result.confirmAccount.errors.map((error) => ({
                                        field: error.field ?? null,
                                        message: error.message ?? null,
                                        code: error.code ?? "UNKNOWN",
                                })),
                        };
                }

                return { success: true, errors: [] };
        } catch (error) {
                return {
                        success: false,
                        errors: [{ field: null, message: "An unexpected error occurred", code: "UNKNOWN" }],
                };
        }
}

export async function updateAccount(
        _prevState: AuthResult | null,
        formData: FormData
): Promise<AuthResult> {
        const firstName = formData.get("firstName")?.toString() || "";
        const lastName = formData.get("lastName")?.toString() || "";

        try {
                const result = await executeGraphQL(AccountUpdateDocument, {
                        variables: {
                                input: {
                                        firstName,
                                        lastName,
                                },
                        },
                        cache: "no-store",
                });

                if (result.accountUpdate?.errors && result.accountUpdate.errors.length > 0) {
                        return {
                                success: false,
                                errors: result.accountUpdate.errors.map((error) => ({
                                        field: error.field ?? null,
                                        message: error.message ?? null,
                                        code: error.code ?? "UNKNOWN",
                                })),
                        };
                }

                revalidatePath("/");
                return { success: true, errors: [] };
        } catch (error) {
                return {
                        success: false,
                        errors: [{ field: null, message: "An unexpected error occurred", code: "UNKNOWN" }],
                };
        }
}

export async function logout() {
        const authClient = await getServerAuthClient();
        authClient.signOut();
        revalidatePath("/");
}
