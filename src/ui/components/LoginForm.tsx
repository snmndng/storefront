"use client";

import { useState, useTransition } from "react";
import { useParams } from "next/navigation";
import { LogIn, User, AlertCircle, Eye, EyeOff } from "lucide-react";
import { Button } from "@/ui/components/Button";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";
import { login } from "@/app/actions";

export function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState<string[]>([]);
	const [isPending, startTransition] = useTransition();
	const { channel } = useParams<{ channel?: string }>();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setErrors([]);

		if (!email || !password) {
			setErrors(["Email and password are required"]);
			return;
		}

		startTransition(async () => {
			try {
				const defaultChannel = process.env.NEXT_PUBLIC_CHANNEL || "default-channel";
				const currentChannel = (channel as string) || defaultChannel;
				const result = await login(email, password, currentChannel);

				if (!result.success) {
					setErrors(result.errors || ["Login failed. Please try again."]);
				}
				// If successful, the login action will handle the redirect
			} catch (error) {
				// Don't show error for redirects (which are expected on successful login)
				if (error instanceof Error && error.message === "NEXT_REDIRECT") {
					return; // Redirect is happening, don't show error
				}
				console.error("Login error:", error);
				setErrors(["An unexpected error occurred. Please try again."]);
			}
		});
	};

	return (
		<div className="mx-auto mt-16 w-full max-w-lg">
			<div className="mb-8 text-center">
				<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500">
					<User className="h-8 w-8 text-white" />
				</div>
				<h1 className="mb-2 text-3xl font-bold text-gray-900">Welcome Back</h1>
				<p className="text-gray-600">Sign in to your Luxiorstore account</p>
			</div>

			{/* Error Messages */}
			{errors.length > 0 && (
				<div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
					<div className="flex items-start">
						<AlertCircle className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
						<div>
							{errors.map((error, index) => (
								<p key={index} className="text-sm text-red-700">
									{error}
								</p>
							))}
							<div className="mt-3">
								<LinkWithChannel
									href="/register"
									className="text-sm font-medium text-red-600 underline hover:text-red-500"
								>
									Don&apos;t have an account? Create one here →
								</LinkWithChannel>
							</div>
							{process.env.NODE_ENV === "development" && (
								<div className="mt-3">
									<LinkWithChannel
										href="/debug-auth"
										className="text-sm font-medium text-blue-600 underline hover:text-blue-500"
									>
										Debug Authentication →
									</LinkWithChannel>
								</div>
							)}
						</div>
					</div>
				</div>
			)}

			<form className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm" onSubmit={handleSubmit}>
				<div className="mb-4">
					<label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
						Email Address
					</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						placeholder="Enter your email address"
						className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
					/>
				</div>
				<div className="mb-6">
					<label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
						Password
					</label>
					<div className="relative">
						<input
							type={showPassword ? "text" : "password"}
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							placeholder="Enter your password"
							autoCapitalize="off"
							autoComplete="current-password"
							className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 pr-12 text-gray-900 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
						>
							{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
						</button>
					</div>
				</div>

				<div className="mb-6 flex items-center justify-between">
					<label className="flex items-center">
						<input
							type="checkbox"
							name="remember"
							className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
						/>
						<span className="ml-2 text-sm text-gray-600">Remember me</span>
					</label>
					<LinkWithChannel
						href="/forgot-password"
						className="text-sm text-amber-600 transition-colors hover:text-amber-700 hover:underline"
					>
						Forgot password?
					</LinkWithChannel>
				</div>

				<Button
					type="submit"
					variant="primary"
					size="lg"
					fullWidth
					loading={isPending}
					disabled={isPending}
					icon={<LogIn className="h-5 w-5" />}
				>
					{isPending ? "Signing In..." : "Sign In"}
				</Button>
			</form>

			<div className="mt-6 text-center">
				<p className="text-sm text-gray-600">
					Don&apos;t have an account?{" "}
					<LinkWithChannel
						href="/register"
						className="font-medium text-amber-600 transition-colors hover:text-amber-700 hover:underline"
					>
						Create one here
					</LinkWithChannel>
				</p>
			</div>

			<div className="mt-8 rounded-lg bg-amber-50 p-4">
				<h3 className="mb-2 font-medium text-amber-800">New to Luxiorstore?</h3>
				<p className="text-sm text-amber-700">
					Create an account to enjoy exclusive benefits, track your orders, and get personalized
					recommendations.
				</p>
			</div>
		</div>
	);
}
