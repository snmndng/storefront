"use server";

import { redirect } from "next/navigation";
import { getServerAuthClient } from "@/app/config";
import { executeGraphQL } from "@/lib/graphql";
import { AccountRegisterDocument } from "@/gql/graphql";

export async function login(email: string, password: string, channel: string = "default-channel") {
	"use server";

	try {
		const authClient = await getServerAuthClient();
		const result = await authClient.signIn({ email, password });

		if (result.data?.tokenCreate?.errors?.length) {
			const errors = result.data.tokenCreate.errors;
			return {
				success: false,
				errors: errors.map((error) => error.message || "Login failed"),
			};
		}

		if (result.data?.tokenCreate?.token) {
			// Login successful, redirect to account page
			redirect(`/${channel}/account`);
		}

		return {
			success: false,
			errors: ["Invalid email or password"],
		};
	} catch (error) {
		console.error("Login error:", error);
		return {
			success: false,
			errors: ["An error occurred during login. Please try again."],
		};
	}
}

export async function logout() {
	"use server";
	(await getServerAuthClient()).signOut();
	redirect("/");
}

export async function register(formData: {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	channel?: string;
}) {
	"use server";

	try {
		const result = await executeGraphQL(AccountRegisterDocument, {
			variables: {
				input: {
					email: formData.email,
					password: formData.password,
					firstName: formData.firstName,
					lastName: formData.lastName,
					channel: formData.channel || "default-channel",
				},
			},
			withAuth: false,
		});

		if (result.accountRegister?.errors?.length) {
			const errors = result.accountRegister.errors;
			return {
				success: false,
				errors: errors.map((error) => error.message || "Registration failed"),
			};
		}

		if (result.accountRegister?.user) {
			// Registration successful
			return {
				success: true,
				user: result.accountRegister.user,
			};
		}

		return {
			success: false,
			errors: ["Registration failed. Please try again."],
		};
	} catch (error) {
		console.error("Registration error:", error);
		return {
			success: false,
			errors: ["An error occurred during registration. Please try again."],
		};
	}
}
