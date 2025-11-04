"use client";

import { useState } from "react";
import Link from "next/link";
import { Grid, List, Filter, X } from "lucide-react";
import { ProductList } from "@/ui/components/ProductList";
import { CategoryBreadcrumb } from "@/ui/components/CategoryBreadcrumb";
import { CategoryTags } from "@/ui/components/CategoryTags";
import { CategoryFilters } from "@/ui/components/CategoryFilters";
import { SubcategoriesGrid } from "@/ui/components/SubcategoriesGrid";

interface CategoryPageContentProps {
	category: {
		id: string;
		name: string;
		slug: string;
		description?: string | null;
		seoTitle?: string | null;
		seoDescription?: string | null;
		backgroundImage?: {
			url: string;
			alt?: string | null;
		} | null;
		parent?: {
			id: string;
			name: string;
			slug: string;
		} | null;
		children?: {
			edges: Array<{
				node: {
					id: string;
					name: string;
					slug: string;
					description?: string | null;
					backgroundImage?: {
						url: string;
						alt?: string | null;
					} | null;
					products?: {
						totalCount?: number | null;
					} | null;
				};
			}>;
		} | null;
		ancestors?: {
			edges: Array<{
				node: {
					id: string;
					name: string;
					slug: string;
				};
			}>;
		} | null;
		products?: {
			totalCount?: number | null;
			edges: Array<{
				node: any; // ProductListItem type
			}>;
		} | null;
	};
}

