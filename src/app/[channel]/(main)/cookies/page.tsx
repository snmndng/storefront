import { Suspense } from "react";
import { Cookie, Shield, Settings, Eye } from "lucide-react";
import { Loader } from "@/ui/atoms/Loader";

export const metadata = {
	title: "Cookie Policy - Luxiorstore",
	description: "Learn about how we use cookies to improve your shopping experience and protect your privacy.",
};

export default function CookiesPage() {
	return (
		<Suspense fallback={<Loader />}>
			<div className="min-h-screen bg-gray-50">
				{/* Hero Section */}
				<section className="bg-gradient-to-r from-amber-600 to-orange-600 py-16 text-white">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="text-center">
							<Cookie className="mx-auto mb-4 h-16 w-16" />
							<h1 className="text-4xl font-bold sm:text-5xl">Cookie Policy</h1>
							<p className="mt-4 text-xl">Understanding how we use cookies to enhance your experience</p>
						</div>
					</div>
				</section>

				{/* Content */}
				<section className="py-16">
					<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
						<div className="rounded-lg bg-white p-8 shadow-sm">
							<div className="prose max-w-none">
								<h2 className="mb-6 text-2xl font-bold text-gray-900">What Are Cookies?</h2>
								<p className="mb-6 text-gray-700">
									Cookies are small text files that are stored on your device when you visit our website. They
									help us provide you with a better shopping experience by remembering your preferences and
									improving our services.
								</p>

								<h2 className="mb-6 text-2xl font-bold text-gray-900">Types of Cookies We Use</h2>

								<div className="mb-8 space-y-6">
									<div className="rounded-lg border border-gray-200 p-6">
										<div className="mb-3 flex items-center space-x-3">
											<Shield className="h-6 w-6 text-green-600" />
											<h3 className="text-lg font-semibold text-gray-900">Essential Cookies</h3>
										</div>
										<p className="text-gray-700">
											These cookies are necessary for the website to function properly. They enable core
											functionality such as security, network management, and accessibility. You cannot
											opt-out of these cookies.
										</p>
										<ul className="mt-3 list-inside list-disc text-sm text-gray-600">
											<li>Authentication and security</li>
											<li>Shopping cart functionality</li>
											<li>Form submission</li>
											<li>Load balancing</li>
										</ul>
									</div>

									<div className="rounded-lg border border-gray-200 p-6">
										<div className="mb-3 flex items-center space-x-3">
											<Eye className="h-6 w-6 text-blue-600" />
											<h3 className="text-lg font-semibold text-gray-900">Analytics Cookies</h3>
										</div>
										<p className="text-gray-700">
											These cookies help us understand how visitors interact with our website by collecting
											and reporting information anonymously.
										</p>
										<ul className="mt-3 list-inside list-disc text-sm text-gray-600">
											<li>Page views and traffic sources</li>
											<li>User behavior patterns</li>
											<li>Performance monitoring</li>
											<li>Error tracking</li>
										</ul>
									</div>

									<div className="rounded-lg border border-gray-200 p-6">
										<div className="mb-3 flex items-center space-x-3">
											<Settings className="h-6 w-6 text-purple-600" />
											<h3 className="text-lg font-semibold text-gray-900">Functional Cookies</h3>
										</div>
										<p className="text-gray-700">
											These cookies enable enhanced functionality and personalization, such as remembering
											your preferences and settings.
										</p>
										<ul className="mt-3 list-inside list-disc text-sm text-gray-600">
											<li>Language preferences</li>
											<li>Currency selection</li>
											<li>Recently viewed products</li>
											<li>Wishlist items</li>
										</ul>
									</div>

									<div className="rounded-lg border border-gray-200 p-6">
										<div className="mb-3 flex items-center space-x-3">
											<Cookie className="h-6 w-6 text-amber-600" />
											<h3 className="text-lg font-semibold text-gray-900">Marketing Cookies</h3>
										</div>
										<p className="text-gray-700">
											These cookies are used to deliver personalized advertisements and track the
											effectiveness of our marketing campaigns.
										</p>
										<ul className="mt-3 list-inside list-disc text-sm text-gray-600">
											<li>Personalized product recommendations</li>
											<li>Targeted advertising</li>
											<li>Social media integration</li>
											<li>Campaign performance tracking</li>
										</ul>
									</div>
								</div>

								<h2 className="mb-6 text-2xl font-bold text-gray-900">Managing Your Cookie Preferences</h2>
								<p className="mb-6 text-gray-700">
									You have control over which cookies you accept. You can manage your preferences through your
									browser settings or using our cookie preference center.
								</p>

								<div className="mb-8 rounded-lg bg-amber-50 p-6">
									<h3 className="mb-3 text-lg font-semibold text-amber-800">Cookie Preference Center</h3>
									<p className="mb-4 text-amber-700">
										Click the button below to access our cookie preference center where you can customize your
										cookie settings.
									</p>
									<button className="rounded-lg bg-amber-600 px-6 py-3 text-white transition-colors hover:bg-amber-700">
										Manage Cookie Preferences
									</button>
								</div>

								<h2 className="mb-6 text-2xl font-bold text-gray-900">Browser Settings</h2>
								<p className="mb-4 text-gray-700">
									You can also control cookies through your browser settings. Here&apos;s how to manage
									cookies in popular browsers:
								</p>
								<ul className="mb-6 list-inside list-disc space-y-2 text-gray-700">
									<li>
										<strong>Chrome:</strong> Settings &gt; Privacy and security &gt; Cookies and other site
										data
									</li>
									<li>
										<strong>Firefox:</strong> Options &gt; Privacy &amp; Security &gt; Cookies and Site Data
									</li>
									<li>
										<strong>Safari:</strong> Preferences &gt; Privacy &gt; Manage Website Data
									</li>
									<li>
										<strong>Edge:</strong> Settings &gt; Cookies and site permissions &gt; Cookies and site
										data
									</li>
								</ul>

								<h2 className="mb-6 text-2xl font-bold text-gray-900">Third-Party Cookies</h2>
								<p className="mb-6 text-gray-700">
									We may use third-party services that set their own cookies. These include:
								</p>
								<ul className="mb-6 list-inside list-disc space-y-2 text-gray-700">
									<li>
										<strong>Google Analytics:</strong> For website analytics and performance monitoring
									</li>
									<li>
										<strong>Facebook Pixel:</strong> For advertising and conversion tracking
									</li>
									<li>
										<strong>Payment Processors:</strong> For secure payment processing
									</li>
									<li>
										<strong>Customer Support:</strong> For live chat and support services
									</li>
								</ul>

								<h2 className="mb-6 text-2xl font-bold text-gray-900">Updates to This Policy</h2>
								<p className="mb-6 text-gray-700">
									We may update this Cookie Policy from time to time to reflect changes in our practices or
									for other operational, legal, or regulatory reasons. We will notify you of any material
									changes by posting the updated policy on our website.
								</p>

								<h2 className="mb-6 text-2xl font-bold text-gray-900">Contact Us</h2>
								<p className="text-gray-700">
									If you have any questions about our use of cookies or this Cookie Policy, please contact us
									at{" "}
									<a href="mailto:privacy@luxiorstore.com" className="text-amber-600 hover:underline">
										privacy@luxiorstore.com
									</a>
									.
								</p>
							</div>
						</div>
					</div>
				</section>
			</div>
		</Suspense>
	);
}
