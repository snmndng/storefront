import { Suspense } from "react";
import { Loader } from "@/ui/atoms/Loader";

export const metadata = {
	title: "Terms of Service - Luxiorstore",
	description:
		"Read our terms of service and understand your rights and responsibilities when using Luxiorstore.",
};

export default function TermsPage() {
	return (
		<Suspense fallback={<Loader />}>
			<section className="mx-auto max-w-4xl p-8">
				<div className="mb-12 text-center">
					<h1 className="mb-4 text-4xl font-bold text-gray-900">Terms of Service</h1>
					<p className="text-lg text-gray-600">Last updated: November 3, 2025</p>
				</div>

				<div className="prose prose-lg max-w-none">
					<div className="mb-8 rounded-lg bg-amber-50 p-6">
						<h2 className="mb-2 text-xl font-semibold text-amber-800">Welcome to Luxiorstore</h2>
						<p className="text-amber-700">
							These terms of service govern your use of our website and services. By using Luxiorstore, you
							agree to these terms and conditions.
						</p>
					</div>

					<h2 className="mb-4 text-2xl font-bold text-gray-900">1. Acceptance of Terms</h2>
					<p className="mb-6 text-gray-700">
						By accessing and using the Luxiorstore website and services, you accept and agree to be bound by
						these Terms of Service. If you do not agree to these terms, please do not use our services.
					</p>

					<h2 className="mb-4 text-2xl font-bold text-gray-900">2. Description of Service</h2>
					<p className="mb-4 text-gray-700">
						Luxiorstore is an e-commerce platform that offers luxury products including:
					</p>
					<ul className="mb-6 space-y-2 text-gray-700">
						<li>• Fashion and apparel</li>
						<li>• Jewelry and watches</li>
						<li>• Handbags and accessories</li>
						<li>• Home and lifestyle products</li>
						<li>• Beauty and fragrance items</li>
					</ul>

					<h2 className="mb-4 text-2xl font-bold text-gray-900">3. Account Registration</h2>
					<ul className="mb-6 space-y-2 text-gray-700">
						<li>• You must provide accurate and complete information when creating an account</li>
						<li>• You are responsible for maintaining the confidentiality of your account credentials</li>
						<li>• You must be at least 18 years old to create an account</li>
						<li>• One account per person is allowed</li>
						<li>• You are responsible for all activities that occur under your account</li>
					</ul>

					<h2 className="mb-4 text-2xl font-bold text-gray-900">4. Product Information and Pricing</h2>
					<ul className="mb-6 space-y-2 text-gray-700">
						<li>• We strive to provide accurate product descriptions and images</li>
						<li>• All prices are in Kenyan Shillings (KES) unless otherwise stated</li>
						<li>• Prices are subject to change without notice</li>
						<li>• We reserve the right to correct pricing errors</li>
						<li>• Product availability is subject to stock levels</li>
					</ul>

					<h2 className="mb-4 text-2xl font-bold text-gray-900">5. Orders and Payment</h2>
					<h3 className="mb-3 text-xl font-semibold text-gray-800">Order Process</h3>
					<ul className="mb-4 space-y-2 text-gray-700">
						<li>• All orders are subject to acceptance and availability</li>
						<li>• We reserve the right to refuse or cancel orders</li>
						<li>• Order confirmation does not guarantee product availability</li>
					</ul>

					<h3 className="mb-3 text-xl font-semibold text-gray-800">Payment Terms</h3>
					<ul className="mb-6 space-y-2 text-gray-700">
						<li>• Payment is required at the time of order</li>
						<li>• We accept M-Pesa, Visa, Mastercard, and bank transfers</li>
						<li>• All payments are processed securely</li>
						<li>• You authorize us to charge your payment method for all purchases</li>
					</ul>

					<h2 className="mb-4 text-2xl font-bold text-gray-900">6. Shipping and Delivery</h2>
					<ul className="mb-6 space-y-2 text-gray-700">
						<li>• Delivery times are estimates and not guaranteed</li>
						<li>• Risk of loss transfers to you upon delivery</li>
						<li>• You must inspect items upon delivery and report any issues immediately</li>
						<li>• Additional charges may apply for remote locations</li>
						<li>• International shipping is subject to customs and duties</li>
					</ul>

					<h2 className="mb-4 text-2xl font-bold text-gray-900">7. Returns and Refunds</h2>
					<ul className="mb-6 space-y-2 text-gray-700">
						<li>• Returns must be initiated within 30 days of delivery</li>
						<li>• Items must be in original condition with tags attached</li>
						<li>• Some items may not be eligible for return (personalized items, intimate apparel)</li>
						<li>• Return shipping costs may apply</li>
						<li>• Refunds will be processed to the original payment method</li>
						<li>• Processing time for refunds is 5-10 business days</li>
					</ul>

					<h2 className="mb-4 text-2xl font-bold text-gray-900">8. Product Authenticity</h2>
					<p className="mb-6 text-gray-700">
						We guarantee that all products sold on Luxiorstore are 100% authentic. We work directly with
						authorized distributors and brands to ensure authenticity. If you receive a counterfeit item, we
						will provide a full refund and investigate the matter thoroughly.
					</p>

					<h2 className="mb-4 text-2xl font-bold text-gray-900">9. Intellectual Property</h2>
					<ul className="mb-6 space-y-2 text-gray-700">
						<li>• All content on our website is protected by copyright and trademark laws</li>
						<li>• You may not reproduce, distribute, or modify our content without permission</li>
						<li>• Product images and descriptions are for reference only</li>
						<li>• Brand names and logos are trademarks of their respective owners</li>
					</ul>

					<h2 className="mb-4 text-2xl font-bold text-gray-900">10. Prohibited Uses</h2>
					<p className="mb-4 text-gray-700">You agree not to:</p>
					<ul className="mb-6 space-y-2 text-gray-700">
						<li>• Use our services for any illegal or unauthorized purpose</li>
						<li>• Violate any laws or regulations</li>
						<li>• Transmit viruses or malicious code</li>
						<li>• Attempt to gain unauthorized access to our systems</li>
						<li>• Interfere with the proper functioning of our website</li>
						<li>• Impersonate another person or entity</li>
					</ul>

					<h2 className="mb-4 text-2xl font-bold text-gray-900">11. Limitation of Liability</h2>
					<p className="mb-6 text-gray-700">
						Luxiorstore shall not be liable for any indirect, incidental, special, or consequential damages
						arising from your use of our services. Our total liability shall not exceed the amount you paid
						for the specific product or service.
					</p>

					<h2 className="mb-4 text-2xl font-bold text-gray-900">12. Indemnification</h2>
					<p className="mb-6 text-gray-700">
						You agree to indemnify and hold Luxiorstore harmless from any claims, damages, or expenses arising
						from your use of our services or violation of these terms.
					</p>

					<h2 className="mb-4 text-2xl font-bold text-gray-900">13. Governing Law</h2>
					<p className="mb-6 text-gray-700">
						These terms are governed by the laws of Kenya. Any disputes will be resolved in the courts of
						Nairobi, Kenya.
					</p>

					<h2 className="mb-4 text-2xl font-bold text-gray-900">14. Changes to Terms</h2>
					<p className="mb-6 text-gray-700">
						We reserve the right to modify these terms at any time. Changes will be effective immediately upon
						posting. Your continued use of our services constitutes acceptance of the modified terms.
					</p>

					<h2 className="mb-4 text-2xl font-bold text-gray-900">15. Contact Information</h2>
					<p className="mb-4 text-gray-700">
						If you have questions about these terms of service, please contact us:
					</p>
					<div className="rounded-lg bg-gray-50 p-6">
						<p className="mb-2">
							<strong>Email:</strong> legal@luxiorstore.co.ke
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
