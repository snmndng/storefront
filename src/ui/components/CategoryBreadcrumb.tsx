import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
	id: string;
	name: string;
	slug: string;
}

interface CategoryBreadcrumbProps {
	ancestors?: Array<{ node: BreadcrumbItem }>;
	currentCategory: {
		name: string;
		slug: string;
	};
	showHome?: boolean;
}

export function CategoryBreadcrumb({
	ancestors = [],
	currentCategory,
	showHome = true,
}: CategoryBreadcrumbProps) {
	const breadcrumbItems = [
		...(showHome ? [{ id: "home", name: "Home", slug: "/" }] : []),
		{ id: "categories", name: "Categories", slug: "/categories" },
		...ancestors.map((ancestor) => ancestor.node),
		{ id: currentCategory.slug, name: currentCategory.name, slug: `/categories/${currentCategory.slug}` },
	];

	return (
		<nav className="flex items-center space-x-2 text-sm" aria-label="Breadcrumb">
			<ol className="flex items-center space-x-2">
				{breadcrumbItems.map((item, index) => {
					const isLast = index === breadcrumbItems.length - 1;
					const isHome = item.id === "home";

					return (
						<li key={item.id} className="flex items-center">
							{index > 0 && <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />}

							{isLast ? (
								<span className="font-medium text-gray-900" aria-current="page">
									{item.name}
								</span>
							) : (
								<Link
									href={item.slug}
									className="flex items-center text-gray-600 transition-colors hover:text-amber-600"
								>
									{isHome && <Home className="mr-1 h-4 w-4" />}
									{item.name}
								</Link>
							)}
						</li>
					);
				})}
			</ol>
		</nav>
	);
}

// Structured data for SEO
export function CategoryBreadcrumbStructuredData({
	ancestors = [],
	currentCategory,
}: CategoryBreadcrumbProps) {
	const breadcrumbItems = [
		{ name: "Home", url: "/" },
		{ name: "Categories", url: "/categories" },
		...ancestors.map((ancestor) => ({
			name: ancestor.node.name,
			url: `/categories/${ancestor.node.slug}`,
		})),
		{
			name: currentCategory.name,
			url: `/categories/${currentCategory.slug}`,
		},
	];

	const structuredData = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: breadcrumbItems.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: `https://luxiorstore.co.ke${item.url}`,
		})),
	};

	return (
		<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
	);
}
