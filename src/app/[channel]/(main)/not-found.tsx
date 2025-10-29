import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/ui/components/Button";

export default function NotFound() {
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

				{/* 404 Message */}
				<div className="mb-8">
					<h2 className="mb-4 text-6xl font-bold text-gray-200">404</h2>
					<h3 className="mb-2 text-2xl font-bold text-gray-900">Page Not Found</h3>
					<p className="text-gray-600">
						The page you&apos;re looking for doesn&apos;t exist or has been moved.
					</p>
				</div>

				{/* Action Buttons */}
				<div className="space-y-4">
					<Button variant="primary" size="lg" fullWidth icon={<Home className="h-5 w-5" />}>
						<Link href="/" className="flex items-center justify-center space-x-2">
							<span>Go Home</span>
						</Link>
					</Button>

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

				{/* Help Links */}
				<div className="mt-8 border-t border-gray-200 pt-8">
					<p className="mb-4 text-sm text-gray-500">Need help? Try these links:</p>
					<div className="flex flex-wrap justify-center gap-4 text-sm">
						<Link href="/contact" className="text-amber-600 transition-colors hover:text-amber-700">
							Contact Us
						</Link>
						<Link href="/help" className="text-amber-600 transition-colors hover:text-amber-700">
							Help Center
						</Link>
						<Link href="/faq" className="text-amber-600 transition-colors hover:text-amber-700">
							FAQ
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