export function CategoryPageContent({ category }: CategoryPageContentProps) {
	const [showFilters, setShowFilters] = useState(false);
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [sortBy, setSortBy] = useState("featured");
	const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});

	const { name, description, products, children, ancestors } = category;
	const productCount = products?.totalCount || products?.edges.length || 0;
	const subcategories = children?.edges.map((edge) => edge.node) || [];

	const handleFiltersChange = (filters: Record<string, string[]>) => {
		setActiveFilters(filters);
		// Here you would typically refetch products with the new filters
		console.log("Filters changed:", filters);
	};

	const clearAllFilters = () => {
		setActiveFilters({});
		handleFiltersChange({});
	};

	const getTotalActiveFilters = () => {
		return Object.values(activeFilters).reduce((total, filters) => total + filters.length, 0);
	};

	return (
		<div className="mx-auto max-w-7xl p-8">
			{/* Breadcrumb */}
			<div className="mb-8">
				<CategoryBreadcrumb
					ancestors={ancestors?.edges || []}
					currentCategory={{ name, slug: category.slug }}
				/>
			</div>

			{/* Category Header */}
			<div className="mb-8">
				{category.backgroundImage?.url && (
					<div className="mb-6 aspect-[3/1] overflow-hidden rounded-2xl">
						<img
							src={category.backgroundImage.url}
							alt={category.backgroundImage.alt || name}
							className="h-full w-full object-cover"
						/>
					</div>
				)}

				<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
					<div>
						<h1 className="mb-2 text-3xl font-bold text-gray-900 lg:text-4xl">{name}</h1>
						{description && (
							<p className="text-lg text-gray-600 lg:max-w-2xl">
								{typeof description === "string" ? description : "Discover our premium collection"}
							</p>
						)}
						<p className="mt-2 text-sm text-gray-500">
							{productCount} {productCount === 1 ? "product" : "products"} available
						</p>
					</div>
				</div>
			</div>

			{/* Subcategories */}
			{subcategories.length > 0 && <SubcategoriesGrid subcategories={subcategories} />}

			{/* Category Tags */}
			<CategoryTags categorySlug={category.slug} />

			{/* Filters and Sort Bar */}
			<div className="mb-8 flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
				<div className="flex items-center space-x-4">
					<button
						onClick={() => setShowFilters(!showFilters)}
						className="flex items-center space-x-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
					>
						<Filter className="h-4 w-4" />
						<span>Filters</span>
						{getTotalActiveFilters() > 0 && (
							<span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
								{getTotalActiveFilters()}
							</span>
						)}
					</button>

					<select
						value={sortBy}
						onChange={(e) => setSortBy(e.target.value)}
						className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
					>
						<option value="featured">Sort by: Featured</option>
						<option value="price-low">Price: Low to High</option>
						<option value="price-high">Price: High to Low</option>
						<option value="newest">Newest First</option>
						<option value="popular">Most Popular</option>
						<option value="rating">Highest Rated</option>
					</select>

					{getTotalActiveFilters() > 0 && (
						<button
							onClick={clearAllFilters}
							className="flex items-center space-x-1 text-sm text-amber-600 hover:text-amber-700"
						>
							<X className="h-4 w-4" />
							<span>Clear All</span>
						</button>
					)}
				</div>

				<div className="flex items-center space-x-2">
					<span className="text-sm text-gray-600">View:</span>
					<button
						onClick={() => setViewMode("grid")}
						className={`rounded p-2 transition-colors ${
							viewMode === "grid"
								? "bg-amber-100 text-amber-600"
								: "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
						}`}
					>
						<Grid className="h-4 w-4" />
					</button>
					<button
						onClick={() => setViewMode("list")}
						className={`rounded p-2 transition-colors ${
							viewMode === "list"
								? "bg-amber-100 text-amber-600"
								: "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
						}`}
					>
						<List className="h-4 w-4" />
					</button>
				</div>
			</div>

			{/* Main Content Area */}
			<div className="flex gap-8">
				{/* Filters Sidebar */}
				{showFilters && (
					<div className="w-80 shrink-0">
						<CategoryFilters
							isOpen={showFilters}
							onToggle={() => setShowFilters(!showFilters)}
							onFiltersChange={handleFiltersChange}
						/>
					</div>
				)}

				{/* Products */}
				<div className="flex-1">
					{products && products.edges.length > 0 ? (
						<div className="space-y-8">
							<ProductList
								products={products.edges.map(
									(e: any) =>
										// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
										e.node,
								)}
							/>

							{/* Load More / Pagination */}
							{productCount > products.edges.length && (
								<div className="text-center">
									<button className="rounded-lg bg-amber-600 px-8 py-3 font-medium text-white transition-colors hover:bg-amber-700">
										Load More Products ({productCount - products.edges.length} remaining)
									</button>
								</div>
							)}
						</div>
					) : (
						<div className="py-16 text-center">
							<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
								<Grid className="h-8 w-8 text-gray-400" />
							</div>
							<h3 className="mb-2 text-lg font-medium text-gray-900">No products found</h3>
							<p className="mb-6 text-gray-600">
								{getTotalActiveFilters() > 0
									? "No products match your current filters. Try adjusting your selection."
									: "We&apos;re currently updating this category. Check back soon for new arrivals!"}
							</p>
							<div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
								{getTotalActiveFilters() > 0 ? (
									<button
										onClick={clearAllFilters}
										className="rounded-lg bg-amber-600 px-6 py-2 font-medium text-white transition-colors hover:bg-amber-700"
									>
										Clear All Filters
									</button>
								) : (
									<Link
										href="/categories"
										className="rounded-lg bg-amber-600 px-6 py-2 font-medium text-white transition-colors hover:bg-amber-700"
									>
										Browse All Categories
									</Link>
								)}
								<Link
									href="/contact"
									className="rounded-lg border border-gray-300 px-6 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50"
								>
									Contact Us
								</Link>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Category Information */}
			<div className="mt-16 rounded-lg bg-amber-50 p-8">
				<h2 className="mb-4 text-2xl font-bold text-amber-800">About {name}</h2>
				<div className="grid gap-6 lg:grid-cols-2">
					<div>
						<p className="mb-4 text-amber-700">
							{description ||
								`Discover our carefully curated ${name.toLowerCase()} collection featuring premium brands and exceptional quality.`}
						</p>
						<p className="text-amber-700">
							Each item in our {name.toLowerCase()} category is selected for its craftsmanship, authenticity,
							and luxury appeal. Shop with confidence knowing you&apos;re getting genuine products backed by
							our quality guarantee.
						</p>
					</div>
					<div className="space-y-4">
						<div className="flex items-start space-x-3">
							<div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-600 text-white">
								<span className="text-xs">✓</span>
							</div>
							<div>
								<h4 className="font-medium text-amber-800">Authentic Products</h4>
								<p className="text-sm text-amber-700">100% genuine items from authorized dealers</p>
							</div>
						</div>
						<div className="flex items-start space-x-3">
							<div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-600 text-white">
								<span className="text-xs">✓</span>
							</div>
							<div>
								<h4 className="font-medium text-amber-800">Quality Guarantee</h4>
								<p className="text-sm text-amber-700">Rigorous quality control and inspection</p>
							</div>
						</div>
						<div className="flex items-start space-x-3">
							<div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-600 text-white">
								<span className="text-xs">✓</span>
							</div>
							<div>
								<h4 className="font-medium text-amber-800">Expert Curation</h4>
								<p className="text-sm text-amber-700">Hand-picked by luxury product specialists</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
