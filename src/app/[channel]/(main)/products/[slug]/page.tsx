import edjsHTML from "editorjs-html";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import { type ResolvingMetadata, type Metadata } from "next";
import xss from "xss";
import { invariant } from "ts-invariant";
import { type WithContext, type Product } from "schema-dts";
import { Suspense } from "react";
import { ArrowLeft, Share2, Heart, Shield, Truck, RotateCcw } from "lucide-react";
import Link from "next/link";
import { AddButton } from "./AddButton";
import { VariantSelector } from "@/ui/components/VariantSelector";
import { ProductImageWrapper } from "@/ui/atoms/ProductImageWrapper";
import { ProductBreadcrumb } from "@/ui/components/ProductBreadcrumb";
import { executeGraphQL } from "@/lib/graphql";
import { formatMoney, formatMoneyRange } from "@/lib/utils";
import { CheckoutAddLineDocument, ProductDetailsDocument, ProductListDocument } from "@/gql/graphql";
import * as Checkout from "@/lib/checkout";
import { AvailabilityMessage } from "@/ui/components/AvailabilityMessage";

export async function generateMetadata(
	props: {
		params: Promise<{ slug: string; channel: string }>;
		searchParams: Promise<{ variant?: string }>;
	},
	_parent: ResolvingMetadata,
): Promise<Metadata> {
	const [searchParams, params] = await Promise.all([props.searchParams, props.params]);

	const { product } = await executeGraphQL(ProductDetailsDocument, {
		variables: {
			slug: decodeURIComponent(params.slug),
			channel: params.channel,
		},
		revalidate: 60,
	});

	if (!product) {
		notFound();
	}

	const productName = product.seoTitle || product.name;
	const variantName = product.variants?.find(({ id }) => id === searchParams.variant)?.name;
	const productNameAndVariant = variantName ? `${productName} - ${variantName}` : productName;

	const parentMetadata = await _parent;

	return {
		title: `${product.name} | ${product.seoTitle || parentMetadata.title?.absolute || "Luxiorstore"}`,
		description: product.seoDescription || productNameAndVariant,
		alternates: {
			canonical: process.env.NEXT_PUBLIC_STOREFRONT_URL
				? process.env.NEXT_PUBLIC_STOREFRONT_URL + `/products/${encodeURIComponent(params.slug)}`
				: undefined,
		},
		openGraph: product.thumbnail
			? {
					images: [
						{
							url: product.thumbnail.url,
							alt: product.name,
						},
					],
				}
			: null,
	};
}

export async function generateStaticParams({ params }: { params: { channel: string } }) {
	try {
		const { products } = await executeGraphQL(ProductListDocument, {
			revalidate: 60,
			variables: { first: 20, channel: params.channel },
			withAuth: false,
		});

		const paths = products?.edges.map(({ node: { slug } }) => ({ slug })) || [];
		return paths;
	} catch (error) {
		console.warn("Failed to generate static params for products:", error);
		// Return empty array to allow build to continue without static generation
		return [];
	}
}

const parser = edjsHTML();

