import { Suspense } from "react";
import { Loader } from "@/ui/atoms/Loader";
import { FAQSection } from "@/ui/components/FAQSection";

export const metadata = {
	title: "Frequently Asked Questions - Luxiorstore",
	description: "Find answers to common questions about Luxiorstore products, shipping, returns, and more.",
};

export default function FAQPage() {
	return (
		<Suspense fallback={<Loader />}>
			<section className="mx-auto max-w-4xl p-8">
				<div className="mb-12 text-center">
					<h1 className="mb-4 text-4xl font-bold text-gray-900">Frequently Asked Questions</h1>
					<p className="text-lg text-gray-600">
						Find answers to the most common questions about our luxury products and services.
					</p>
				</div>
				<FAQSection />
			</section>
		</Suspense>
	);
}
