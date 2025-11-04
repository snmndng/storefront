import Link from "next/link";
import { ShoppingBag, Sparkles, Watch, Home, Shirt, Crown } from "lucide-react";
import { executeGraphQL } from "@/lib/graphql";
import { MenuGetBySlugDocument } from "@/gql/graphql";

// Category icons mapping
const categoryIcons: Record<string, React.ReactNode> = {
	women: <Shirt className="h-8 w-8" />,
	men: <Shirt className="h-8 w-8" />,
	jewelry: <Sparkles className="h-8 w-8" />,
	watches: <Watch className="h-8 w-8" />,
	handbags: <ShoppingBag className="h-8 w-8" />,
	accessories: <Crown className="h-8 w-8" />,
	home: <Home className="h-8 w-8" />,
	beauty: <Sparkles className="h-8 w-8" />,
	fashion: <Shirt className="h-8 w-8" />,
	luxury: <Crown className="h-8 w-8" />,
};

// Fallback categories if menu is not available
const fallbackCategories = [
	{
		id: "women-fashion",
		name: "Women&apos;s Fashion",
		slug: "women",
		description: "Elegant dresses, designer tops, luxury outerwear",
		icon: <Shirt className="h-8 w-8" />,
		color: "from-pink-500 to-rose-500",
	},
	{
		id: "men-fashion",
		name: "Men&apos;s Fashion",
		slug: "men",
		description: "Premium suits, casual wear, luxury accessories",
		icon: <Shirt className="h-8 w-8" />,
		color: "from-blue-500 to-indigo-500",
	},
	{
		id: "jewelry",
		name: "Jewelry & Watches",
		slug: "jewelry",
		description: "Fine jewelry, luxury watches, precious stones",
		icon: <Sparkles className="h-8 w-8" />,
		color: "from-amber-500 to-yellow-500",
	},
	{
		id: "handbags",
		name: "Handbags & Accessories",
		slug: "handbags",
		description: "Designer handbags, luxury accessories, leather goods",
		icon: <ShoppingBag className="h-8 w-8" />,
		color: "from-purple-500 to-violet-500",
	},
	{
		id: "home",
		name: "Home & Lifestyle",
		slug: "home",
		description: "Luxury home decor, premium lifestyle products",
		icon: <Home className="h-8 w-8" />,
		color: "from-green-500 to-emerald-500",
	},
	{
		id: "beauty",
		name: "Beauty & Fragrance",
		slug: "beauty",
		description: "Premium cosmetics, luxury fragrances, skincare",
		icon: <Crown className="h-8 w-8" />,
		color: "from-red-500 to-pink-500",
	},
];

function getCategoryIcon(categoryName: string): React.ReactNode {
	const key = categoryName.toLowerCase();
	for (const iconKey of Object.keys(categoryIcons)) {
		if (key.includes(iconKey)) {
			return categoryIcons[iconKey];
		}
	}
	return <ShoppingBag className="h-8 w-8" />;
}

function getCategoryColor(index: number): string {
	const colors = [
		"from-pink-500 to-rose-500",
		"from-blue-500 to-indigo-500",
		"from-amber-500 to-yellow-500",
		"from-purple-500 to-violet-500",
		"from-green-500 to-emerald-500",
		"from-red-500 to-pink-500",
		"from-teal-500 to-cyan-500",
		"from-orange-500 to-red-500",
	];
	return colors[index % colors.length];
}

export async function CategoriesGrid({ channel }: { channel: string }) {
	let categories: Array<{
		id: string;
		name: string;
		slug: string;
		description?: string;
		icon: React.ReactNode;
		color: string;
	}> = [];

	try {
		// Try to get categories from the menu
		const navLinks = await executeGraphQL(MenuGetBySlugDocument, {
			variables: { slug: "navbar", channel },
			revalidate: 60 * 60 * 24,
		});

		if (navLinks.menu?.items) {
			categories = navLinks.menu.items
				.filter((item) => item.category)
				.map((item, index) => ({
					id: item.category!.id,
					name: item.category!.name,
					slug: item.category!.slug,
					description: `Explore our ${item.category!.name.toLowerCase()} collection`,
					icon: getCategoryIcon(item.category!.name),
					color: getCategoryColor(index),
				}));
		}
	} catch (error) {
		console.error("Failed to fetch categories from menu:", error);
	}

	// Use fallback categories if no categories found in menu
	if (categories.length === 0) {
		categories = fallbackCategories;
	}

	return (
		<div className="space-y-8">
			{/* Featured Categories Grid */}
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{categories.map((category) => (
					<Link
						key={category.id}
						href={`/categories/${category.slug}`}
						className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
					>
						<div
							className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 transition-opacity group-hover:opacity-20`}
						/>

						<div className="relative p-8">
							<div
								className={`mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${category.color} text-white shadow-lg`}
							>
								{category.icon}
							</div>

							<h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-gray-700">
								{category.name}
							</h3>

							<p className="text-sm text-gray-600 group-hover:text-gray-500">{category.description}</p>

							<div className="mt-4 flex items-center text-sm font-medium text-amber-600 group-hover:text-amber-700">
								<span>Shop Now</span>
								<svg
									className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
								</svg>
							</div>
						</div>
					</Link>
				))}
			</div>

			{/* Category Features */}
			<div className="mt-16 rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 p-8 text-white">
				<div className="text-center">
					<h2 className="mb-4 text-3xl font-bold">Why Shop by Category?</h2>
					<p className="mb-8 text-gray-300">
						Our carefully curated categories make it easy to find exactly what you&apos;re looking for
					</p>
				</div>

				<div className="grid gap-6 md:grid-cols-3">
					<div className="text-center">
						<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-600">
							<Crown className="h-6 w-6" />
						</div>
						<h3 className="mb-2 font-semibold">Curated Selection</h3>
						<p className="text-sm text-gray-300">
							Each category features hand-picked luxury items from top brands
						</p>
					</div>

					<div className="text-center">
						<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-600">
							<Sparkles className="h-6 w-6" />
						</div>
						<h3 className="mb-2 font-semibold">Premium Quality</h3>
						<p className="text-sm text-gray-300">
							All products meet our strict quality and authenticity standards
						</p>
					</div>

					<div className="text-center">
						<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-600">
							<ShoppingBag className="h-6 w-6" />
						</div>
						<h3 className="mb-2 font-semibold">Easy Discovery</h3>
						<p className="text-sm text-gray-300">Find new favorites and trending items in each category</p>
					</div>
				</div>
			</div>

			{/* Call to Action */}
			<div className="rounded-2xl bg-amber-50 p-8 text-center">
				<h3 className="mb-4 text-2xl font-bold text-amber-800">
					Can&apos;t Find What You&apos;re Looking For?
				</h3>
				<p className="mb-6 text-amber-700">
					Use our search feature or contact our personal shopping service for assistance
				</p>
				<div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
					<Link
						href="/search"
						className="rounded-lg bg-amber-600 px-6 py-3 font-medium text-white transition-colors hover:bg-amber-700"
					>
						Search Products
					</Link>
					<Link
						href="/contact"
						className="rounded-lg border border-amber-600 px-6 py-3 font-medium text-amber-600 transition-colors hover:bg-amber-600 hover:text-white"
					>
						Personal Shopping
					</Link>
				</div>
			</div>
		</div>
	);
}
