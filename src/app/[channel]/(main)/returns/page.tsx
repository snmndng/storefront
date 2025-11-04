import {
	RotateCcw,
	CheckCircle,
	XCircle,
	AlertTriangle,
	Package,
	Shield,
	Mail,
	Phone,
	MessageCircle,
} from "lucide-react";

export const metadata = {
	title: "Returns Policy - Luxiorstore",
	description: "Learn about our 30-day return policy and how to return or exchange items.",
};

export default function ReturnsPage() {
	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero Section */}
			<section className="bg-gradient-to-r from-amber-600 to-orange-600 py-16 text-white">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<RotateCcw className="mx-auto mb-4 h-16 w-16" />
						<h1 className="text-4xl font-bold sm:text-5xl">Returns & Exchanges</h1>
						<p className="mt-4 text-xl">30-day hassle-free returns policy</p>
					</div>
				</div>
			</section>

			{/* Main Content */}
			<section className="py-16">
				<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
					{/* Confirm Before Payment */}
					<div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-6">
						<div className="flex items-start space-x-3">
							<Package className="mt-1 h-6 w-6 text-blue-600" />
							<div>
								<h2 className="mb-2 text-xl font-semibold text-blue-800">✅ Confirm Before You Pay</h2>
								<p className="text-blue-700">
									Avoid returns altogether! Inspect your order with our delivery person present and pay only
									when completely satisfied. This ensures you get exactly what you expect.
								</p>
							</div>
						</div>
					</div>

					{/* Return Policy Overview */}
					<div className="mb-12 rounded-lg border border-green-200 bg-green-50 p-6">
						<div className="flex items-start space-x-3">
							<CheckCircle className="mt-1 h-6 w-6 text-green-600" />
							<div>
								<h2 className="mb-2 text-xl font-semibold text-green-800">30-Day Return Guarantee</h2>
								<p className="text-green-700">
									We stand behind the quality of our products. If you&apos;re not completely satisfied, return
									your item within 30 days for a full refund or exchange.
								</p>
							</div>
						</div>
					</div>

					{/* Return Process */}
					<div className="mb-12 rounded-lg bg-white p-8 shadow-sm">
						<h2 className="mb-6 text-2xl font-bold text-gray-900">How to Return an Item</h2>
						<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
							<div className="text-center">
								<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
									<span className="text-2xl font-bold text-amber-600">1</span>
								</div>
								<h3 className="mb-2 font-semibold text-gray-900">Contact Us</h3>
								<p className="text-sm text-gray-600">
									Email us at hello@luxiorstore.co.ke or WhatsApp +254 797 923 313 with your order number and
									reason for return.
								</p>
							</div>
							<div className="text-center">
								<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
									<span className="text-2xl font-bold text-amber-600">2</span>
								</div>
								<h3 className="mb-2 font-semibold text-gray-900">Get Return Label</h3>
								<p className="text-sm text-gray-600">
									We&apos;ll provide you with a prepaid return label and instructions for packaging your item
									securely.
								</p>
							</div>
							<div className="text-center">
								<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
									<span className="text-2xl font-bold text-amber-600">3</span>
								</div>
								<h3 className="mb-2 font-semibold text-gray-900">Refund Processed</h3>
								<p className="text-sm text-gray-600">
									Once we receive your return, we&apos;ll process your refund within 3-5 business days.
								</p>
							</div>
						</div>
					</div>

					{/* Return Conditions */}
					<div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
						<div className="rounded-lg bg-white p-6 shadow-sm">
							<div className="mb-4 flex items-center space-x-3">
								<CheckCircle className="h-6 w-6 text-green-600" />
								<h3 className="text-xl font-semibold text-gray-900">Returnable Items</h3>
							</div>
							<ul className="space-y-2 text-gray-600">
								<li>• Items in original condition with tags attached</li>
								<li>• Unworn and unused products</li>
								<li>• Items in original packaging</li>
								<li>• Products purchased within 30 days</li>
								<li>• Items with proof of purchase</li>
							</ul>
						</div>

						<div className="rounded-lg bg-white p-6 shadow-sm">
							<div className="mb-4 flex items-center space-x-3">
								<XCircle className="h-6 w-6 text-red-600" />
								<h3 className="text-xl font-semibold text-gray-900">Non-Returnable Items</h3>
							</div>
							<ul className="space-y-2 text-gray-600">
								<li>• Personalized or customized items</li>
								<li>• Intimate apparel and swimwear</li>
								<li>• Items damaged by misuse</li>
								<li>• Products without original packaging</li>
								<li>• Items purchased with special discounts (final sale)</li>
							</ul>
						</div>
					</div>

					{/* Refund Information */}
					<div className="mb-12 rounded-lg bg-white p-8 shadow-sm">
						<h2 className="mb-6 text-2xl font-bold text-gray-900">Refund Information</h2>
						<div className="space-y-4">
							<div className="flex items-start space-x-3">
								<div className="rounded-full bg-blue-100 p-2">
									<Package className="h-4 w-4 text-blue-600" />
								</div>
								<div>
									<h3 className="font-semibold text-gray-900">Processing Time</h3>
									<p className="text-gray-600">
										Refunds are processed within 3-5 business days after we receive your return.
									</p>
								</div>
							</div>
							<div className="flex items-start space-x-3">
								<div className="rounded-full bg-blue-100 p-2">
									<CheckCircle className="h-4 w-4 text-blue-600" />
								</div>
								<div>
									<h3 className="font-semibold text-gray-900">Refund Method</h3>
									<p className="text-gray-600">
										Refunds are issued to the original payment method (M-Pesa, card, etc.).
									</p>
								</div>
							</div>
							<div className="flex items-start space-x-3">
								<div className="rounded-full bg-blue-100 p-2">
									<Shield className="h-4 w-4 text-blue-600" />
								</div>
								<div>
									<h3 className="font-semibold text-gray-900">Refund Amount</h3>
									<p className="text-gray-600">
										Full product price refunded. Original shipping costs are non-refundable unless item was
										defective.
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Exchange Information */}
					<div className="mb-12 rounded-lg bg-white p-8 shadow-sm">
						<h2 className="mb-6 text-2xl font-bold text-gray-900">Exchanges</h2>
						<p className="mb-6 text-gray-600">
							Need a different size or color? We offer free exchanges within Kenya for items of equal or
							lesser value.
						</p>
						<div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
							<div className="flex items-start space-x-3">
								<AlertTriangle className="mt-0.5 h-5 w-5 text-amber-600" />
								<div>
									<h3 className="font-semibold text-amber-800">Exchange Policy</h3>
									<p className="text-sm text-amber-700">
										Exchanges must be requested within 30 days. If the new item costs more, you&apos;ll pay
										the difference. If it costs less, we&apos;ll refund the difference.
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Contact for Returns */}
					<div className="rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 p-8">
						<h2 className="mb-4 text-2xl font-bold text-gray-900">Need Help with a Return?</h2>
						<p className="mb-6 text-gray-600">
							Our customer service team is here to make your return process as smooth as possible.
						</p>
						<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
							<div className="text-center">
								<Mail className="mx-auto mb-2 h-8 w-8 text-amber-600" />
								<p className="font-semibold">Email</p>
								<p className="text-sm text-gray-600">hello@luxiorstore.co.ke</p>
							</div>
							<div className="text-center">
								<Phone className="mx-auto mb-2 h-8 w-8 text-amber-600" />
								<p className="font-semibold">Phone</p>
								<p className="text-sm text-gray-600">+254 797 923 313</p>
							</div>
							<div className="text-center">
								<MessageCircle className="mx-auto mb-2 h-8 w-8 text-amber-600" />
								<p className="font-semibold">WhatsApp</p>
								<p className="text-sm text-gray-600">+254 797 923 313</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
