"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus, AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react";
import { Button } from "@/ui/components/Button";

export function RegisterForm() {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		password: "",
		confirmPassword: "",
		newsletter: false,
		terms: false,
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [errors, setErrors] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const router = useRouter();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setErrors([]);

		// Validation
		const validationErrors: string[] = [];

		if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
			validationErrors.push("All required fields must be filled");
		}

		if (formData.password !== formData.confirmPassword) {
			validationErrors.push("Passwords do not match");
		}

		if (formData.password.length < 8) {
			validationErrors.push("Password must be at least 8 characters long");
		}

		if (!formData.terms) {
			validationErrors.push("You must agree to the Terms of Service and Privacy Policy");
		}

		if (validationErrors.length > 0) {
			setErrors(validationErrors);
			setIsLoading(false);
			return;
		}

		try {
			// Simulate registration API call
			const response = await fetch("/api/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				setSuccess(true);
				setTimeout(() => {
					router.push("/login?registered=true");
				}, 2000);
			} else {
				if (response.status === 409) {
					setErrors(["An account with this email already exists. Please sign in instead."]);
				} else {
					try {
						const errorData = (await response.json()) as { message?: string };
						setErrors([errorData.message || "Registration failed. Please try again."]);
					} catch {
						setErrors(["Registration failed. Please try again."]);
					}
				}
			}
		} catch (error) {
			setErrors([
				"Unable to create account at the moment.",
				"Please check your internet connection and try again.",
			]);
		} finally {
			setIsLoading(false);
		}
	};

	if (success) {
		return (
			<div className="mx-auto mt-16 w-full max-w-lg">
				<div className="rounded-lg border border-green-200 bg-green-50 p-8 text-center">
					<CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-600" />
					<h1 className="mb-2 text-2xl font-bold text-green-800">Account Created Successfully!</h1>
					<p className="mb-4 text-green-700">
						Welcome to Luxiorstore! You will be redirected to the login page shortly.
					</p>
					<Link
						href="/login"
						className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
					>
						Continue to Login
					</Link>
				</div>
			</div>
		);
	}
	return (
		<div className="mx-auto mt-16 w-full max-w-lg">
			<div className="mb-8 text-center">
				<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500">
					<UserPlus className="h-8 w-8 text-white" />
				</div>
				<h1 className="mb-2 text-3xl font-bold text-gray-900">Create Account</h1>
				<p className="text-gray-600">Join Luxiorstore for an exclusive shopping experience</p>
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
						</div>
					</div>
				</div>
			)}

			<form className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm" onSubmit={handleSubmit}>
				<div className="mb-4 grid gap-4 md:grid-cols-2">
					<div>
						<label htmlFor="firstName" className="mb-2 block text-sm font-medium text-gray-700">
							First Name *
						</label>
						<input
							type="text"
							name="firstName"
							id="firstName"
							value={formData.firstName}
							onChange={handleInputChange}
							required
							placeholder="Enter your first name"
							className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
						/>
					</div>
					<div>
						<label htmlFor="lastName" className="mb-2 block text-sm font-medium text-gray-700">
							Last Name *
						</label>
						<input
							type="text"
							name="lastName"
							id="lastName"
							value={formData.lastName}
							onChange={handleInputChange}
							required
							placeholder="Enter your last name"
							className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
						/>
					</div>
				</div>

				<div className="mb-4">
					<label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
						Email Address *
					</label>
					<input
						type="email"
						name="email"
						id="email"
						value={formData.email}
						onChange={handleInputChange}
						required
						placeholder="Enter your email address"
						className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
					/>
				</div>

				<div className="mb-4">
					<label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
						Phone Number
					</label>
					<input
						type="tel"
						name="phone"
						id="phone"
						value={formData.phone}
						onChange={handleInputChange}
						placeholder="+254 7XX XXX XXX"
						className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
					/>
				</div>

				<div className="mb-4">
					<label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
						Password *
					</label>
					<div className="relative">
						<input
							type={showPassword ? "text" : "password"}
							name="password"
							id="password"
							value={formData.password}
							onChange={handleInputChange}
							required
							minLength={8}
							placeholder="Create a strong password"
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

				<div className="mb-6">
					<label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-gray-700">
						Confirm Password *
					</label>
					<div className="relative">
						<input
							type={showConfirmPassword ? "text" : "password"}
							name="confirmPassword"
							id="confirmPassword"
							value={formData.confirmPassword}
							onChange={handleInputChange}
							required
							minLength={8}
							placeholder="Confirm your password"
							className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 pr-12 text-gray-900 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
						/>
						<button
							type="button"
							onClick={() => setShowConfirmPassword(!showConfirmPassword)}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
						>
							{showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
						</button>
					</div>
				</div>

				<div className="mb-6 space-y-3">
					<label className="flex items-start space-x-3">
						<input
							type="checkbox"
							name="newsletter"
							checked={formData.newsletter}
							onChange={handleInputChange}
							className="mt-1 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
						/>
						<span className="text-sm text-gray-700">
							Subscribe to our newsletter for exclusive offers and updates
						</span>
					</label>
					<label className="flex items-start space-x-3">
						<input
							type="checkbox"
							name="terms"
							checked={formData.terms}
							onChange={handleInputChange}
							required
							className="mt-1 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
						/>
						<span className="text-sm text-gray-700">
							I agree to the{" "}
							<Link href="/terms" className="text-amber-600 hover:underline">
								Terms of Service
							</Link>{" "}
							and{" "}
							<Link href="/privacy" className="text-amber-600 hover:underline">
								Privacy Policy
							</Link>
						</span>
					</label>
				</div>

				<Button
					type="submit"
					variant="primary"
					size="lg"
					fullWidth
					loading={isLoading}
					disabled={isLoading}
					icon={<UserPlus className="h-5 w-5" />}
				>
					{isLoading ? "Creating Account..." : "Create Account"}
				</Button>
			</form>

			<div className="mt-6 text-center">
				<p className="text-sm text-gray-600">
					Already have an account?{" "}
					<Link
						href="/login"
						className="font-medium text-amber-600 transition-colors hover:text-amber-700 hover:underline"
					>
						Sign in here
					</Link>
				</p>
			</div>

			<div className="mt-8 rounded-lg bg-amber-50 p-6">
				<h3 className="mb-3 font-medium text-amber-800">Why Join Luxiorstore?</h3>
				<ul className="space-y-2 text-sm text-amber-700">
					<li>• Exclusive access to luxury collections</li>
					<li>• Personalized product recommendations</li>
					<li>• Early access to sales and promotions</li>
					<li>• Order tracking and history</li>
					<li>• VIP customer support</li>
					<li>• Invitations to exclusive events</li>
				</ul>
			</div>
		</div>
	);
}
