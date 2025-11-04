import { Suspense } from "react";
import { Loader } from "@/ui/atoms/Loader";
import { TrackOrder } from "@/ui/components/TrackOrder";

export const metadata = {
	title: "Track Your Order - Luxiorstore",
	description: "Track your Luxiorstore order and get real-time updates on your delivery status.",
};

export default function TrackOrderPage() {
	return (
		<Suspense fallback={<Loader />}>
			<section className="mx-auto max-w-4xl p-8">
				<div className="mb-12 text-center">
					<h1 className="mb-4 text-4xl font-bold text-gray-900">Track Your Order</h1>
					<p className="text-lg text-gray-600">
						Enter your order details to get real-time tracking information.
					</p>
				</div>
				<TrackOrder />
			</section>
		</Suspense>
	);
}
