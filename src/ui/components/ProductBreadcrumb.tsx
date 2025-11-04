import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface ProductBreadcrumbProps {
	category?: {
		id: string;
		name: string;
		slug?: string;
	} | null;
	productName: string;
	channel: string;
}

export function ProductBreadcrumb({ category, productName, channel }: ProductBreadcrumbProps) {
	return (
		<nav className="mb-6 flex items-center space-x-2 text-sm text-gray-600" aria-label="Breadcrumb">
			<Link href={`/${channel}`} className="flex items-center transition-colors hover:text-amber-600">
				<Home className="mr-1 h-4 w-4" />
				Home
			</Link>

			<ChevronRight className="h-4 w-4 text-gray-400" />

			<Link href={`/${channel}/products`} className="transition-colors hover:text-amber-600">
				Products
			</Link>

			{category && (
				<>
					<ChevronRight className="h-4 w-4 text-gray-400" />
					<Link
						href={`/${channel}/categories/${category.slug || category.id}`}
						className="transition-colors hover:text-amber-600"
					>
						{category.name}
					</Link>
				</>
			)}

			<ChevronRight className="h-4 w-4 text-gray-400" />
			<span className="max-w-xs truncate font-medium text-gray-900" title={productName}>
				{productName}
			</span>
		</nav>
	);
}
