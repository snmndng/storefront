import Link from "next/link";
import { Home, ArrowLeft, Search, ShoppingBag, Phone, Mail } from "lucide-react";
import { Button } from "@/ui/components/Button";

export default function NotFound() {
	return (
		<div className="flex min-h-screen items-center justify-center px-4">
			<div className="mx-auto max-w-2xl text-center">
				{/* Logo */}
				<div className="mb-8">
					<div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500">
						<span className="text-3xl font-bold text-white">L</span>
					</div>
					<h1 className="text-2xl font-bold text-gray-900">Luxiorstore</h1>
					<p className="font-medium text-amber-600">Luxury Redefined</p>
				</div>

				{/* 404 Message */}
				<div className="mb-8">
					<h2 className="mb-4 text-6xl font-bold text-gray-200">404</h2>
					<h3 className="mb-2 text-2xl font-bold text-gray-900">Page Not Found</h3>
					<p className="text-gray-600">
						The page you&apos;re looking for doesn&apos;t exist or has been moved. Don&apos;t worry,
						let&apos;s get you back to shopping luxury items.
					</p>
				</div>

				{/* Action Buttons */}
				<div className="mb-8 grid gap-4 sm:grid-cols-2">
					<Link href="/">
						<Button variant="primary" size="lg" fullWidth icon={<Home className="h-5 w-5" />}>
							Go Home
						</Button>
					</Link>

					<Button
						variant="outline"
						size="lg"
						fullWidth
						icon={<ArrowLeft className="h-5 w-5" />}
						onClick={() => window.history.back()}
					>
						Go Back
					</Button>
				</div>

				{/* Quick Links */}
				<div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					<Link
						href="/search"
						className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
					>
						<Search className="mx-auto mb-2 h-6 w-6 text-amber-600" />
						<h4 className="font-medium text-gray-900">Search Products</h4>
						<p className="text-sm text-gray-600">Find luxury items</p>
					</Link>

					<Link
						href="/categories"
						className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
					>
						<ShoppingBag className="mx-auto mb-2 h-6 w-6 text-amber-600" />
						<h4 className="font-medium text-gray-900">Shop Categories</h4>
						<p className="text-sm text-gray-600">Browse collections</p>
					</Link>

					<Link
						href="/track-order"
						className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
					>
						<Search className="mx-auto mb-2 h-6 w-6 text-amber-600" />
						<h4 className="font-medium text-gray-900">Track Order</h4>
						<p className="text-sm text-gray-600">Check order status</p>
					</Link>

					<Link
						href="/help"
						className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
					>
						<Phone className="mx-auto mb-2 h-6 w-6 text-amber-600" />
						<h4 className="font-medium text-gray-900">Get Help</h4>
						<p className="text-sm text-gray-600">Customer support</p>
					</Link>
				</div>

				{/* Help Links */}
				<div className="border-t border-gray-200 pt-8">
					<p className="mb-4 text-sm text-gray-500">Still need help? Try these options:</p>
					<div className="flex flex-wrap justify-center gap-6 text-sm">
						<Link
							href="/contact"
							className="flex items-center space-x-1 text-amber-600 transition-colors hover:text-amber-700"
						>
							<Mail className="h-4 w-4" />
							<span>Contact Us</span>
						</Link>
						<Link
							href="/help"
							className="text-amber-600 transition-colors hover:text-amber-700 hover:underline"
						>
							Help Center
						</Link>
						<Link
							href="/faq"
							className="text-amber-600 transition-colors hover:text-amber-700 hover:underline"
						>
							FAQ
						</Link>
						<Link
							href="/size-guide"
							className="text-amber-600 transition-colors hover:text-amber-700 hover:underline"
						>
							Size Guide
						</Link>
						<Link
							href="/returns"
							className="text-amber-600 transition-colors hover:text-amber-700 hover:underline"
						>
							Returns
						</Link>
						<a
							href="https://wa.me/254797923313"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center space-x-1 text-amber-600 transition-colors hover:text-amber-700"
						>
							<Phone className="h-4 w-4" />
							<span>WhatsApp</span>
						</a>
					</div>
				</div>

				{/* Contact Info */}
				<div className="mt-8 rounded-lg bg-amber-50 p-6">
					<h4 className="mb-2 font-medium text-amber-800">Need Immediate Assistance?</h4>
					<p className="mb-3 text-sm text-amber-700">
						Our customer service team is available to help you find what you&apos;re looking for.
					</p>
					<div className="flex flex-col gap-2 text-sm text-amber-700 sm:flex-row sm:justify-center sm:gap-6">
						<span>📧 hello@luxiorstore.co.ke</span>
						<span>📞 +254 797 923 313</span>
						<span>💬 WhatsApp Support</span>
					</div>
				</div>
			</div>
		</div>
	);
}
