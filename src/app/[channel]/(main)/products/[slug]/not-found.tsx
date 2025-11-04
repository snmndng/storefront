import Link from "next/link";
import { Search, ArrowLeft, Package } from "lucide-react";

export default function NotFound() {
	return (
		<div className="mx-auto max-w-7xl px-8 py-16">
			<div className="mx-auto max-w-3xl text-center">
				<Package className="mx-auto mb-6 h-24 w-24 text-gray-300" />
				<h2 className="mb-4 text-6xl font-bold text-amber-600">404</h2>
				<p className="mb-4 text-3xl font-semibold tracking-tight text-gray-900">Product Not Found</p>
				<p className="mb-8 text-lg text-gray-600">
					Sorry, we couldn&apos;t find the product you&apos;re looking for. It may have been removed, renamed,
					or is temporarily unavailable.
				</p>

				<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
					<Link
						href="/products"
						className="inline-flex items-center rounded-lg bg-amber-600 px-6 py-3 text-white transition-colors hover:bg-amber-700"
					>
						<ArrowLeft className="mr-2 h-5 w-5" />
						Back to Products
					</Link>
					<Link
						href="/search"
						className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-gray-700 transition-colors hover:bg-gray-50"
					>
						<Search className="mr-2 h-5 w-5" />
						Search Products
					</Link>
				</div>

				<div className="mt-12 rounded-lg bg-amber-50 p-6">
					<h3 className="mb-2 font-semibold text-amber-800">Need Help?</h3>
					<p className="text-amber-700">
						If you believe this is an error, please{" "}
						<Link href="/contact" className="underline hover:text-amber-900">
							contact our support team
						</Link>
						.
					</p>
				</div>
			</div>
		</div>
	);
}
