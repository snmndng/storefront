import { Heart, ShoppingCart, Eye, Star, Zap } from "lucide-react";
import { LinkWithChannel } from "../atoms/LinkWithChannel";
import { IconButton } from "./Button";
import { ProductImageWrapper } from "@/ui/atoms/ProductImageWrapper";
import { brandConfig } from "@/config/branding";

import type { ProductListItemFragment } from "@/gql/graphql";
import { formatMoneyRange } from "@/lib/utils";

export function ProductElement({
	product,
	loading,
	priority,
}: { product: ProductListItemFragment } & { loading: "eager" | "lazy"; priority?: boolean }) {
	const { productCards } = brandConfig.components;
	const { features } = brandConfig;
	const { showQuickView, showWishlist, showRating, showBadges, hoverEffect } = productCards;

	// Mock data for enhanced features
	const isOnSale = Math.random() > 0.7;
	const isNew = Math.random() > 0.8;
	const isBestSeller = Math.random() > 0.9;
	const rating = 4.2 + Math.random() * 0.8;
	const reviewCount = Math.floor(Math.random() * 200) + 10;

	return (
		<li data-testid="ProductElement">
			<div className="card-product group relative">
				{/* Product Badges */}
				{showBadges && (
					<div className="absolute left-3 top-3 z-10 flex flex-col space-y-2">
						{isNew && (
							<span className="badge badge-primary flex items-center space-x-1">
								<Zap className="h-3 w-3" />
								<span>New</span>
							</span>
						)}
						{isBestSeller && <span className="badge badge-warning">Best Seller</span>}
						{isOnSale && <span className="badge badge-error">Sale</span>}
					</div>
				)}

				{/* Wishlist Button */}
				{showWishlist && (
					<div className="absolute right-3 top-3 z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
						<IconButton
							icon={<Heart className="h-4 w-4" />}
							variant="secondary"
							size="sm"
							aria-label="Add to wishlist"
							className="bg-white/90 shadow-md backdrop-blur-sm hover:bg-white"
						/>
					</div>
				)}

				<LinkWithChannel href={`/products/${encodeURIComponent(product.slug)}`} key={product.id}>
					{/* Product Image */}
					<div className="relative overflow-hidden rounded-t-xl bg-gray-100">
						{product?.thumbnail?.url && (
							<ProductImageWrapper
								loading={loading}
								src={product.thumbnail.url}
								alt={product.thumbnail.alt ?? ""}
								width={512}
								height={512}
								sizes={"512px"}
								priority={priority}
								className={`h-64 w-full object-cover transition-transform duration-300 ${
									hoverEffect === "zoom"
										? "group-hover:scale-110"
										: hoverEffect === "lift"
											? "group-hover:scale-105"
											: ""
								}`}
							/>
						)}
						{!product?.thumbnail?.url && (
							<div className="flex h-64 w-full items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
								<span className="text-sm text-gray-400">No image</span>
							</div>
						)}

						{/* Quick Actions Overlay */}
						<div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
							<div className="flex space-x-2">
								{showQuickView && (
									<IconButton
										icon={<Eye className="h-4 w-4" />}
										variant="secondary"
										size="sm"
										aria-label="Quick view"
										className="bg-white/90 backdrop-blur-sm hover:bg-white"
									/>
								)}
								<IconButton
									icon={<ShoppingCart className="h-4 w-4" />}
									variant="primary"
									size="sm"
									aria-label="Add to cart"
									className="bg-blue-600/90 backdrop-blur-sm hover:bg-blue-600"
								/>
							</div>
						</div>
					</div>

					{/* Product Info */}
					<div className="p-4">
						{/* Rating */}
						{showRating && features.productRatings && (
							<div className="mb-2 flex items-center space-x-1">
								<div className="flex items-center">
									{Array.from({ length: 5 }, (_, i) => (
										<Star
											key={i}
											className={`h-3 w-3 ${
												i < Math.floor(rating) ? "fill-current text-yellow-400" : "text-gray-300"
											}`}
										/>
									))}
								</div>
								<span className="text-xs text-gray-500">
									{rating.toFixed(1)} ({reviewCount})
								</span>
							</div>
						)}

						{/* Product Name & Category */}
						<div className="mb-2 flex items-start justify-between">
							<div className="flex-1">
								<h3 className="line-clamp-2 text-lg font-semibold text-gray-900 transition-colors duration-200 group-hover:text-blue-600">
									{product.name}
								</h3>
								{product.category?.name && (
									<p className="mt-1 text-sm text-gray-500" data-testid="ProductElement_Category">
										{product.category.name}
									</p>
								)}
							</div>
						</div>

						{/* Price & Actions */}
						<div className="mt-3 flex items-center justify-between">
							<div className="flex flex-col">
								<p className="text-lg font-bold text-gray-900" data-testid="ProductElement_PriceRange">
									{formatMoneyRange({
										start: product?.pricing?.priceRange?.start?.gross,
										stop: product?.pricing?.priceRange?.stop?.gross,
									})}
								</p>
								{isOnSale && (
									<p className="text-sm text-gray-500 line-through">
										${(Math.random() * 50 + 50).toFixed(2)}
									</p>
								)}
							</div>
							<div className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">
								<span className="text-sm font-medium text-blue-600">View Details →</span>
							</div>
						</div>

						{/* Stock Indicator */}
						{features.stockIndicators && (
							<div className="mt-3">
								{Math.random() > 0.8 ? (
									<span className="text-xs font-medium text-red-600">Only 2 left in stock!</span>
								) : Math.random() > 0.9 ? (
									<span className="text-xs text-gray-500">Out of stock</span>
								) : (
									<span className="text-xs text-green-600">In stock</span>
								)}
							</div>
						)}
					</div>
				</LinkWithChannel>
			</div>
		</li>
	);
}
