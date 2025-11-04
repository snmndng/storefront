import { Suspense } from "react";
import { Loader } from "@/ui/atoms/Loader";
import { ForgotPasswordForm } from "@/ui/components/ForgotPasswordForm";

export const metadata = {
	title: "Forgot Password - Luxiorstore",
	description: "Reset your password to regain access to your Luxiorstore account.",
};

export default function ForgotPasswordPage() {
	return (
		<Suspense fallback={<Loader />}>
			<section className="mx-auto max-w-7xl p-8">
				<div className="mx-auto max-w-md">
					<div className="mb-8 text-center">
						<h1 className="mb-2 text-3xl font-bold text-gray-900">Forgot Password?</h1>
						<p className="text-gray-600">
							Enter your email address and we&apos;ll send you a link to reset your password.
						</p>
					</div>
					<ForgotPasswordForm />
				</div>
			</section>
		</Suspense>
	);
}
