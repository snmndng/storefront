"use client";

import { useActionState, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateAccount, type AuthResult } from "@/app/auth-actions";
import { FormInput, SubmitButton, FormError, FormSuccess } from "@/ui/components/forms";

interface ProfileFormProps {
        initialFirstName: string;
        initialLastName: string;
}

export function ProfileForm({ initialFirstName, initialLastName }: ProfileFormProps) {
        const router = useRouter();
        const [state, formAction] = useActionState<AuthResult | null, FormData>(updateAccount, null);
        const [clientErrors, setClientErrors] = useState<{
                firstName?: string;
                lastName?: string;
        }>({});

        useEffect(() => {
                if (state?.success) {
                        router.refresh();
                }
        }, [state?.success, router]);

        const validateForm = (formData: FormData): boolean => {
                const errors: typeof clientErrors = {};
                const firstName = formData.get("firstName")?.toString() || "";
                const lastName = formData.get("lastName")?.toString() || "";

                if (!firstName.trim()) {
                        errors.firstName = "First name is required";
                }

                if (!lastName.trim()) {
                        errors.lastName = "Last name is required";
                }

                setClientErrors(errors);
                return Object.keys(errors).length === 0;
        };

        const handleSubmit = (formData: FormData) => {
                if (validateForm(formData)) {
                        formAction(formData);
                }
        };

        return (
                <div className="rounded-lg border border-neutral-200 bg-white p-6">
                        <h2 className="text-lg font-semibold text-neutral-900 mb-4">Personal Information</h2>

                        {state?.success && (
                                <FormSuccess message="Profile updated successfully!" className="mb-4" />
                        )}

                        {state?.errors && state.errors.length > 0 && (
                                <FormError errors={state.errors} className="mb-4" />
                        )}

                        <form action={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <FormInput
                                                label="First name"
                                                type="text"
                                                name="firstName"
                                                defaultValue={initialFirstName}
                                                autoComplete="given-name"
                                                required
                                                error={clientErrors.firstName}
                                        />

                                        <FormInput
                                                label="Last name"
                                                type="text"
                                                name="lastName"
                                                defaultValue={initialLastName}
                                                autoComplete="family-name"
                                                required
                                                error={clientErrors.lastName}
                                        />
                                </div>

                                <div className="pt-2">
                                        <SubmitButton loadingText="Saving..." className="w-auto px-6">
                                                Save Changes
                                        </SubmitButton>
                                </div>
                        </form>
                </div>
        );
}
