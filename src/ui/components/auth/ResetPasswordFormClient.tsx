"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { setPassword, type AuthResult } from "@/app/auth-actions";
import { FormInput, SubmitButton, FormError, FormSuccess } from "@/ui/components/forms";

interface ResetPasswordFormClientProps {
	channel: string;
	email: string;
	token: string;
}

export function ResetPasswordFormClient({ channel, email, token }: ResetPasswordFormClientProps) {
	const [state, formAction] = useActionState<AuthResult | null, FormData>(setPassword, null);
	const [clientErrors, setClientErrors] = useState<{
		password?: string;
		confirmPassword?: string;
	}>({});

	const validateForm = (formData: FormData): boolean => {
		const errors: typeof clientErrors = {};
		const password = formData.get("password")?.toString() || "";
		const confirmPassword = formData.get("confirmPassword")?.toString() || "";

		if (!password) {
			errors.password = "Password is required";
		} else if (password.length < 8) {
			errors.password = "Password must be at least 8 characters";
		} else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
			errors.password = "Password must contain uppercase, lowercase, and a number";
		}

		if (password !== confirmPassword) {
			errors.confirmPassword = "Passwords do not match";
		}

		setClientErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = (formData: FormData) => {
		if (validateForm(formData)) {
			formAction(formData);
		}
	};

	if (state?.success) {
		return (
			<div className="mx-auto w-full max-w-md">
				<div className="rounded-lg border border-neutral-200 bg-white p-8 shadow-sm">
					<FormSuccess
						message="Your password has been reset successfully!"
						className="mb-4"
					/>
					<div className="text-center">
						<Link
							href={`/${channel}/login`}
							className="inline-block rounded-md bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
						>
							Sign In
						</Link>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="mx-auto w-full max-w-md">
			<div className="rounded-lg border border-neutral-200 bg-white p-8 shadow-sm">
				<div className="mb-6 text-center">
					<h1 className="text-2xl font-semibold text-neutral-900">Set new password</h1>
					<p className="mt-2 text-sm text-neutral-600">
						Enter your new password below.
					</p>
				</div>

				{state?.errors && state.errors.length > 0 && (
					<FormError errors={state.errors} className="mb-4" />
				)}

				<form action={handleSubmit} className="space-y-4">
					<input type="hidden" name="email" value={email} />
					<input type="hidden" name="token" value={token} />

					<FormInput
						label="New Password"
						type="password"
						name="password"
						autoComplete="new-password"
						placeholder="At least 8 characters"
						required
						error={clientErrors.password}
					/>

					<FormInput
						label="Confirm New Password"
						type="password"
						name="confirmPassword"
						autoComplete="new-password"
						placeholder="Confirm your password"
						required
						error={clientErrors.confirmPassword}
					/>

					<SubmitButton loadingText="Setting password...">Set new password</SubmitButton>
				</form>
			</div>
		</div>
	);
}
