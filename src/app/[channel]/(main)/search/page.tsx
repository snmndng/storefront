import { notFound, redirect } from "next/navigation";
import { OrderDirection, ProductOrderField, SearchProductsDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { Pagination } from "@/ui/components/Pagination";
import { ProductList } from "@/ui/components/ProductList";
import { ProductsPerPage } from "@/app/config";

export const metadata = {
	title: "Search Products - Luxiorstore",
	description: "Search luxury products at Luxiorstore",
};

export default async function Page(props: {
	searchParams: Promise<Record<"query" | "cursor", string | string[] | undefined>>;
	params: Promise<{ channel: string }>;
}) {
	const [searchParams, params] = await Promise.all([props.searchParams, props.params]);
	const cursor = typeof searchParams.cursor === "string" ? searchParams.cursor : null;
	const searchValue = searchParams.query;

	if (!searchValue) {
		notFound();
	}

	if (Array.isArray(searchValue)) {
		const firstValidSearchValue = searchValue.find((v) => v.length > 0);
		if (!firstValidSearchValue) {
			notFound();
		}
		redirect(`/search?${new URLSearchParams({ query: firstValidSearchValue }).toString()}`);
	}

	const { products } = await executeGraphQL(SearchProductsDocument, {
		variables: {
			first: ProductsPerPage,
			search: searchValue,
			after: cursor,
			sortBy: ProductOrderField.Rating,
			sortDirection: OrderDirection.Asc,
			channel: params.channel,
		},
		revalidate: 60,
	});

	if (!products) {
		notFound();
	}

	const newSearchParams = new URLSearchParams({
		query: searchValue,
		...(products.pageInfo.endCursor && { cursor: products.pageInfo.endCursor }),
	});

	return (
		<div className="min-h-screen bg-gray-50">
			<section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
				{products.totalCount && products.totalCount > 0 ? (
					<div>
						<div className="mb-8">
							<h1 className="mb-2 text-2xl font-bold text-gray-900">Search Results</h1>
							<p className="text-gray-600">
								Found {products.totalCount} result{products.totalCount !== 1 ? "s" : ""} for &quot;
								<span className="font-medium text-gray-900">{searchValue}</span>&quot;
							</p>
						</div>
						<ProductList products={products.edges.map((e) => e.node)} />
						<div className="mt-12">
							<Pagination
								pageInfo={{
									...products.pageInfo,
									basePathname: `/search`,
									urlSearchParams: newSearchParams,
								}}
							/>
						</div>
					</div>
				) : (
					<div className="py-16 text-center">
						<div className="mx-auto max-w-md">
							<div className="mb-6">
								<div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
									<svg
										className="h-12 w-12 text-gray-400"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={1.5}
											d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
										/>
									</svg>
								</div>
							</div>
							<h1 className="mb-2 text-2xl font-bold text-gray-900">No Results Found</h1>
							<p className="mb-6 text-gray-600">
								We couldn&apos;t find any products matching &quot;
								<span className="font-medium">{searchValue}</span>&quot;
							</p>
							<div className="space-y-4">
								<div className="text-sm text-gray-500">
									<p className="mb-2">Try:</p>
									<ul className="space-y-1">
										<li>• Checking your spelling</li>
										<li>• Using different keywords</li>
										<li>• Searching for more general terms</li>
									</ul>
								</div>
								<a
									href={`/${params.channel}/products`}
									className="inline-flex items-center rounded-md border border-transparent bg-amber-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-700"
								>
									Browse All Products
								</a>
							</div>
						</div>
					</div>
				)}
			</section>
		</div>
	);
}
