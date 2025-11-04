import { Suspense } from "react";
import { Loader } from "@/ui/atoms/Loader";
import { ResetPasswordForm } from "@/ui/components/ResetPasswordForm";

export const metadata = {
	title: "Reset Password - Luxiorstore",
	description: "Create a new password for your Luxiorstore account.",
};

export default function ResetPasswordPage() {
	return (
		<Suspense fallback={<Loader />}>
			<section className="mx-auto max-w-7xl p-8">
				<div className="mx-auto max-w-md">
					<div className="mb-8 text-center">
						<h1 className="mb-2 text-3xl font-bold text-gray-900">Reset Password</h1>
						<p className="text-gray-600">Enter your new password below to complete the reset process.</p>
					</div>
					<ResetPasswordForm />
				</div>
			</section>
		</Suspense>
	);
}
