import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/ui/components/Button";

export function ForgotPasswordForm() {
	return (
		<div className="w-full">
			<form
				className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm"
				action={async (formData) => {
					"use server";

					const email = formData.get("email")?.toString();

					if (!email) {
						throw new Error("Email is required");
					}

					// TODO: Implement password reset logic
					console.log("Password reset requested for:", email);
				}}
			>
				<div className="mb-6">
					<label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
						Email Address
					</label>
					<input
						type="email"
						name="email"
						id="email"
						required
						placeholder="Enter your email address"
						className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
					/>
				</div>

				<Button type="submit" variant="primary" size="lg" fullWidth icon={<Mail className="h-5 w-5" />}>
					Send Reset Link
				</Button>
			</form>

			<div className="mt-6 text-center">
				<Link
					href="/login"
					className="inline-flex items-center space-x-2 text-sm text-amber-600 transition-colors hover:text-amber-700"
				>
					<ArrowLeft className="h-4 w-4" />
					<span>Back to Login</span>
				</Link>
			</div>

			<div className="mt-8 rounded-lg bg-amber-50 p-4">
				<h3 className="mb-2 font-medium text-amber-800">Need Help?</h3>
				<p className="text-sm text-amber-700">
					If you&apos;re having trouble resetting your password, please{" "}
					<Link href="/contact" className="underline hover:no-underline">
						contact our support team
					</Link>{" "}
					for assistance.
				</p>
			</div>
		</div>
	);
}
