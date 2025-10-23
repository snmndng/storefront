import Link from "next/link";
import { ProductListByCollectionDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { ProductList } from "@/ui/components/ProductList";

export const metadata = {
	title: "Your Brand - Featured Products",
	description:
		"Explore our curated collection of premium products, carefully selected for quality and style.",
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
				<div className="text-center">
					<h1 className="mb-4 text-2xl font-bold text-gray-900">Welcome to Your Brand</h1>
					<p className="mb-8 text-gray-600">
						No featured products found. Please check your Saleor backend configuration.
					</p>
					<div className="mx-auto max-w-md rounded-lg border border-yellow-200 bg-yellow-50 p-4">
						<p className="text-sm text-yellow-800">
							Make sure your <code className="rounded bg-yellow-100 px-1">.env</code> file contains the
							correct
							<code className="ml-1 rounded bg-yellow-100 px-1">NEXT_PUBLIC_SALEOR_API_URL</code>
						</p>
					</div>
				</div>
			</div>
		);
	}

	const products = data.collection?.products.edges.map(({ node: product }) => product);

	return (
		<>
			{/* Hero Section */}
			<section className="relative bg-gradient-to-br from-gray-50 to-white py-16 sm:py-24">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
							Discover Premium
							<span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
								Quality Products
							</span>
						</h1>
						<p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
							Explore our carefully curated collection of premium products, designed for those who appreciate
							quality and style.
						</p>
						<div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
							<a href="#featured-products" className="btn-primary inline-flex items-center justify-center">
								Shop Now
							</a>
							<Link href="/demo" className="btn-secondary inline-flex items-center justify-center">
								View Customization Demo
							</Link>
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
