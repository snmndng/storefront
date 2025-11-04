import Link from "next/link";
import { Lock } from "lucide-react";
import { Button } from "@/ui/components/Button";

export function ResetPasswordForm() {
	return (
		<div className="w-full">
			<form
				className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm"
				action={async (formData) => {
					"use server";

					const password = formData.get("password")?.toString();
					const confirmPassword = formData.get("confirmPassword")?.toString();

					if (!password || !confirmPassword) {
						throw new Error("Both password fields are required");
					}

					if (password !== confirmPassword) {
						throw new Error("Passwords do not match");
					}

					// TODO: Implement password reset logic
					console.log("Password reset completed");
				}}
			>
				<div className="mb-4">
					<label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
						New Password
					</label>
					<input
						type="password"
						name="password"
						id="password"
						required
						minLength={8}
						placeholder="Enter your new password"
						className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
					/>
				</div>

				<div className="mb-6">
					<label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-gray-700">
						Confirm New Password
					</label>
					<input
						type="password"
						name="confirmPassword"
						id="confirmPassword"
						required
						minLength={8}
						placeholder="Confirm your new password"
						className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
					/>
				</div>

				<div className="mb-6 rounded-lg bg-blue-50 p-4">
					<h4 className="mb-2 font-medium text-blue-800">Password Requirements:</h4>
					<ul className="space-y-1 text-sm text-blue-700">
						<li>• At least 8 characters long</li>
						<li>• Include uppercase and lowercase letters</li>
						<li>• Include at least one number</li>
						<li>• Include at least one special character</li>
					</ul>
				</div>

				<Button type="submit" variant="primary" size="lg" fullWidth icon={<Lock className="h-5 w-5" />}>
					Reset Password
				</Button>
			</form>

			<div className="mt-6 text-center">
				<Link href="/login" className="text-sm text-amber-600 transition-colors hover:text-amber-700">
					Back to Login
				</Link>
			</div>
		</div>
	);
}
