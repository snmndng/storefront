import { Truck, Clock, MapPin, Package, Shield } from "lucide-react";

export const metadata = {
	title: "Lightning-Fast Delivery - Luxiorstore",
	description:
		"Experience Kenya's fastest luxury delivery: 1-3 hours in Nairobi, same-day nationwide. Quality service at the speed of luxury.",
};

export default function ShippingPage() {
	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero Section */}
			<section className="bg-gradient-to-r from-amber-600 to-orange-600 py-16 text-white">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<Truck className="mx-auto mb-4 h-16 w-16" />
						<h1 className="text-4xl font-bold sm:text-5xl">Lightning-Fast Luxury Delivery</h1>
						<p className="mt-4 text-xl">
							🚀 1-3 Hours in Nairobi | Same-Day Nationwide | Quality at the Speed of Light
						</p>
					</div>
				</div>
			</section>

			{/* Main Content */}
			<section className="py-16">
				<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
					{/* Express Delivery Banner */}
					<div className="mb-12 rounded-lg border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-8">
						<div className="text-center">
							<div className="mb-4 flex items-center justify-center space-x-4">
								<Clock className="h-10 w-10 text-amber-600" />
								<Package className="h-10 w-10 text-amber-600" />
								<Truck className="h-10 w-10 text-amber-600" />
							</div>
							<h2 className="mb-2 text-3xl font-bold text-amber-800">⚡ Express Delivery Promise</h2>
							<p className="mb-4 text-lg text-amber-700">
								Experience Kenya&apos;s fastest luxury delivery service
							</p>
							<div className="grid grid-cols-1 gap-4 text-center md:grid-cols-3">
								<div className="rounded-lg bg-white p-4 shadow-sm">
									<h3 className="text-xl font-bold text-amber-600">1-3 Hours</h3>
									<p className="text-sm text-amber-700">Within Nairobi</p>
								</div>
								<div className="rounded-lg bg-white p-4 shadow-sm">
									<h3 className="text-xl font-bold text-amber-600">Same Day</h3>
									<p className="text-sm text-amber-700">Nationwide Kenya</p>
								</div>
								<div className="rounded-lg bg-white p-4 shadow-sm">
									<h3 className="text-xl font-bold text-amber-600">FREE</h3>
									<p className="text-sm text-amber-700">Orders over KSh 5,000</p>
								</div>
							</div>
						</div>
					</div>

					{/* Delivery Zones */}
					<div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
						<div className="rounded-lg border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6 shadow-lg">
							<div className="mb-4 flex items-center space-x-3">
								<div className="rounded-full bg-green-500 p-2">
									<Clock className="h-6 w-6 text-white" />
								</div>
								<h3 className="text-xl font-bold text-green-800">⚡ Nairobi Express</h3>
							</div>
							<div className="space-y-3">
								<div className="rounded-lg bg-white p-3 shadow-sm">
									<p className="text-lg font-bold text-green-600">1-3 Hours Delivery!</p>
									<p className="text-sm text-green-700">CBD, Westlands, Karen, Kilimani</p>
								</div>
								<ul className="space-y-2 text-sm text-green-700">
									<li>
										✅ <strong>FREE</strong> on orders over KSh 5,000
									</li>
									<li>✅ KSh 300 for smaller orders</li>
									<li>✅ Real-time tracking</li>
									<li>✅ Quality guarantee</li>
								</ul>
							</div>
						</div>

						<div className="rounded-lg border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-lg">
							<div className="mb-4 flex items-center space-x-3">
								<div className="rounded-full bg-blue-500 p-2">
									<MapPin className="h-6 w-6 text-white" />
								</div>
								<h3 className="text-xl font-bold text-blue-800">🌟 Greater Nairobi</h3>
							</div>
							<div className="space-y-3">
								<div className="rounded-lg bg-white p-3 shadow-sm">
									<p className="text-lg font-bold text-blue-600">Same Day Delivery</p>
									<p className="text-sm text-blue-700">Kiambu, Machakos, Kajiado</p>
								</div>
								<ul className="space-y-2 text-sm text-blue-700">
									<li>
										✅ <strong>FREE</strong> on orders over KSh 7,500
									</li>
									<li>✅ KSh 500 standard rate</li>
									<li>✅ Morning & evening slots</li>
									<li>✅ SMS notifications</li>
								</ul>
							</div>
						</div>

						<div className="rounded-lg border border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-6 shadow-lg">
							<div className="mb-4 flex items-center space-x-3">
								<div className="rounded-full bg-purple-500 p-2">
									<Truck className="h-6 w-6 text-white" />
								</div>
								<h3 className="text-xl font-bold text-purple-800">🚀 Nationwide</h3>
							</div>
							<div className="space-y-3">
								<div className="rounded-lg bg-white p-3 shadow-sm">
									<p className="text-lg font-bold text-purple-600">Same Day Service</p>
									<p className="text-sm text-purple-700">All major Kenyan cities</p>
								</div>
								<ul className="space-y-2 text-sm text-purple-700">
									<li>✅ Mombasa, Kisumu, Nakuru</li>
									<li>✅ KSh 800 - KSh 1,500</li>
									<li>✅ Express & standard options</li>
									<li>✅ Secure packaging</li>
								</ul>
							</div>
						</div>
					</div>

					{/* Lightning-Fast Delivery Timeline */}
					<div className="mb-12 rounded-lg bg-gradient-to-r from-gray-900 to-gray-800 p-8 text-white shadow-lg">
						<h2 className="mb-2 flex items-center justify-center text-3xl font-bold">
							<Clock className="mr-3 h-8 w-8 text-amber-400" />⚡ Lightning-Fast Delivery Promise
						</h2>
						<p className="mb-8 text-center text-gray-300">
							Experience luxury at the speed of light - Quality service, delivered fast!
						</p>

						<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
							<div className="rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 p-6 text-center">
								<div className="mb-2 text-3xl font-bold">1-3 hrs</div>
								<div className="text-sm opacity-90">Nairobi CBD, Westlands</div>
								<div className="text-sm opacity-90">Karen, Kilimani</div>
								<div className="mt-2 rounded-full bg-white/20 px-2 py-1 text-xs">🚀 Express Zone</div>
							</div>

							<div className="rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 p-6 text-center">
								<div className="mb-2 text-3xl font-bold">Same Day</div>
								<div className="text-sm opacity-90">Greater Nairobi</div>
								<div className="text-sm opacity-90">Kiambu, Machakos</div>
								<div className="mt-2 rounded-full bg-white/20 px-2 py-1 text-xs">🌟 Premium Zone</div>
							</div>

							<div className="rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 p-6 text-center">
								<div className="mb-2 text-3xl font-bold">Same Day</div>
								<div className="text-sm opacity-90">Mombasa, Kisumu</div>
								<div className="text-sm opacity-90">Nakuru, Eldoret</div>
								<div className="mt-2 rounded-full bg-white/20 px-2 py-1 text-xs">🚀 Major Cities</div>
							</div>

							<div className="rounded-lg bg-gradient-to-br from-orange-500 to-red-600 p-6 text-center">
								<div className="mb-2 text-3xl font-bold">Next Day</div>
								<div className="text-sm opacity-90">All Other Areas</div>
								<div className="text-sm opacity-90">Nationwide Coverage</div>
								<div className="mt-2 rounded-full bg-white/20 px-2 py-1 text-xs">📦 Standard</div>
							</div>
						</div>

						<div className="mt-8 text-center">
							<p className="text-lg font-semibold text-amber-400">
								🏆 Kenya&apos;s Fastest Luxury Delivery Service
							</p>
							<p className="mt-2 text-sm text-gray-300">
								Quality products delivered with the speed and care they deserve
							</p>
						</div>
					</div>

					{/* Express Delivery Process */}
					<div className="mb-12 rounded-lg border-t-4 border-amber-500 bg-white p-8 shadow-lg">
						<h2 className="mb-2 text-center text-3xl font-bold text-gray-900">
							🚀 Our Express Delivery Process
						</h2>
						<p className="mb-8 text-center text-gray-600">
							From click to doorstep in record time - experience the Luxiorstore difference!
						</p>

						<div className="grid grid-cols-1 gap-6 md:grid-cols-4">
							<div className="group text-center">
								<div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg transition-transform group-hover:scale-110">
									<span className="text-3xl font-bold text-white">⚡</span>
								</div>
								<h3 className="mb-2 text-lg font-bold text-gray-900">Instant Processing</h3>
								<p className="text-sm text-gray-600">
									Order confirmed & processed within 15 minutes during business hours
								</p>
								<div className="mt-2 text-xs font-semibold text-green-600">⏱️ 15 mins</div>
							</div>

							<div className="group text-center">
								<div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 shadow-lg transition-transform group-hover:scale-110">
									<span className="text-3xl font-bold text-white">📦</span>
								</div>
								<h3 className="mb-2 text-lg font-bold text-gray-900">Premium Packaging</h3>
								<p className="text-sm text-gray-600">
									Luxury items carefully packaged with protective materials
								</p>
								<div className="mt-2 text-xs font-semibold text-blue-600">🛡️ Protected</div>
							</div>

							<div className="group text-center">
								<div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-pink-500 shadow-lg transition-transform group-hover:scale-110">
									<span className="text-3xl font-bold text-white">🚚</span>
								</div>
								<h3 className="mb-2 text-lg font-bold text-gray-900">Express Dispatch</h3>
								<p className="text-sm text-gray-600">
									Immediate dispatch with real-time tracking & SMS updates
								</p>
								<div className="mt-2 text-xs font-semibold text-purple-600">📱 Live Tracking</div>
							</div>

							<div className="group text-center">
								<div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-red-500 shadow-lg transition-transform group-hover:scale-110">
									<span className="text-3xl font-bold text-white">🏆</span>
								</div>
								<h3 className="mb-2 text-lg font-bold text-gray-900">Quality Delivered</h3>
								<p className="text-sm text-gray-600">
									Secure delivery with signature confirmation & quality guarantee
								</p>
								<div className="mt-2 text-xs font-semibold text-orange-600">✅ Guaranteed</div>
							</div>
						</div>

						<div className="mt-8 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 p-6 text-center">
							<h3 className="mb-2 text-xl font-bold text-amber-800">🎯 Our Quality Promise</h3>
							<p className="text-amber-700">
								Fast delivery never compromises quality. Every item is handled with the care luxury deserves.
							</p>
						</div>
					</div>

					{/* Order Confirmation Feature */}
					<div className="mb-12 rounded-lg border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-8">
						<div className="mb-6 text-center">
							<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
								<span className="text-3xl text-white">✅</span>
							</div>
							<h2 className="mb-2 text-3xl font-bold text-green-800">📋 Confirm Before You Pay</h2>
							<p className="text-lg text-green-700">
								Inspect your order with our delivery person present - Pay only when satisfied!
							</p>
						</div>

						<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
							<div className="rounded-lg bg-white p-6 text-center shadow-sm">
								<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
									<span className="text-2xl">📦</span>
								</div>
								<h3 className="mb-2 font-bold text-gray-900">1. Inspect Your Order</h3>
								<p className="text-sm text-gray-600">
									Check quality, authenticity, and condition while our delivery person waits
								</p>
							</div>

							<div className="rounded-lg bg-white p-6 text-center shadow-sm">
								<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
									<span className="text-2xl">✅</span>
								</div>
								<h3 className="mb-2 font-bold text-gray-900">2. Confirm Satisfaction</h3>
								<p className="text-sm text-gray-600">
									Approve the order only when you&apos;re completely satisfied with your purchase
								</p>
							</div>

							<div className="rounded-lg bg-white p-6 text-center shadow-sm">
								<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
									<span className="text-2xl">💳</span>
								</div>
								<h3 className="mb-2 font-bold text-gray-900">3. Complete Payment</h3>
								<p className="text-sm text-gray-600">
									Pay via M-Pesa, card, or cash - only after confirming your order
								</p>
							</div>
						</div>

						<div className="mt-8 rounded-lg bg-white p-6 shadow-sm">
							<h3 className="mb-4 text-center text-xl font-bold text-green-800">
								🛡️ Your Protection Guarantee
							</h3>
							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								<div className="flex items-start space-x-3">
									<span className="text-xl text-green-600">✅</span>
									<div>
										<h4 className="font-semibold text-gray-900">Quality Assurance</h4>
										<p className="text-sm text-gray-600">Inspect every detail before payment</p>
									</div>
								</div>
								<div className="flex items-start space-x-3">
									<span className="text-xl text-green-600">✅</span>
									<div>
										<h4 className="font-semibold text-gray-900">No Pressure</h4>
										<p className="text-sm text-gray-600">Take your time to examine the product</p>
									</div>
								</div>
								<div className="flex items-start space-x-3">
									<span className="text-xl text-green-600">✅</span>
									<div>
										<h4 className="font-semibold text-gray-900">Easy Returns</h4>
										<p className="text-sm text-gray-600">Reject if not satisfied - no questions asked</p>
									</div>
								</div>
								<div className="flex items-start space-x-3">
									<span className="text-xl text-green-600">✅</span>
									<div>
										<h4 className="font-semibold text-gray-900">Multiple Payment Options</h4>
										<p className="text-sm text-gray-600">M-Pesa, card, or cash payment available</p>
									</div>
								</div>
							</div>
						</div>

						<div className="mt-6 text-center">
							<p className="text-lg font-bold text-green-800">
								🎯 <strong>100% Satisfaction Guaranteed:</strong> Don&apos;t pay until you&apos;re completely
								happy!
							</p>
						</div>
					</div>

					{/* Service Guarantee */}
					<div className="rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-8">
						<div className="mb-6 text-center">
							<Shield className="mx-auto mb-4 h-12 w-12 text-blue-600" />
							<h3 className="mb-2 text-2xl font-bold text-blue-800">🛡️ Our Service Guarantee</h3>
							<p className="text-blue-700">Quality service backed by our commitment to excellence</p>
						</div>

						<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
							<div className="rounded-lg bg-white p-4 shadow-sm">
								<h4 className="mb-3 font-bold text-blue-800">⚡ Speed Commitments</h4>
								<ul className="space-y-2 text-sm text-blue-700">
									<li>✅ Orders processed within 15-30 minutes</li>
									<li>✅ 1-3 hour delivery within Nairobi guaranteed</li>
									<li>✅ Same-day delivery nationwide (major cities)</li>
									<li>✅ Real-time tracking from dispatch to delivery</li>
								</ul>
							</div>

							<div className="rounded-lg bg-white p-4 shadow-sm">
								<h4 className="mb-3 font-bold text-blue-800">🏆 Quality Assurance</h4>
								<ul className="space-y-2 text-sm text-blue-700">
									<li>✅ Pre-delivery confirmation call/SMS</li>
									<li>✅ Inspect & confirm order before payment</li>
									<li>✅ Secure packaging for luxury items</li>
									<li>✅ Full insurance coverage on all packages</li>
								</ul>
							</div>
						</div>

						<div className="mt-6 rounded-lg bg-gradient-to-r from-amber-100 to-orange-100 p-4 text-center">
							<p className="font-semibold text-amber-800">
								🎯 <strong>Our Promise:</strong> If we don&apos;t meet our delivery time, your next delivery
								is FREE!
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
