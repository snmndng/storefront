import { Suspense } from "react";
import { Loader } from "@/ui/atoms/Loader";
import { NewsletterSignup } from "@/ui/components/NewsletterSignup";

export const metadata = {
	title: "Stay in the Loop - Luxiorstore Newsletter",
	description: "Get exclusive offers, new arrivals, and luxury lifestyle content delivered to your inbox.",
};

export default function NewsletterPage() {
	return (
		<Suspense fallback={<Loader />}>
			<section className="mx-auto max-w-4xl p-8">
				<NewsletterSignup />
			</section>
		</Suspense>
	);
}
