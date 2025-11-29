"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { register, type AuthResult } from "@/app/auth-actions";
import { FormInput, SubmitButton, FormError, FormSuccess } from "@/ui/components/forms";

interface RegisterFormClientProps {
	channel: string;
	redirectUrl: string;
}

export function RegisterFormClient({ channel, redirectUrl }: RegisterFormClientProps) {
	const router = useRouter();
	const [state, formAction] = useActionState<AuthResult | null, FormData>(register, null);
	const [clientErrors, setClientErrors] = useState<{
		firstName?: string;
		lastName?: string;
		email?: string;
		password?: string;
		confirmPassword?: string;
	}>({});

	const validateForm = (formData: FormData): boolean => {
		const errors: typeof clientErrors = {};
		const firstName = formData.get("firstName")?.toString() || "";
		const lastName = formData.get("lastName")?.toString() || "";
		const email = formData.get("email")?.toString() || "";
		const password = formData.get("password")?.toString() || "";
		const confirmPassword = formData.get("confirmPassword")?.toString() || "";

		if (!firstName.trim()) {
			errors.firstName = "First name is required";
		}

		if (!lastName.trim()) {
			errors.lastName = "Last name is required";
		}

		if (!email) {
			errors.email = "Email is required";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			errors.email = "Please enter a valid email address";
		}

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

	useEffect(() => {
		if (state?.success && !state.requiresConfirmation) {
			router.push(`/${channel}/login?registered=true`);
		}
	}, [state?.success, state?.requiresConfirmation, router, channel]);

	if (state?.success) {
		return (
			<div className="mx-auto w-full max-w-md">
				<div className="rounded-lg border border-neutral-200 bg-white p-8 shadow-sm">
					<FormSuccess
						message={
							state.requiresConfirmation
								? "Account created! Please check your email to verify your account."
								: "Account created successfully! You can now sign in."
						}
						className="mb-4"
					/>
					<div className="text-center">
						<Link
							href={`/${channel}/login`}
							className="inline-block rounded-md bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
						>
							Go to Sign In
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
					<h1 className="text-2xl font-semibold text-neutral-900">Create an account</h1>
					<p className="mt-2 text-sm text-neutral-600">
						Join us to start shopping
					</p>
				</div>

				{state?.errors && state.errors.length > 0 && (
					<FormError errors={state.errors} className="mb-4" />
				)}

				<form action={handleSubmit} className="space-y-4">
					<input type="hidden" name="channel" value={channel} />
					<input type="hidden" name="redirectUrl" value={redirectUrl} />

					<div className="grid grid-cols-2 gap-4">
						<FormInput
							label="First name"
							type="text"
							name="firstName"
							autoComplete="given-name"
							placeholder="John"
							required
							error={clientErrors.firstName}
						/>

						<FormInput
							label="Last name"
							type="text"
							name="lastName"
							autoComplete="family-name"
							placeholder="Doe"
							required
							error={clientErrors.lastName}
						/>
					</div>

					<FormInput
						label="Email"
						type="email"
						name="email"
						autoComplete="email"
						placeholder="you@example.com"
						required
						error={clientErrors.email}
					/>

					<FormInput
						label="Password"
						type="password"
						name="password"
						autoComplete="new-password"
						placeholder="At least 8 characters"
						required
						error={clientErrors.password}
					/>

					<FormInput
						label="Confirm password"
						type="password"
						name="confirmPassword"
						autoComplete="new-password"
						placeholder="Confirm your password"
						required
						error={clientErrors.confirmPassword}
					/>

					<SubmitButton loadingText="Creating account...">Create account</SubmitButton>
				</form>

				<div className="mt-6 text-center">
					<p className="text-sm text-neutral-600">
						Already have an account?{" "}
						<Link
							href={`/${channel}/login`}
							className="font-medium text-neutral-900 hover:underline"
						>
							Sign in
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
