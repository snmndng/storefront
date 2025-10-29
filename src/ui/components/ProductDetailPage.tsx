import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
	Heart,
	Share2,
	Star,
	Truck,
	RotateCcw,
	Shield,
	ChevronLeft,
	ChevronRight,
	Plus,
	Minus,
	Check,
} from "lucide-react";
import { Button, IconButton } from "./Button";
import { brandConfig } from "@/config/branding";

interface ProductDetailPageProps {
	product: {
		id: string;
		name: string;
		description: string;
		images: Array<{ url: string; alt: string }>;
		price: { amount: number; currency: string };
		originalPrice?: { amount: number; currency: string };
		rating: number;
		reviewCount: number;
		inStock: boolean;
		stockCount?: number;
		variants?: Array<{
			id: string;
			name: string;
			value: string;
			available: boolean;
		}>;
		specifications?: Array<{
			name: string;
			value: string;
		}>;
		features?: string[];
	};
}

export function ProductDetailPage({ product }: ProductDetailPageProps) {
	const [selectedImageIndex, setSelectedImageIndex] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
	const [isWishlisted, setIsWishlisted] = useState(false);

	const { features } = brandConfig;
	const isOnSale = product.originalPrice && product.originalPrice.amount > product.price.amount;
	const discountPercentage = isOnSale
		? Math.round(
				((product.originalPrice!.amount - product.price.amount) / product.originalPrice!.amount) * 100,
			)
		: 0;

	const nextImage = () => {
		setSelectedImageIndex((prev) => (prev + 1) % product.images.length);
	};

	const prevImage = () => {
		setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
	};

	return (
		<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
			{/* Breadcrumb */}
			<nav className="mb-8 flex items-center space-x-2 text-sm text-gray-500">
				<Link href="/" className="transition-colors hover:text-amber-600">
					Home
				</Link>
				<span>/</span>
				<Link href="/products" className="transition-colors hover:text-amber-600">
					Products
				</Link>
				<span>/</span>
				<span className="text-gray-900">{product.name}</span>
			</nav>

			<div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
				{/* Product Images */}
				<div className="space-y-4">
					{/* Main Image */}
					<div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
						<Image
							src={product.images[selectedImageIndex]?.url || "/placeholder.jpg"}
							alt={product.images[selectedImageIndex]?.alt || product.name}
							fill
							className="object-cover"
							priority
						/>

						{/* Sale Badge */}
						{isOnSale && (
							<div className="absolute left-4 top-4 z-10">
								<span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold text-white">
									-{discountPercentage}%
								</span>
							</div>
						)}

						{/* Navigation Arrows */}
						{product.images.length > 1 && (
							<>
								<button
									onClick={prevImage}
									className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-sm transition-colors hover:bg-white"
								>
									<ChevronLeft className="h-5 w-5" />
								</button>
								<button
									onClick={nextImage}
									className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-sm transition-colors hover:bg-white"
								>
									<ChevronRight className="h-5 w-5" />
								</button>
							</>
						)}
					</div>

					{/* Thumbnail Images */}
					{product.images.length > 1 && (
						<div className="flex space-x-2 overflow-x-auto">
							{product.images.map((image, index) => (
								<button
									key={index}
									onClick={() => setSelectedImageIndex(index)}
									className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
										index === selectedImageIndex
											? "border-amber-500"
											: "border-gray-200 hover:border-gray-300"
									}`}
								>
									<Image
										src={image.url}
										alt={image.alt}
										width={80}
										height={80}
										className="h-full w-full object-cover"
									/>
								</button>
							))}
						</div>
					)}
				</div>

				{/* Product Information */}
				<div className="space-y-6">
					{/* Title and Rating */}
					<div>
						<h1 className="mb-4 text-3xl font-bold text-gray-900">{product.name}</h1>

						{features.productRatings && (
							<div className="mb-4 flex items-center space-x-2">
								<div className="flex items-center">
									{Array.from({ length: 5 }, (_, i) => (
										<Star
											key={i}
											className={`h-5 w-5 ${
												i < Math.floor(product.rating) ? "fill-current text-yellow-400" : "text-gray-300"
											}`}
										/>
									))}
								</div>
								<span className="text-sm text-gray-600">
									{product.rating} ({product.reviewCount} reviews)
								</span>
							</div>
						)}
					</div>

					{/* Price */}
					<div className="flex items-center space-x-4">
						<span className="text-3xl font-bold text-gray-900">${product.price.amount.toFixed(2)}</span>
						{isOnSale && (
							<span className="text-xl text-gray-500 line-through">
								${product.originalPrice!.amount.toFixed(2)}
							</span>
						)}
					</div>

					{/* Stock Status */}
					<div className="flex items-center space-x-2">
						{product.inStock ? (
							<>
								<div className="h-2 w-2 rounded-full bg-green-500"></div>
								<span className="text-sm font-medium text-green-600">
									In Stock
									{product.stockCount && product.stockCount < 10 && (
										<span className="ml-1 text-orange-600">(Only {product.stockCount} left!)</span>
									)}
								</span>
							</>
						) : (
							<>
								<div className="h-2 w-2 rounded-full bg-red-500"></div>
								<span className="text-sm font-medium text-red-600">Out of Stock</span>
							</>
						)}
					</div>

					{/* Description */}
					<div className="prose prose-sm max-w-none">
						<p className="leading-relaxed text-gray-600">{product.description}</p>
					</div>

					{/* Variants */}
					{product.variants && product.variants.length > 0 && (
						<div>
							<h3 className="mb-3 text-lg font-semibold">Options</h3>
							<div className="flex flex-wrap gap-2">
								{product.variants.map((variant) => (
									<button
										key={variant.id}
										onClick={() => setSelectedVariant(variant.id)}
										disabled={!variant.available}
										className={`rounded-lg border px-4 py-2 transition-colors ${
											selectedVariant === variant.id
												? "border-amber-500 bg-amber-50 text-amber-700"
												: variant.available
													? "border-gray-300 hover:border-gray-400"
													: "cursor-not-allowed border-gray-200 bg-gray-50 text-gray-400"
										}`}
									>
										{variant.value}
									</button>
								))}
							</div>
						</div>
					)}

					{/* Quantity Selector */}
					<div>
						<h3 className="mb-3 text-lg font-semibold">Quantity</h3>
						<div className="flex items-center space-x-3">
							<div className="flex items-center rounded-lg border border-gray-300">
								<button
									onClick={() => setQuantity(Math.max(1, quantity - 1))}
									className="p-2 transition-colors hover:bg-gray-50"
								>
									<Minus className="h-4 w-4" />
								</button>
								<span className="px-4 py-2 font-medium">{quantity}</span>
								<button
									onClick={() => setQuantity(quantity + 1)}
									className="p-2 transition-colors hover:bg-gray-50"
								>
									<Plus className="h-4 w-4" />
								</button>
							</div>
						</div>
					</div>

					{/* Action Buttons */}
					<div className="space-y-4">
						<div className="flex space-x-4">
							<Button variant="primary" size="lg" fullWidth disabled={!product.inStock} className="flex-1">
								Add to Cart
							</Button>
							<IconButton
								icon={<Heart className={`h-5 w-5 ${isWishlisted ? "fill-current text-red-500" : ""}`} />}
								variant="outline"
								size="lg"
								aria-label="Add to wishlist"
								onClick={() => setIsWishlisted(!isWishlisted)}
							/>
							<IconButton
								icon={<Share2 className="h-5 w-5" />}
								variant="outline"
								size="lg"
								aria-label="Share product"
							/>
						</div>

						<Button variant="outline" size="lg" fullWidth>
							Buy Now
						</Button>
					</div>

					{/* Trust Badges */}
					<div className="grid grid-cols-1 gap-4 border-t pt-6 sm:grid-cols-3">
						<div className="flex items-center space-x-3">
							<Truck className="h-5 w-5 text-amber-600" />
							<div>
								<p className="text-sm font-medium">Free Shipping</p>
								<p className="text-xs text-gray-500">On orders over $100</p>
							</div>
						</div>
						<div className="flex items-center space-x-3">
							<RotateCcw className="h-5 w-5 text-amber-600" />
							<div>
								<p className="text-sm font-medium">30-Day Returns</p>
								<p className="text-xs text-gray-500">Easy returns policy</p>
							</div>
						</div>
						<div className="flex items-center space-x-3">
							<Shield className="h-5 w-5 text-amber-600" />
							<div>
								<p className="text-sm font-medium">Warranty</p>
								<p className="text-xs text-gray-500">1-year coverage</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Product Details Tabs */}
			<div className="mt-16">
				<div className="border-b border-gray-200">
					<nav className="-mb-px flex space-x-8">
						<button className="border-b-2 border-amber-500 px-1 py-4 text-sm font-medium text-amber-600">
							Specifications
						</button>
						<button className="border-b-2 border-transparent px-1 py-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
							Reviews
						</button>
						<button className="border-b-2 border-transparent px-1 py-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
							Shipping & Returns
						</button>
					</nav>
				</div>

				<div className="py-8">
					{/* Specifications */}
					{product.specifications && (
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
							{product.specifications.map((spec, index) => (
								<div key={index} className="flex justify-between border-b border-gray-100 py-2">
									<span className="font-medium text-gray-900">{spec.name}</span>
									<span className="text-gray-600">{spec.value}</span>
								</div>
							))}
						</div>
					)}

					{/* Features */}
					{product.features && (
						<div className="mt-8">
							<h3 className="mb-4 text-lg font-semibold">Key Features</h3>
							<ul className="space-y-2">
								{product.features.map((feature, index) => (
									<li key={index} className="flex items-center space-x-2">
										<Check className="h-4 w-4 text-green-500" />
										<span className="text-gray-700">{feature}</span>
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
