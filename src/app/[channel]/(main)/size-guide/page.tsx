import { Suspense } from "react";
import { Loader } from "@/ui/atoms/Loader";
import { SizeGuide } from "@/ui/components/SizeGuide";

export const metadata = {
	title: "Size Guide - Luxiorstore",
	description:
		"Find your perfect fit with our comprehensive size guide for clothing, shoes, and accessories.",
};

export default function SizeGuidePage() {
	return (
		<Suspense fallback={<Loader />}>
			<section className="mx-auto max-w-6xl p-8">
				<div className="mb-12 text-center">
					<h1 className="mb-4 text-4xl font-bold text-gray-900">Size Guide</h1>
					<p className="text-lg text-gray-600">
						Find your perfect fit with our detailed size charts and measurement guide.
					</p>
				</div>
				<SizeGuide />
			</section>
		</Suspense>
	);
}
