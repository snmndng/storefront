import { type Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Package, ArrowRight } from "lucide-react";
import { CurrentUserOrderListDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { OrderListItem } from "@/ui/components/OrderListItem";

export const metadata: Metadata = {
	title: "Order History · Your Store",
	description: "View your past orders",
};

export default async function OrdersPage(props: {
	params: Promise<{ channel: string }>;
}) {
	const params = await props.params;
	const { me: user } = await executeGraphQL(CurrentUserOrderListDocument, {
		cache: "no-cache",
	});

	if (!user) {
		redirect(`/${params.channel}/login?redirectTo=/${params.channel}/orders`);
	}

	const orders = user.orders?.edges || [];

	return (
		<div className="mx-auto max-w-7xl px-4 py-8">
			<div className="mb-8 flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold text-neutral-900">Order History</h1>
					<p className="mt-1 text-neutral-600">
						{orders.length === 0
							? "You haven't placed any orders yet"
							: `${orders.length} order${orders.length === 1 ? "" : "s"} found`}
					</p>
				</div>
				<Link
					href={`/${params.channel}/profile`}
					className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
				>
					Back to Profile
				</Link>
			</div>

			{orders.length === 0 ? (
				<div className="rounded-lg border border-neutral-200 bg-white p-12 text-center">
					<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
						<Package className="h-8 w-8 text-neutral-400" />
					</div>
					<h2 className="text-lg font-semibold text-neutral-900">No orders yet</h2>
					<p className="mt-2 text-neutral-600">
						When you place an order, it will appear here.
					</p>
					<Link
						href={`/${params.channel}/products`}
						className="mt-6 inline-flex items-center gap-2 rounded-md bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
					>
						Start Shopping
						<ArrowRight className="h-4 w-4" />
					</Link>
				</div>
			) : (
				<ul className="space-y-4">
					{orders.map(({ node: order }) => (
						<OrderListItem order={order} key={order.id} />
					))}
				</ul>
			)}
		</div>
	);
}
