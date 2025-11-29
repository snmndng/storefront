"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { requestPasswordReset, type AuthResult } from "@/app/auth-actions";
import { FormInput, SubmitButton, FormError, FormSuccess } from "@/ui/components/forms";

interface ForgotPasswordFormClientProps {
	channel: string;
	redirectUrl: string;
}

export function ForgotPasswordFormClient({ channel, redirectUrl }: ForgotPasswordFormClientProps) {
	const [state, formAction] = useActionState<AuthResult | null, FormData>(requestPasswordReset, null);
	const [clientErrors, setClientErrors] = useState<{ email?: string }>({});

	const validateForm = (formData: FormData): boolean => {
		const errors: { email?: string } = {};
		const email = formData.get("email")?.toString() || "";

		if (!email) {
			errors.email = "Email is required";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			errors.email = "Please enter a valid email address";
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
						message="If an account with that email exists, we've sent password reset instructions."
						className="mb-4"
					/>
					<div className="text-center">
						<Link
							href={`/${channel}/login`}
							className="inline-block rounded-md bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
						>
							Back to Sign In
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
					<h1 className="text-2xl font-semibold text-neutral-900">Reset your password</h1>
					<p className="mt-2 text-sm text-neutral-600">
						Enter your email address and we&apos;ll send you a link to reset your password.
					</p>
				</div>

				{state?.errors && state.errors.length > 0 && (
					<FormError errors={state.errors} className="mb-4" />
				)}

				<form action={handleSubmit} className="space-y-4">
					<input type="hidden" name="channel" value={channel} />
					<input type="hidden" name="redirectUrl" value={redirectUrl} />

					<FormInput
						label="Email"
						type="email"
						name="email"
						autoComplete="email"
						placeholder="you@example.com"
						required
						error={clientErrors.email}
					/>

					<SubmitButton loadingText="Sending...">Send reset link</SubmitButton>
				</form>

				<div className="mt-6 text-center">
					<Link
						href={`/${channel}/login`}
						className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
					>
						Back to Sign In
					</Link>
				</div>
			</div>
		</div>
	);
}
