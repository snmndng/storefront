"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/ui/components/Button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	useEffect(() => {
		// Log the error to an error reporting service in production
		if (process.env.NODE_ENV === "production") {
			// Example: Sentry.captureException(error);
			console.error("Production error:", error);
		} else {
			console.error("Development error:", error);
		}
	}, [error]);

	return (
		<div className="flex min-h-screen items-center justify-center px-4">
			<div className="mx-auto max-w-md text-center">
				{/* Logo */}
				<div className="mb-8">
					<div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500">
						<span className="text-3xl font-bold text-white">L</span>
					</div>
					<h1 className="text-2xl font-bold text-gray-900">Luxiorstore</h1>
					<p className="font-medium text-amber-600">Luxury Redefined</p>
				</div>

				{/* Error Icon */}
				<div className="mb-6">
					<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
						<AlertTriangle className="h-8 w-8 text-red-600" />
					</div>
				</div>

				{/* Error Message */}
				<div className="mb-8">
					<h2 className="mb-2 text-2xl font-bold text-gray-900">Something went wrong</h2>
					<p className="text-gray-600">
						We apologize for the inconvenience. Our team has been notified and is working to fix this issue.
					</p>
				</div>

				{/* Action Buttons */}
				<div className="space-y-4">
					<Button
						onClick={reset}
						variant="primary"
						size="lg"
						fullWidth
						icon={<RefreshCw className="h-5 w-5" />}
					>
						Try Again
					</Button>

					<Button variant="outline" size="lg" fullWidth icon={<Home className="h-5 w-5" />}>
						<Link href="/" className="flex items-center justify-center space-x-2">
							<span>Go Home</span>
						</Link>
					</Button>
				</div>

				{/* Contact Support */}
				<div className="mt-8 border-t border-gray-200 pt-8">
					<p className="mb-4 text-sm text-gray-500">Still having issues?</p>
					<div className="flex flex-wrap justify-center gap-4 text-sm">
						<Link href="/contact" className="text-amber-600 transition-colors hover:text-amber-700">
							Contact Support
						</Link>
						<Link href="/help" className="text-amber-600 transition-colors hover:text-amber-700">
							Help Center
						</Link>
					</div>
				</div>

				{/* Development Error Details */}
				{process.env.NODE_ENV === "development" && (
					<details className="mt-8 text-left">
						<summary className="mb-2 cursor-pointer text-sm text-gray-500 hover:text-gray-700">
							Error Details (Development Only)
						</summary>
						<div className="max-h-40 overflow-auto rounded-lg bg-gray-100 p-4 text-xs text-gray-800">
							<pre>{error.message}</pre>
							{error.stack && <pre className="mt-2 text-xs">{error.stack}</pre>}
						</div>
					</details>
				)}
			</div>
		</div>
	);
}
