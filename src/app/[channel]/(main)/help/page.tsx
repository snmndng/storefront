import { Suspense } from "react";
import { Loader } from "@/ui/atoms/Loader";
import { HelpCenter } from "@/ui/components/HelpCenter";

export const metadata = {
	title: "Help Center - Luxiorstore",
	description:
		"Get help with your Luxiorstore experience. Find guides, contact support, and get answers to your questions.",
};

export default function HelpPage() {
	return (
		<Suspense fallback={<Loader />}>
			<section className="mx-auto max-w-6xl p-8">
				<div className="mb-12 text-center">
					<h1 className="mb-4 text-4xl font-bold text-gray-900">Help Center</h1>
					<p className="text-lg text-gray-600">
						We&apos;re here to help you have the best luxury shopping experience.
					</p>
				</div>
				<HelpCenter />
			</section>
		</Suspense>
	);
}
