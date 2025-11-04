import { Suspense } from "react";
import { Loader } from "@/ui/atoms/Loader";
import { CategoriesGrid } from "@/ui/components/CategoriesGrid";

export const metadata = {
	title: "Shop by Category - Luxiorstore",
	description: "Browse our luxury product categories including fashion, jewelry, handbags, and more.",
};

export default async function CategoriesPage(props: { params: Promise<{ channel: string }> }) {
	const params = await props.params;
	return (
		<Suspense fallback={<Loader />}>
			<section className="mx-auto max-w-7xl p-8">
				<div className="mb-12 text-center">
					<h1 className="mb-4 text-4xl font-bold text-gray-900">Shop by Category</h1>
					<p className="text-lg text-gray-600">
						Discover our curated collection of luxury products across different categories
					</p>
				</div>
				<CategoriesGrid channel={params.channel} />
			</section>
		</Suspense>
	);
}
