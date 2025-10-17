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
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Your Brand</h1>
					<p className="text-gray-600 mb-8">No featured products found. Please check your Saleor backend configuration.</p>
					<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto">
						<p className="text-sm text-yellow-800">
							Make sure your <code className="bg-yellow-100 px-1 rounded">.env</code> file contains the correct 
							<code className="bg-yellow-100 px-1 rounded ml-1">NEXT_PUBLIC_SALEOR_API_URL</code>
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
							<span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
								Quality Products
							</span>
						</h1>
						<p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
							Explore our carefully curated collection of premium products, designed for those who appreciate quality and style.
						</p>
					</div>
				</div>
			</section>

			{/* Featured Products */}
			<section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
						Featured Products
					</h2>
					<p className="mt-4 text-lg text-gray-600">
						Handpicked items that represent the best of what we offer
					</p>
				</div>
				<ProductList products={products} />
			</section>
		</>
	);
}
