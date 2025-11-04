"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Gift, Star, Zap, Users, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/ui/components/Button";

const benefits = [
	{
		icon: <Gift className="h-6 w-6" />,
		title: "Exclusive Offers",
		description: "Get first access to sales, special discounts, and member-only promotions",
	},
	{
		icon: <Star className="h-6 w-6" />,
		title: "New Arrivals",
		description: "Be the first to discover our latest luxury collections and limited editions",
	},
	{
		icon: <Zap className="h-6 w-6" />,
		title: "Style Tips",
		description: "Receive expert styling advice and luxury lifestyle content",
	},
	{
		icon: <Users className="h-6 w-6" />,
		title: "VIP Events",
		description: "Invitations to exclusive events, trunk shows, and private shopping sessions",
	},
];

export function NewsletterSignup() {
	const [formData, setFormData] = useState({
		email: "",
		firstName: "",
		preferences: [] as string[],
	});
	const [isLoading, setIsLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [errors, setErrors] = useState<string[]>([]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;

		if (type === "checkbox" && name === "preferences") {
			setFormData((prev) => ({
				...prev,
				preferences: checked
					? [...prev.preferences, value]
					: prev.preferences.filter((pref) => pref !== value),
			}));
		} else {
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setErrors([]);

		if (!formData.email) {
			setErrors(["Email is required"]);
			setIsLoading(false);
			return;
		}

		try {
			const response = await fetch("/api/newsletter", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				setSuccess(true);
			} else {
				if (response.status === 409) {
					setErrors(["This email is already subscribed to our newsletter"]);
				} else {
					try {
						const errorData = (await response.json()) as { message?: string };
						setErrors([errorData.message || "Subscription failed. Please try again."]);
					} catch {
						setErrors(["Subscription failed. Please try again."]);
					}
				}
			}
		} catch (error) {
			setErrors([
				"Unable to subscribe at the moment.",
				"Please check your internet connection and try again.",
			]);
		} finally {
			setIsLoading(false);
		}
	};

	if (success) {
		return (
			<div className="space-y-12">
				<div className="text-center">
					<div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-green-600">
						<CheckCircle className="h-10 w-10 text-white" />
					</div>
					<h1 className="mb-4 text-4xl font-bold text-gray-900">Welcome to the Family!</h1>
					<p className="text-xl text-gray-600">You&apos;ve successfully subscribed to our newsletter</p>
					<div className="mt-8 rounded-lg bg-green-50 p-6">
						<p className="text-green-800">
							Thank you for subscribing! You&apos;ll receive exclusive offers, new arrivals, and luxury
							lifestyle content directly in your inbox.
						</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-12">
			{/* Hero Section */}
			<div className="text-center">
				<div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500">
					<Mail className="h-10 w-10 text-white" />
				</div>
				<h1 className="mb-4 text-4xl font-bold text-gray-900">Stay in the Loop</h1>
				<p className="text-xl text-gray-600">Get exclusive offers and updates delivered to your inbox</p>
			</div>

			{/* Benefits Grid */}
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
				{benefits.map((benefit, index) => (
					<div key={index} className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
						<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
							{benefit.icon}
						</div>
						<h3 className="mb-2 font-semibold text-gray-900">{benefit.title}</h3>
						<p className="text-sm text-gray-600">{benefit.description}</p>
					</div>
				))}
			</div>

			{/* Error Messages */}
			{errors.length > 0 && (
				<div className="mx-auto max-w-2xl">
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
				</div>
			)}

			{/* Signup Form */}
			<div className="mx-auto max-w-2xl">
				<div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
					<form onSubmit={handleSubmit}>
						<div className="mb-6 grid gap-4 md:grid-cols-2">
							<div>
								<label htmlFor="firstName" className="mb-2 block text-sm font-medium text-gray-700">
									First Name
								</label>
								<input
									type="text"
									name="firstName"
									id="firstName"
									value={formData.firstName}
									onChange={handleInputChange}
									placeholder="Enter your first name"
									className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
								/>
							</div>
							<div>
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
						</div>

						<div className="mb-6">
							<label className="mb-3 block text-sm font-medium text-gray-700">
								What are you interested in? (Optional)
							</label>
							<div className="grid gap-2 sm:grid-cols-2">
								{[
									"Women&apos;s Fashion",
									"Men&apos;s Fashion",
									"Jewelry & Watches",
									"Handbags & Accessories",
									"Home & Lifestyle",
									"Beauty & Fragrance",
								].map((interest) => (
									<label key={interest} className="flex items-center space-x-2">
										<input
											type="checkbox"
											name="preferences"
											value={interest}
											checked={formData.preferences.includes(interest)}
											onChange={handleInputChange}
											className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
										/>
										<span className="text-sm text-gray-700">{interest}</span>
									</label>
								))}
							</div>
						</div>

						<Button
							type="submit"
							variant="primary"
							size="lg"
							fullWidth
							loading={isLoading}
							disabled={isLoading}
							icon={<Mail className="h-5 w-5" />}
						>
							{isLoading ? "Subscribing..." : "Subscribe to Newsletter"}
						</Button>

						<p className="mt-4 text-center text-xs text-gray-500">
							By subscribing, you agree to receive marketing emails from Luxiorstore. You can unsubscribe at
							any time. View our{" "}
							<Link href="/privacy" className="text-amber-600 hover:underline">
								Privacy Policy
							</Link>
							.
						</p>
					</form>
				</div>
			</div>

			{/* Social Proof */}
			<div className="rounded-lg bg-gradient-to-r from-gray-900 to-gray-800 p-8 text-white">
				<div className="text-center">
					<h2 className="mb-4 text-2xl font-bold">Join 10,000+ Luxury Enthusiasts</h2>
					<p className="mb-6 text-gray-300">
						&ldquo;The best way to stay updated on luxury trends and exclusive deals. I never miss a sale
						thanks to their newsletter!&rdquo;
					</p>
					<div className="flex items-center justify-center space-x-1">
						{Array.from({ length: 5 }, (_, i) => (
							<Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
						))}
					</div>
					<p className="mt-2 text-sm text-gray-400">- Sarah M., VIP Customer</p>
				</div>
			</div>

			{/* Follow Us */}
			<div className="text-center">
				<h3 className="mb-4 text-xl font-semibold text-gray-900">Follow Us</h3>
				<p className="mb-6 text-gray-600">Stay connected on social media for daily luxury inspiration</p>
				<div className="flex justify-center space-x-4">
					<a
						href="#"
						className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-amber-100 hover:text-amber-600"
					>
						<span className="sr-only">Instagram</span>
						<svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zm5.568 16.791c-.814.814-1.896 1.262-3.049 1.262H9.464c-1.153 0-2.235-.448-3.049-1.262-.814-.814-1.262-1.896-1.262-3.049V9.464c0-1.153.448-2.235 1.262-3.049.814-.814 1.896-1.262 3.049-1.262h5.072c1.153 0 2.235.448 3.049 1.262.814.814 1.262 1.896 1.262 3.049v5.072c0 1.153-.448 2.235-1.262 3.049z" />
						</svg>
					</a>
					<a
						href="#"
						className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-amber-100 hover:text-amber-600"
					>
						<span className="sr-only">Facebook</span>
						<svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
							<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
						</svg>
					</a>
					<a
						href="#"
						className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-amber-100 hover:text-amber-600"
					>
						<span className="sr-only">Twitter</span>
						<svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
							<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
						</svg>
					</a>
				</div>
			</div>
		</div>
	);
}
