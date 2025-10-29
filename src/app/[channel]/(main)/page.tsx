import Link from "next/link";
import { ProductListByCollectionDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { ProductList } from "@/ui/components/ProductList";

export const metadata = {
	title: "Luxiorstore - Luxury Redefined",
	description:
		"Discover premium luxury products with exceptional quality and unmatched service at Luxiorstore.",
};

export default async function Page(props: { params: Promise<{ channel: string }> }) {
	const params = await props.params;
	const data = await executeGraphQL(ProductListByCollectionDocument, {
		variables: {
			slug: "featured-products",
			channel: params.channel,
		},
		revalidate: 60,
	});

	if (!data.collection?.products) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="mx-auto max-w-md px-4 text-center">
					<div className="mb-8">
						<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-500">
							<span className="text-2xl font-bold text-white">L</span>
						</div>
						<h1 className="mb-2 text-3xl font-bold text-gray-900">Welcome to Luxiorstore</h1>
						<p className="text-lg font-medium text-amber-600">Luxury Redefined</p>
					</div>

					<div className="space-y-4">
						<p className="text-gray-600">
							We&apos;re currently updating our collection with new luxury products.
						</p>
						<p className="text-sm text-gray-500">Please check back soon for our latest arrivals.</p>
					</div>

					{/* Only show technical details in development */}
					{process.env.NODE_ENV === "development" && (
						<div className="mt-8 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
							<p className="text-sm text-yellow-800">
								<strong>Development Note:</strong> No featured products found. Check your Saleor backend
								configuration and ensure your <code className="rounded bg-yellow-100 px-1">.env</code> file
								contains the correct{" "}
								<code className="rounded bg-yellow-100 px-1">NEXT_PUBLIC_SALEOR_API_URL</code>
							</p>
						</div>
					)}
				</div>
			</div>
		);
	}

	const products = data.collection?.products.edges.map(({ node: product }) => product);

	return (
		<>
			{/* Hero Section */}
			<section className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-20 sm:py-32">
				{/* Background Pattern */}
				<div
					className="absolute inset-0 opacity-40"
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f59e0b' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
					}}
				></div>

				<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<div className="mb-8">
							<div className="inline-flex items-center space-x-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-2 text-sm font-medium text-amber-800">
								<span className="h-2 w-2 rounded-full bg-amber-500"></span>
								<span>New Collection Available</span>
							</div>
						</div>

						<h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
							<span className="block">Luxury</span>
							<span className="block bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
								Redefined
							</span>
						</h1>

						<p className="mx-auto mt-8 max-w-3xl text-xl leading-8 text-gray-600">
							Discover premium luxury products with exceptional quality and unmatched service. Every piece in
							our collection is carefully curated for the discerning individual.
						</p>

						<div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
							<a
								href="#featured-products"
								className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:from-amber-700 hover:to-orange-700 hover:shadow-xl"
							>
								Explore Collection
							</a>
							{process.env.NODE_ENV === "development" && (
								<Link
									href="/demo"
									className="inline-flex items-center justify-center rounded-xl border-2 border-amber-600 px-8 py-4 text-lg font-semibold text-amber-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-600 hover:text-white"
								>
									View Features
								</Link>
							)}
						</div>

						{/* Trust Indicators */}
						<div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
							<div className="flex flex-col items-center">
								<div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white">
									<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
									</svg>
								</div>
								<h3 className="mt-4 text-lg font-semibold text-gray-900">Premium Quality</h3>
								<p className="mt-2 text-sm text-gray-600">Handpicked luxury items</p>
							</div>
							<div className="flex flex-col items-center">
								<div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white">
									<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</div>
								<h3 className="mt-4 text-lg font-semibold text-gray-900">Fast Delivery</h3>
								<p className="mt-2 text-sm text-gray-600">Free shipping over $100</p>
							</div>
							<div className="flex flex-col items-center">
								<div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white">
									<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
										/>
									</svg>
								</div>
								<h3 className="mt-4 text-lg font-semibold text-gray-900">Secure Shopping</h3>
								<p className="mt-2 text-sm text-gray-600">SSL encrypted checkout</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Featured Products */}
			<section id="featured-products" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
				<div className="mb-12 text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Featured Products</h2>
					<p className="mt-4 text-lg text-gray-600">
						Handpicked items that represent the best of what we offer
					</p>
				</div>
				<ProductList products={products} />
			</section>
		</>
	);
}
