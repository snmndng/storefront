import { notFound } from "next/navigation";
import { type ResolvingMetadata, type Metadata } from "next";
import { ProductListByCategoryDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { CategoryPageContent } from "@/ui/components/CategoryPageContent";

export const generateMetadata = async (
	props: { params: Promise<{ slug: string; channel: string }> },
	_parent: ResolvingMetadata,
): Promise<Metadata> => {
	const params = await props.params;
	const { category } = await executeGraphQL(ProductListByCategoryDocument, {
		variables: { slug: params.slug, channel: params.channel },
		revalidate: 60,
	});

	if (!category) {
		return {
			title: "Category Not Found - Luxiorstore",
			description: "The requested category could not be found.",
		};
	}

	const title = category.seoTitle || `${category.name} - Luxury Collection | Luxiorstore`;
	const description =
		category.seoDescription ||
		category.description ||
		`Discover our premium ${category.name.toLowerCase()} collection at Luxiorstore. Shop authentic luxury products with exceptional quality and service.`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: "website",
			siteName: "Luxiorstore",
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
		},
		alternates: {
			canonical: `/categories/${params.slug}`,
		},
	};
};

export default async function Page(props: { params: Promise<{ slug: string; channel: string }> }) {
	const params = await props.params;
	const { category } = await executeGraphQL(ProductListByCategoryDocument, {
		variables: { slug: params.slug, channel: params.channel },
		revalidate: 60,
	});

	if (!category || !category.products) {
		notFound();
	}

	return <CategoryPageContent category={category} />;
}
