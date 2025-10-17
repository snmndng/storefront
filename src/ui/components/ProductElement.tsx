import { LinkWithChannel } from "../atoms/LinkWithChannel";
import { ProductImageWrapper } from "@/ui/atoms/ProductImageWrapper";

import type { ProductListItemFragment } from "@/gql/graphql";
import { formatMoneyRange } from "@/lib/utils";

export function ProductElement({
	product,
	loading,
	priority,
}: { product: ProductListItemFragment } & { loading: "eager" | "lazy"; priority?: boolean }) {
	return (
		<li data-testid="ProductElement">
			<LinkWithChannel href={`/products/${product.slug}`} key={product.id}>
				<div className="group card overflow-hidden hover:scale-[1.02] transition-all duration-300">
					<div className="relative overflow-hidden bg-gray-100 rounded-t-xl">
						{product?.thumbnail?.url && (
							<ProductImageWrapper
								loading={loading}
								src={product.thumbnail.url}
								alt={product.thumbnail.alt ?? ""}
								width={512}
								height={512}
								sizes={"512px"}
								priority={priority}
								className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
							/>
						)}
						{!product?.thumbnail?.url && (
							<div className="w-full h-64 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
								<span className="text-gray-400 text-sm">No image</span>
							</div>
						)}
					</div>
					<div className="p-4">
						<div className="flex justify-between items-start mb-2">
							<div className="flex-1">
								<h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
									{product.name}
								</h3>
								{product.category?.name && (
									<p className="text-sm text-gray-500 mt-1" data-testid="ProductElement_Category">
										{product.category.name}
									</p>
								)}
							</div>
						</div>
						<div className="flex justify-between items-center mt-3">
							<p className="text-lg font-bold text-gray-900" data-testid="ProductElement_PriceRange">
								{formatMoneyRange({
									start: product?.pricing?.priceRange?.start?.gross,
									stop: product?.pricing?.priceRange?.stop?.gross,
								})}
							</p>
							<div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
								<span className="text-sm text-blue-600 font-medium">View Details →</span>
							</div>
						</div>
					</div>
				</div>
			</LinkWithChannel>
		</li>
	);
}
