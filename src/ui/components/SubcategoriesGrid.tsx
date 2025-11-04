import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";

interface Subcategory {
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
}

interface SubcategoriesGridProps {
	subcategories: Subcategory[];
}

export function SubcategoriesGrid({ subcategories }: SubcategoriesGridProps) {
	if (!subcategories || subcategories.length === 0) {
		return null;
	}

	return (
		<div className="mb-12">
			<div className="mb-6 flex items-center justify-between">
				<h2 className="text-2xl font-bold text-gray-900">Shop by Subcategory</h2>
				<Link
					href="/categories"
					className="flex items-center space-x-1 text-sm font-medium text-amber-600 hover:text-amber-700"
				>
					<span>View All Categories</span>
					<ArrowRight className="h-4 w-4" />
				</Link>
			</div>

			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{subcategories.map((subcategory) => (
					<Link
						key={subcategory.id}
						href={`/categories/${subcategory.slug}`}
						className="group relative overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
					>
						{/* Background Image */}
						<div className="aspect-[4/3] overflow-hidden bg-gray-100">
							{subcategory.backgroundImage?.url ? (
								<img
									src={subcategory.backgroundImage.url}
									alt={subcategory.backgroundImage.alt || subcategory.name}
									className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
								/>
							) : (
								<div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
									<Package className="h-12 w-12 text-gray-400" />
								</div>
							)}

							{/* Overlay */}
							<div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
						</div>

						{/* Content */}
						<div className="p-4">
							<h3 className="mb-1 font-semibold text-gray-900 group-hover:text-amber-600">
								{subcategory.name}
							</h3>

							{subcategory.description && (
								<p className="mb-2 line-clamp-2 text-sm text-gray-600">{subcategory.description}</p>
							)}

							<div className="flex items-center justify-between">
								<span className="text-xs text-gray-500">
									{subcategory.products?.totalCount || 0} products
								</span>
								<ArrowRight className="h-4 w-4 text-gray-400 transition-colors group-hover:text-amber-600" />
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}

// Compact version for sidebar or smaller spaces
export function SubcategoriesList({ subcategories }: SubcategoriesGridProps) {
	if (!subcategories || subcategories.length === 0) {
		return null;
	}

	return (
		<div className="rounded-lg border border-gray-200 bg-white p-4">
			<h3 className="mb-4 font-semibold text-gray-900">Subcategories</h3>
			<ul className="space-y-2">
				{subcategories.map((subcategory) => (
					<li key={subcategory.id}>
						<Link
							href={`/categories/${subcategory.slug}`}
							className="flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-gray-50"
						>
							<span className="text-gray-700 hover:text-gray-900">{subcategory.name}</span>
							<span className="text-xs text-gray-500">{subcategory.products?.totalCount || 0}</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
