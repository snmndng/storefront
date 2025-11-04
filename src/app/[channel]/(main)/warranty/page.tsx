import { Suspense } from "react";
import { Loader } from "@/ui/atoms/Loader";
import { WarrantyInfo } from "@/ui/components/WarrantyInfo";

export const metadata = {
	title: "Warranty Information - Luxiorstore",
	description:
		"Learn about our comprehensive warranty coverage for luxury products and how to make warranty claims.",
};

export default function WarrantyPage() {
	return (
		<Suspense fallback={<Loader />}>
			<section className="mx-auto max-w-4xl p-8">
				<div className="mb-12 text-center">
					<h1 className="mb-4 text-4xl font-bold text-gray-900">Warranty Information</h1>
					<p className="text-lg text-gray-600">
						Your luxury purchases are protected with comprehensive warranty coverage.
					</p>
				</div>
				<WarrantyInfo />
			</section>
		</Suspense>
	);
}
