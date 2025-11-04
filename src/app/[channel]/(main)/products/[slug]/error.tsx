"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, RefreshCw } from "lucide-react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	useEffect(() => {
		console.error("Product page error:", error);
	}, [error]);

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
			<div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
				<div className="mb-6">
					<AlertCircle className="mx-auto mb-4 h-16 w-16 text-red-500" />
					<h1 className="mb-2 text-2xl font-bold text-gray-900">Oops! Something went wrong</h1>
					<p className="text-gray-600">
						We encountered an error while loading this product. This might be due to:
					</p>
				</div>

				<div className="mb-8 text-left">
					<ul className="space-y-2 text-sm text-gray-600">
						<li>• The product might not exist or has been removed</li>
						<li>• There might be a temporary server issue</li>
						<li>• Your internet connection might be unstable</li>
					</ul>
				</div>

				<div className="space-y-4">
					<button
						onClick={reset}
						className="flex w-full items-center justify-center rounded-lg bg-amber-600 px-6 py-3 font-medium text-white transition-colors hover:bg-amber-700"
					>
						<RefreshCw className="mr-2 h-5 w-5" />
						Try Again
					</button>

					<Link
						href="/luxior-main/products"
						className="flex w-full items-center justify-center rounded-lg bg-gray-100 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-200"
					>
						<ArrowLeft className="mr-2 h-5 w-5" />
						Back to Products
					</Link>
				</div>

				<div className="mt-8 border-t border-gray-200 pt-6">
					<p className="text-sm text-gray-500">
						If the problem persists, please{" "}
						<Link href="/luxior-main/contact" className="text-amber-600 hover:underline">
							contact our support team
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
