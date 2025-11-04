import { Suspense } from "react";
import Link from "next/link";
import { MessageCircle, Phone, Mail, Clock, Book } from "lucide-react";
import { Loader } from "@/ui/atoms/Loader";
import { brandConfig } from "@/config/branding";

export const metadata = {
	title: "Customer Support - Luxiorstore",
	description: "Get help with your orders, products, and account. Our support team is here to assist you.",
};

export default function SupportPage() {
	const { company } = brandConfig;

	return (
		<Suspense fallback={<Loader />}>
			<div className="min-h-screen bg-gray-50">
				{/* Hero Section */}
				<section className="bg-gradient-to-r from-amber-600 to-orange-600 py-16 text-white">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="text-center">
							<h1 className="text-4xl font-bold sm:text-5xl">Customer Support</h1>
							<p className="mt-4 text-xl">We&apos;re here to help you with any questions or concerns</p>
						</div>
					</div>
				</section>

				{/* Support Options */}
				<section className="py-16">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="mb-12 text-center">
							<h2 className="text-3xl font-bold text-gray-900">How Can We Help You?</h2>
							<p className="mt-4 text-lg text-gray-600">
								Choose the best way to get in touch with our support team
							</p>
						</div>

						<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
							{/* Live Chat */}
							<div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
								<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100">
									<MessageCircle className="h-6 w-6 text-amber-600" />
								</div>
								<h3 className="mb-2 text-xl font-semibold text-gray-900">Live Chat</h3>
								<p className="mb-4 text-gray-600">Get instant help from our support team</p>
								<p className="mb-4 text-sm text-gray-500">Available: Mon-Fri, 9:00 AM - 6:00 PM EAT</p>
								<button className="w-full rounded-lg bg-amber-600 px-4 py-2 text-white transition-colors hover:bg-amber-700">
									Start Chat
								</button>
							</div>

							{/* Phone Support */}
							<div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
								<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
									<Phone className="h-6 w-6 text-blue-600" />
								</div>
								<h3 className="mb-2 text-xl font-semibold text-gray-900">Phone Support</h3>
								<p className="mb-4 text-gray-600">Speak directly with our support team</p>
								<p className="mb-2 font-medium text-gray-900">{company.phone}</p>
								<p className="mb-4 text-sm text-gray-500">Mon-Fri, 9:00 AM - 6:00 PM EAT</p>
								<a
									href={`tel:${company.phone}`}
									className="block w-full rounded-lg bg-blue-600 px-4 py-2 text-center text-white transition-colors hover:bg-blue-700"
								>
									Call Now
								</a>
							</div>

							{/* Email Support */}
							<div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
								<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
									<Mail className="h-6 w-6 text-green-600" />
								</div>
								<h3 className="mb-2 text-xl font-semibold text-gray-900">Email Support</h3>
								<p className="mb-4 text-gray-600">Send us a detailed message</p>
								<p className="mb-2 font-medium text-gray-900">{company.email}</p>
								<p className="mb-4 text-sm text-gray-500">Response within 24 hours</p>
								<a
									href={`mailto:${company.email}`}
									className="block w-full rounded-lg bg-green-600 px-4 py-2 text-center text-white transition-colors hover:bg-green-700"
								>
									Send Email
								</a>
							</div>
						</div>
					</div>
				</section>

				{/* FAQ Section */}
				<section className="bg-white py-16">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="mb-12 text-center">
							<h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
							<p className="mt-4 text-lg text-gray-600">Find quick answers to common questions</p>
						</div>

						<div className="grid gap-8 md:grid-cols-2">
							<div className="space-y-6">
								<div className="rounded-lg border border-gray-200 p-6">
									<h3 className="mb-2 font-semibold text-gray-900">How do I track my order?</h3>
									<p className="text-gray-600">
										You can track your order using the tracking number sent to your email or by visiting our
										order tracking page.
									</p>
								</div>
								<div className="rounded-lg border border-gray-200 p-6">
									<h3 className="mb-2 font-semibold text-gray-900">What is your return policy?</h3>
									<p className="text-gray-600">
										We offer a 30-day return policy for all items in original condition. Visit our returns
										page for more details.
									</p>
								</div>
								<div className="rounded-lg border border-gray-200 p-6">
									<h3 className="mb-2 font-semibold text-gray-900">How long does shipping take?</h3>
									<p className="text-gray-600">
										We offer lightning-fast delivery: 1-3 hours in Nairobi and same-day delivery nationwide.
									</p>
								</div>
							</div>
							<div className="space-y-6">
								<div className="rounded-lg border border-gray-200 p-6">
									<h3 className="mb-2 font-semibold text-gray-900">Do you offer international shipping?</h3>
									<p className="text-gray-600">
										Currently, we only ship within Kenya. We&apos;re working on expanding to other countries
										soon.
									</p>
								</div>
								<div className="rounded-lg border border-gray-200 p-6">
									<h3 className="mb-2 font-semibold text-gray-900">How can I change my order?</h3>
									<p className="text-gray-600">
										You can modify your order within 1 hour of placing it by contacting our support team
										immediately.
									</p>
								</div>
								<div className="rounded-lg border border-gray-200 p-6">
									<h3 className="mb-2 font-semibold text-gray-900">What payment methods do you accept?</h3>
									<p className="text-gray-600">
										We accept M-Pesa, Visa, MasterCard, American Express, and PayPal for your convenience.
									</p>
								</div>
							</div>
						</div>

						<div className="mt-12 text-center">
							<Link
								href="/faq"
								className="inline-flex items-center rounded-lg bg-amber-600 px-6 py-3 text-white transition-colors hover:bg-amber-700"
							>
								<Book className="mr-2 h-5 w-5" />
								View All FAQs
							</Link>
						</div>
					</div>
				</section>

				{/* Business Hours */}
				<section className="py-16">
					<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
						<div className="rounded-lg bg-gradient-to-r from-gray-900 to-gray-800 p-8 text-white">
							<div className="text-center">
								<Clock className="mx-auto mb-4 h-12 w-12 text-amber-400" />
								<h2 className="mb-4 text-2xl font-bold">Support Hours</h2>
								<div className="space-y-2">
									<p>Monday - Friday: 9:00 AM - 6:00 PM EAT</p>
									<p>Saturday: 10:00 AM - 4:00 PM EAT</p>
									<p>Sunday: Closed</p>
								</div>
								<p className="mt-4 text-amber-200">
									For urgent matters outside business hours, please send us an email and we&apos;ll respond as
									soon as possible.
								</p>
							</div>
						</div>
					</div>
				</section>
			</div>
		</Suspense>
	);
}