export default async function Page(props: {
	params: Promise<{ slug: string; channel: string }>;
	searchParams: Promise<{ variant?: string }>;
}) {
	const [searchParams, params] = await Promise.all([props.searchParams, props.params]);

	let product;
	try {
		const result = await executeGraphQL(ProductDetailsDocument, {
			variables: {
				slug: decodeURIComponent(params.slug),
				channel: params.channel,
			},
			revalidate: 60,
		});
		product = result.product;
	} catch (error) {
		console.error("Error fetching product:", error);
		notFound();
	}

	if (!product) {
		notFound();
	}

	const firstImage = product.thumbnail;
	const description = product?.description ? parser.parse(JSON.parse(product?.description)) : null;

	const variants = product.variants;
	const selectedVariantID = searchParams.variant;
	const selectedVariant = variants?.find(({ id }) => id === selectedVariantID);

	async function addItem() {
		"use server";

		const checkout = await Checkout.findOrCreate({
			checkoutId: await Checkout.getIdFromCookies(params.channel),
			channel: params.channel,
		});
		invariant(checkout, "This should never happen");

		await Checkout.saveIdToCookie(params.channel, checkout.id);

		if (!selectedVariantID) {
			return;
		}

		// TODO: error handling
		await executeGraphQL(CheckoutAddLineDocument, {
			variables: {
				id: checkout.id,
				productVariantId: decodeURIComponent(selectedVariantID),
			},
			cache: "no-cache",
		});

		revalidatePath("/cart");
	}

	const isAvailable = variants?.some((variant) => variant.quantityAvailable) ?? false;

	const price = selectedVariant?.pricing?.price?.gross
		? formatMoney(selectedVariant.pricing.price.gross.amount, selectedVariant.pricing.price.gross.currency)
		: isAvailable
			? formatMoneyRange({
					start: product?.pricing?.priceRange?.start?.gross,
					stop: product?.pricing?.priceRange?.stop?.gross,
				})
			: "";

	const productJsonLd: WithContext<Product> = {
		"@context": "https://schema.org",
		"@type": "Product",
		image: product.thumbnail?.url,
		...(selectedVariant
			? {
					name: `${product.name} - ${selectedVariant.name}`,
					description: product.seoDescription || `${product.name} - ${selectedVariant.name}`,
					offers: {
						"@type": "Offer",
						availability: selectedVariant.quantityAvailable
							? "https://schema.org/InStock"
							: "https://schema.org/OutOfStock",
						priceCurrency: selectedVariant.pricing?.price?.gross.currency,
						price: selectedVariant.pricing?.price?.gross.amount,
					},
				}
			: {
					name: product.name,

					description: product.seoDescription || product.name,
					offers: {
						"@type": "AggregateOffer",
						availability: product.variants?.some((variant) => variant.quantityAvailable)
							? "https://schema.org/InStock"
							: "https://schema.org/OutOfStock",
						priceCurrency: product.pricing?.priceRange?.start?.gross.currency,
						lowPrice: product.pricing?.priceRange?.start?.gross.amount,
						highPrice: product.pricing?.priceRange?.stop?.gross.amount,
					},
				}),
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(productJsonLd),
				}}
			/>

			{/* Navigation Header */}
			<div className="border-b border-gray-200 bg-white">
				<div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between">
						<Link
							href={`/${params.channel}/products`}
							className="flex items-center text-gray-600 transition-colors hover:text-amber-600"
						>
							<ArrowLeft className="mr-2 h-5 w-5" />
							Back to Products
						</Link>

						<div className="flex items-center space-x-4">
							<button className="p-2 text-gray-400 transition-colors hover:text-red-500">
								<Heart className="h-5 w-5" />
							</button>
							<button className="p-2 text-gray-400 transition-colors hover:text-gray-600">
								<Share2 className="h-5 w-5" />
							</button>
						</div>
					</div>

					<ProductBreadcrumb
						category={product.category}
						productName={product.name}
						channel={params.channel}
					/>
				</div>
			</div>

			{/* Main Product Section */}
			<section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
				<Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-gray-200"></div>}>
					<form className="grid gap-8 lg:grid-cols-2" action={addItem}>
						{/* Product Image */}
						<div className="lg:col-span-1">
							<div className="overflow-hidden rounded-lg bg-white shadow-sm">
								{firstImage ? (
									<ProductImageWrapper
										priority={true}
										alt={firstImage.alt ?? product.name}
										width={1024}
										height={1024}
										src={firstImage.url}
										className="h-auto w-full"
									/>
								) : (
									<div className="flex aspect-square items-center justify-center bg-gray-200">
										<span className="text-gray-400">No image available</span>
									</div>
								)}
							</div>
						</div>

						{/* Product Details */}
						<div className="lg:col-span-1">
							<div className="rounded-lg bg-white p-8 shadow-sm">
								<div className="space-y-6">
									<div>
										<h1 className="mb-2 text-3xl font-bold text-gray-900">{product.name}</h1>
										{product.category && (
											<p className="mb-4 text-sm text-gray-500">Category: {product.category.name}</p>
										)}
										<div
											className="mb-6 text-2xl font-bold text-amber-600"
											data-testid="ProductElement_Price"
										>
											{price}
										</div>
									</div>

									{variants && variants.length > 0 && (
										<div>
											<h3 className="mb-3 text-lg font-semibold text-gray-900">Select Variant</h3>
											<VariantSelector
												selectedVariant={selectedVariant}
												variants={variants}
												product={product}
												channel={params.channel}
											/>
										</div>
									)}

									<AvailabilityMessage isAvailable={isAvailable} />

									<div className="space-y-4">
										<AddButton disabled={!selectedVariantID || !selectedVariant?.quantityAvailable} />

										{/* Trust Badges */}
										<div className="grid grid-cols-3 gap-4 border-t border-gray-200 pt-6">
											<div className="text-center">
												<Shield className="mx-auto mb-2 h-6 w-6 text-green-600" />
												<p className="text-xs text-gray-600">Quality Guaranteed</p>
											</div>
											<div className="text-center">
												<Truck className="mx-auto mb-2 h-6 w-6 text-blue-600" />
												<p className="text-xs text-gray-600">Fast Delivery</p>
											</div>
											<div className="text-center">
												<RotateCcw className="mx-auto mb-2 h-6 w-6 text-purple-600" />
												<p className="text-xs text-gray-600">Easy Returns</p>
											</div>
										</div>
									</div>

									{description && (
										<div className="border-t border-gray-200 pt-6">
											<h3 className="mb-3 text-lg font-semibold text-gray-900">Description</h3>
											<div className="prose prose-sm max-w-none text-gray-600">
												{description.map((content, index) => (
													<div key={index} dangerouslySetInnerHTML={{ __html: xss(content) }} />
												))}
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</form>
				</Suspense>
			</section>

			{/* Additional Product Information */}
			<section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
				<div className="grid gap-8 lg:grid-cols-3">
					{/* Delivery Information */}
					<div className="rounded-lg bg-white p-6 shadow-sm">
						<h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
							<Truck className="mr-2 h-5 w-5 text-amber-600" />
							Lightning-Fast Delivery
						</h3>
						<ul className="space-y-2 text-sm text-gray-600">
							<li>• 1-3 hours delivery in Nairobi</li>
							<li>• Same-day delivery nationwide</li>
							<li>• Inspect before payment</li>
							<li>• Free delivery over KSh 5,000</li>
						</ul>
					</div>

					{/* Quality Assurance */}
					<div className="rounded-lg bg-white p-6 shadow-sm">
						<h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
							<Shield className="mr-2 h-5 w-5 text-green-600" />
							Quality Promise
						</h3>
						<ul className="space-y-2 text-sm text-gray-600">
							<li>• 100% authentic products</li>
							<li>• Quality inspection guarantee</li>
							<li>• Secure packaging</li>
							<li>• Full insurance coverage</li>
						</ul>
					</div>

					{/* Return Policy */}
					<div className="rounded-lg bg-white p-6 shadow-sm">
						<h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
							<RotateCcw className="mr-2 h-5 w-5 text-purple-600" />
							Easy Returns
						</h3>
						<ul className="space-y-2 text-sm text-gray-600">
							<li>• 30-day return policy</li>
							<li>• Free return shipping</li>
							<li>• No questions asked</li>
							<li>• Full refund guarantee</li>
						</ul>
					</div>
				</div>
			</section>
		</div>
	);
}
