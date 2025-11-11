"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, Home, RefreshCw } from "lucide-react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	useEffect(() => {
		console.error("Product page error:", error);
	}, [error]);

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
			<div className="w-full max-w-md text-center">
				<div className="mb-6 flex justify-center">
					<div className="rounded-full bg-red-100 p-4">
						<AlertCircle className="h-12 w-12 text-red-600" />
					</div>
				</div>

				<h1 className="mb-2 text-3xl font-bold text-gray-900">Something went wrong</h1>
				<p className="mb-6 text-gray-600">
					We encountered an error while loading this product. This could be due to a server issue or
					connectivity problem.
				</p>

				{error.message && (
					<div className="mb-6 rounded-lg bg-red-50 p-4 text-left">
						<p className="text-sm font-medium text-red-800">Error details:</p>
						<p className="mt-1 text-sm text-red-700">{error.message}</p>
						{error.digest && <p className="mt-1 text-xs text-red-600">Error ID: {error.digest}</p>}
					</div>
				)}

				<div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
					<button
						onClick={reset}
						className="flex items-center justify-center gap-2 rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-amber-700"
					>
						<RefreshCw className="h-4 w-4" />
						Try Again
					</button>
					<Link
						href="/"
						className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
					>
						<Home className="h-4 w-4" />
						Go Home
					</Link>
				</div>

				<div className="mt-8 text-sm text-gray-500">
					<p>If this problem persists, please contact support.</p>
				</div>
			</div>
		</div>
	);
}
