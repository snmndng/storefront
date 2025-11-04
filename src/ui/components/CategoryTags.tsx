import Link from "next/link";
import { Tag, TrendingUp, Star, Clock } from "lucide-react";

interface CategoryTag {
	id: string;
	name: string;
	slug: string;
	type: "trending" | "new" | "featured" | "sale" | "popular";
	count?: number;
}

interface CategoryTagsProps {
	categorySlug: string;
	tags?: CategoryTag[];
}

// These could be fetched from the backend via GraphQL
const defaultTags: CategoryTag[] = [
	{ id: "1", name: "Trending Now", slug: "trending", type: "trending", count: 24 },
	{ id: "2", name: "New Arrivals", slug: "new-arrivals", type: "new", count: 18 },
	{ id: "3", name: "Best Sellers", slug: "best-sellers", type: "popular", count: 32 },
	{ id: "4", name: "Featured", slug: "featured", type: "featured", count: 12 },
	{ id: "5", name: "On Sale", slug: "sale", type: "sale", count: 8 },
];

const tagStyles = {
	trending: {
		bg: "bg-red-100",
		text: "text-red-800",
		border: "border-red-200",
		icon: <TrendingUp className="h-4 w-4" />,
	},
	new: {
		bg: "bg-green-100",
		text: "text-green-800",
		border: "border-green-200",
		icon: <Clock className="h-4 w-4" />,
	},
	featured: {
		bg: "bg-purple-100",
		text: "text-purple-800",
		border: "border-purple-200",
		icon: <Star className="h-4 w-4" />,
	},
	popular: {
		bg: "bg-blue-100",
		text: "text-blue-800",
		border: "border-blue-200",
		icon: <Star className="h-4 w-4" />,
	},
	sale: {
		bg: "bg-orange-100",
		text: "text-orange-800",
		border: "border-orange-200",
		icon: <Tag className="h-4 w-4" />,
	},
	bestseller: {
		bg: "bg-yellow-100",
		text: "text-yellow-800",
		border: "border-yellow-200",
		icon: <Star className="h-4 w-4" />,
	},
	limited: {
		bg: "bg-indigo-100",
		text: "text-indigo-800",
		border: "border-indigo-200",
		icon: <Clock className="h-4 w-4" />,
	},
	exclusive: {
		bg: "bg-pink-100",
		text: "text-pink-800",
		border: "border-pink-200",
		icon: <Star className="h-4 w-4" />,
	},
};

export function CategoryTags({ categorySlug, tags = defaultTags }: CategoryTagsProps) {
	if (!tags || tags.length === 0) {
		return null;
	}

	return (
		<div className="mb-8">
			<h3 className="mb-4 text-lg font-semibold text-gray-900">Shop by Tag</h3>
			<div className="flex flex-wrap gap-3">
				{tags.map((tag) => {
					const style = tagStyles[tag.type];
					return (
						<Link
							key={tag.id}
							href={`/categories/${categorySlug}?tag=${tag.slug}`}
							className={`inline-flex items-center space-x-2 rounded-full border px-4 py-2 text-sm font-medium transition-all hover:shadow-md ${style.bg} ${style.text} ${style.border} hover:scale-105`}
						>
							{style.icon}
							<span>{tag.name}</span>
							{tag.count && <span className="rounded-full bg-white/50 px-2 py-0.5 text-xs">{tag.count}</span>}
						</Link>
					);
				})}
			</div>
		</div>
	);
}

// Component for product-level tags
interface ProductTag {
	id: string;
	name: string;
	type: "new" | "bestseller" | "limited" | "exclusive" | "sale";
}

interface ProductTagsProps {
	tags: ProductTag[];
	size?: "sm" | "md";
}

export function ProductTags({ tags, size = "sm" }: ProductTagsProps) {
	if (!tags || tags.length === 0) {
		return null;
	}

	const sizeClasses = size === "sm" ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm";

	return (
		<div className="flex flex-wrap gap-1">
			{tags.map((tag) => {
				const style = tagStyles[tag.type] || tagStyles.featured;
				return (
					<span
						key={tag.id}
						className={`inline-flex items-center rounded-full font-medium ${style.bg} ${style.text} ${sizeClasses}`}
					>
						{tag.name}
					</span>
				);
			})}
		</div>
	);
}

// Component for category attributes/metadata
interface CategoryAttribute {
	key: string;
	label: string;
	value: string;
	type: "text" | "number" | "boolean" | "list";
}

interface CategoryAttributesProps {
	attributes: CategoryAttribute[];
}

export function CategoryAttributes({ attributes }: CategoryAttributesProps) {
	if (!attributes || attributes.length === 0) {
		return null;
	}

	return (
		<div className="rounded-lg bg-gray-50 p-6">
			<h3 className="mb-4 text-lg font-semibold text-gray-900">Category Details</h3>
			<dl className="grid gap-4 sm:grid-cols-2">
				{attributes.map((attr) => (
					<div key={attr.key}>
						<dt className="text-sm font-medium text-gray-600">{attr.label}</dt>
						<dd className="mt-1 text-sm text-gray-900">
							{attr.type === "boolean" ? (
								<span
									className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
										attr.value === "true" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
									}`}
								>
									{attr.value === "true" ? "Yes" : "No"}
								</span>
							) : attr.type === "list" ? (
								<div className="flex flex-wrap gap-1">
									{attr.value.split(",").map((item, index) => (
										<span
											key={index}
											className="inline-flex items-center rounded bg-white px-2 py-1 text-xs font-medium text-gray-700 shadow-sm"
										>
											{item.trim()}
										</span>
									))}
								</div>
							) : (
								attr.value
							)}
						</dd>
					</div>
				))}
			</dl>
		</div>
	);
}
