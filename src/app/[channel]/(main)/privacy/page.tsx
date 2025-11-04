import { Suspense } from "react";
import { Loader } from "@/ui/atoms/Loader";

export const metadata = {
	title: "Privacy Policy - Luxiorstore",
	description: "Learn how Luxiorstore protects your privacy and handles your personal information.",
};

export default function PrivacyPage() {
	return (
		<Suspense fallback={<Loader />}>
			<section className="mx-auto max-w-4xl p-8">
				<div className="mb-12 text-center">
					<h1 className="mb-4 text-4xl font-bold text-gray-900">Privacy Policy</h1>
					<p className="text-lg text-gray-600">Last updated: November 3, 2025</p>
				</div>

				<div className="prose prose-lg max-w-none">
					<div className="mb-8 rounded-lg bg-amber-50 p-6">
						<h2 className="mb-2 text-xl font-semibold text-amber-800">Your Privacy Matters</h2>
						<p className="text-amber-700">
							At Luxiorstore, we are committed to protecting your privacy and ensuring the security of your
							personal information. This policy explains how we collect, use, and safeguard your data.
						</p>
					</div>

					<h2 className="mb-4 text-2xl font-bold text-gray-900">Information We Collect</h2>
					<h3 className="mb-3 text-xl font-semibold text-gray-800">Personal Information</h3>
					<ul className="mb-6 space-y-2 text-gray-700">
						<li>• Name, email address, and phone number</li>
						<li>• Billing and shipping addresses</li>
						<li>• Payment information (processed securely through our payment partners)</li>
						<li>• Account preferences and communication settings</li>
					</ul>

					<h3 className="mb-3 text-xl font-semibold text-gray-800">Usage Information</h3>
					<ul className="mb-6 space-y-2 text-gray-700">
						<li>• Website browsing behavior and preferences</li>
						<li>• Purchase history and product interactions</li>
						<li>• Device information and IP address</li>
						<li>• Cookies and similar tracking technologies</li>
					</ul>

					<h2 className="mb-4 text-2xl font-bold text-gray-900">How We Use Your Information</h2>
					<ul className="mb-6 space-y-2 text-gray-700">
						<li>• Process and fulfill your orders</li>
						<li>• Provide customer support and respond to inquiries</li>
						<li>• Send order confirmations, shipping updates, and important account information</li>
						<li>• Personalize your shopping experience and product recommendations</li>
						<li>• Send marketing communications (with your consent)</li>
						<li>• Improve our website, products, and services</li>
						<li>• Prevent fraud and ensure security</li>
					</ul>

					<h2 className="mb-4 text-2xl font-bold text-gray-900">Information Sharing</h2>
					<p className="mb-4 text-gray-700">
						We do not sell, trade, or rent your personal information to third parties. We may share your
						information only in the following circumstances:
					</p>
					<ul className="mb-6 space-y-2 text-gray-700">
						<li>
							• With service providers who help us operate our business (shipping, payment processing, etc.)
						</li>
						<li>• When required by law or to protect our rights and safety</li>
						<li>• In connection with a business transfer or merger</li>
						<li>• With your explicit consent</li>
					</ul>

					<h2 className="mb-4 text-2xl font-bold text-gray-900">Data Security</h2>
					<p className="mb-6 text-gray-700">
						We implement industry-standard security measures to protect your personal information, including:
					</p>
					<ul className="mb-6 space-y-2 text-gray-700">
						<li>• SSL encryption for all data transmission</li>
						<li>• Secure payment processing through certified partners</li>
						<li>• Regular security audits and updates</li>
						<li>• Limited access to personal information on a need-to-know basis</li>
						<li>• Secure data storage with backup and recovery procedures</li>
					</ul>

					<h2 className="mb-4 text-2xl font-bold text-gray-900">Your Rights</h2>
					<p className="mb-4 text-gray-700">You have the right to:</p>
					<ul className="mb-6 space-y-2 text-gray-700">
						<li>• Access and review your personal information</li>
						<li>• Update or correct your information</li>
						<li>• Delete your account and personal data</li>
						<li>• Opt-out of marketing communications</li>
						<li>• Request a copy of your data</li>
						<li>• Object to certain data processing activities</li>
					</ul>

					<h2 className="mb-4 text-2xl font-bold text-gray-900">Cookies and Tracking</h2>
					<p className="mb-4 text-gray-700">
						We use cookies and similar technologies to enhance your browsing experience. You can control
						cookie settings through your browser preferences.
					</p>
					<ul className="mb-6 space-y-2 text-gray-700">
						<li>• Essential cookies for website functionality</li>
						<li>• Analytics cookies to understand website usage</li>
						<li>• Marketing cookies for personalized advertising (with consent)</li>
						<li>• Preference cookies to remember your settings</li>
					</ul>

					<h2 className="mb-4 text-2xl font-bold text-gray-900">International Transfers</h2>
					<p className="mb-6 text-gray-700">
						Your information may be transferred to and processed in countries other than Kenya. We ensure
						appropriate safeguards are in place to protect your data during international transfers.
					</p>

					<h2 className="mb-4 text-2xl font-bold text-gray-900">Children&apos;s Privacy</h2>
					<p className="mb-6 text-gray-700">
						Our services are not intended for children under 18. We do not knowingly collect personal
						information from children. If you believe we have collected information from a child, please
						contact us immediately.
					</p>

					<h2 className="mb-4 text-2xl font-bold text-gray-900">Changes to This Policy</h2>
					<p className="mb-6 text-gray-700">
						We may update this privacy policy from time to time. We will notify you of significant changes by
						email or through our website. Your continued use of our services after changes indicates your
						acceptance of the updated policy.
					</p>

					<h2 className="mb-4 text-2xl font-bold text-gray-900">Contact Us</h2>
					<p className="mb-4 text-gray-700">
						If you have questions about this privacy policy or how we handle your personal information, please
						contact us:
					</p>
					<div className="rounded-lg bg-gray-50 p-6">
						<p className="mb-2">
							<strong>Email:</strong> privacy@luxiorstore.co.ke
						</p>
						<p className="mb-2">
							<strong>Phone:</strong> +254 797 923 313
						</p>
						<p className="mb-2">
							<strong>Address:</strong> Westlands Road, ABC Place, Nairobi, Kenya
						</p>
						<p>
							<strong>WhatsApp:</strong> +254 797 923 313
						</p>
					</div>
				</div>
			</section>
		</Suspense>
	);
}
