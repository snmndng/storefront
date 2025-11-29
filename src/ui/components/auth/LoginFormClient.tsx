"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login, type AuthResult } from "@/app/auth-actions";
import { FormInput, SubmitButton, FormError } from "@/ui/components/forms";

interface LoginFormClientProps {
	channel: string;
	redirectTo?: string;
}

export function LoginFormClient({ channel, redirectTo = `/${channel}` }: LoginFormClientProps) {
	const router = useRouter();
	const [state, formAction] = useActionState<AuthResult | null, FormData>(login, null);
	const [clientErrors, setClientErrors] = useState<{ email?: string; password?: string }>({});

	const validateForm = (formData: FormData): boolean => {
		const errors: { email?: string; password?: string } = {};
		const email = formData.get("email")?.toString() || "";
		const password = formData.get("password")?.toString() || "";

		if (!email) {
			errors.email = "Email is required";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			errors.email = "Please enter a valid email address";
		}

		if (!password) {
			errors.password = "Password is required";
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
		if (state?.success) {
			router.refresh();
		}
	}, [state?.success, router]);

	return (
		<div className="mx-auto w-full max-w-md">
			<div className="rounded-lg border border-neutral-200 bg-white p-8 shadow-sm">
				<div className="mb-6 text-center">
					<h1 className="text-2xl font-semibold text-neutral-900">Welcome back</h1>
					<p className="mt-2 text-sm text-neutral-600">
						Sign in to your account to continue
					</p>
				</div>

				{state?.errors && state.errors.length > 0 && (
					<FormError errors={state.errors} className="mb-4" />
				)}

				<form action={handleSubmit} className="space-y-4">
					<input type="hidden" name="redirectTo" value={redirectTo} />

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
						autoComplete="current-password"
						placeholder="Enter your password"
						required
						error={clientErrors.password}
					/>

					<div className="flex items-center justify-end">
						<Link
							href={`/${channel}/forgot-password`}
							className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
						>
							Forgot your password?
						</Link>
					</div>

					<SubmitButton loadingText="Signing in...">Sign in</SubmitButton>
				</form>

				<div className="mt-6 text-center">
					<p className="text-sm text-neutral-600">
						Don&apos;t have an account?{" "}
						<Link
							href={`/${channel}/register`}
							className="font-medium text-neutral-900 hover:underline"
						>
							Create one
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
