import Link from "next/link";
import { User, Package, MapPin, Settings, LogOut } from "lucide-react";
import { CurrentUserOrderListDocument, PaymentChargeStatusEnum } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { formatMoney, formatDate } from "@/lib/utils";

interface AccountDashboardProps {
	channel: string;
}

export async function AccountDashboard({ channel }: AccountDashboardProps) {
	// Fetch real user data from Saleor API
	const { me: user } = await executeGraphQL(CurrentUserOrderListDocument, {
		cache: "no-cache",
	});

	if (!user) {
		return (
			<div className="flex min-h-[400px] items-center justify-center">
				<div className="text-center">
					<h2 className="text-xl font-semibold text-gray-900">Please sign in to view your account</h2>
					<p className="mt-2 text-gray-600">You need to be logged in to access your account dashboard.</p>
				</div>
			</div>
		);
	}

	const userName =
		user.firstName && user.lastName
			? `${user.firstName} ${user.lastName}`
			: user.firstName || user.email.split("@")[0];

	const orders = user.orders?.edges?.map((edge) => edge.node) || [];
	const totalOrders = orders.length;
	const totalSpent = orders.reduce((sum, order) => {
		return sum + (order.total?.gross?.amount || 0);
	}, 0);

	const quickActions = [
		{
			title: "My Orders",
			description: "View and track your orders",
			icon: <Package className="h-6 w-6" />,
			href: "/orders",
			count: totalOrders,
		},
		{
			title: "Addresses",
			description: "Manage shipping and billing addresses",
			icon: <MapPin className="h-6 w-6" />,
			href: "/account/addresses",
			count: 2,
		},
	];

	const accountSettings = [
		{
			title: "Profile Settings",
			description: "Update your personal information",
			icon: <User className="h-5 w-5" />,
			href: "/account/profile",
		},
		{
			title: "Account Settings",
			description: "Manage your account preferences",
			icon: <Settings className="h-5 w-5" />,
			href: "/account/settings",
		},
	];

	return (
		<div className="space-y-8">
			{/* Welcome Header */}
			<div className="rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 p-8 text-white">
				<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
					<div>
						<h1 className="mb-2 text-3xl font-bold">Welcome back, {userName}!</h1>
						<p className="text-amber-100">Luxiorstore Customer</p>
					</div>
					<div className="flex gap-6 text-center lg:text-right">
						<div>
							<div className="text-2xl font-bold">{totalOrders}</div>
							<div className="text-sm text-amber-100">Orders</div>
						</div>
						<div>
							<div className="text-2xl font-bold">
								{totalSpent > 0 ? formatMoney(totalSpent, "KES") : "KSh 0"}
							</div>
							<div className="text-sm text-amber-100">Total Spent</div>
						</div>
					</div>
				</div>
			</div>

			{/* Quick Actions */}
			<div>
				<h2 className="mb-6 text-2xl font-bold text-gray-900">Quick Actions</h2>
				<div className="grid gap-6 sm:grid-cols-2">
					{quickActions.map((action) => (
						<Link
							key={action.title}
							href={action.href}
							className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
						>
							<div className="flex items-start justify-between">
								<div className="flex-1">
									<div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 text-amber-600 group-hover:bg-amber-200">
										{action.icon}
									</div>
									<h3 className="mb-1 font-semibold text-gray-900">{action.title}</h3>
									<p className="text-sm text-gray-600">{action.description}</p>
								</div>
								{action.count && (
									<span className="rounded-full bg-gray-100 px-2 py-1 text-sm font-medium text-gray-600">
										{action.count}
									</span>
								)}
							</div>
						</Link>
					))}
				</div>
			</div>

			{/* Recent Orders */}
			<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
				<div className="mb-6 flex items-center justify-between">
					<h3 className="text-xl font-semibold text-gray-900">Recent Orders</h3>
					<Link href="/account/orders" className="text-sm font-medium text-amber-600 hover:text-amber-700">
						View All Orders
					</Link>
				</div>

				<div className="space-y-4">
					{orders.length > 0 ? (
						orders.slice(0, 3).map((order) => (
							<div
								key={order.id}
								className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
							>
								<div>
									<div className="font-medium text-gray-900">Order #{order.number}</div>
									<div className="text-sm text-gray-600">
										{formatDate(order.created)} • {order.lines?.length || 0} items
									</div>
								</div>
								<div className="text-right">
									<div className="font-medium text-gray-900">
										{order.total?.gross
											? formatMoney(order.total.gross.amount, order.total.gross.currency)
											: "N/A"}
									</div>
									<div
										className={`text-sm ${
											order.paymentStatus === PaymentChargeStatusEnum.FullyCharged
												? "text-green-600"
												: order.paymentStatus === PaymentChargeStatusEnum.Pending
													? "text-blue-600"
													: "text-gray-600"
										}`}
									>
										{order.paymentStatus === PaymentChargeStatusEnum.FullyCharged
											? "Paid"
											: order.paymentStatus === PaymentChargeStatusEnum.Pending
												? "Pending"
												: order.paymentStatus || "Unknown"}
									</div>
								</div>
							</div>
						))
					) : (
						<div className="py-8 text-center text-gray-500">
							<Package className="mx-auto mb-4 h-12 w-12 text-gray-300" />
							<p className="text-lg font-medium">No orders yet</p>
							<p className="text-sm">Start shopping to see your orders here!</p>
							<Link
								href={`/${channel}`}
								className="mt-4 inline-flex items-center rounded-lg bg-amber-600 px-4 py-2 text-white transition-colors hover:bg-amber-700"
							>
								Start Shopping
							</Link>
						</div>
					)}
				</div>
			</div>

			{/* Account Settings */}
			<div>
				<h2 className="mb-6 text-2xl font-bold text-gray-900">Account Settings</h2>
				<div className="grid gap-4 sm:grid-cols-2">
					{accountSettings.map((setting) => (
						<Link
							key={setting.title}
							href={setting.href}
							className="flex items-center space-x-4 rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:bg-gray-50"
						>
							<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
								{setting.icon}
							</div>
							<div>
								<h4 className="font-medium text-gray-900">{setting.title}</h4>
								<p className="text-sm text-gray-600">{setting.description}</p>
							</div>
						</Link>
					))}
				</div>
			</div>

			{/* Newsletter Subscription */}
			<div className="rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 p-6">
				<div className="flex items-center justify-between">
					<div>
						<h3 className="mb-2 text-xl font-semibold text-gray-900">Stay Updated</h3>
						<p className="text-gray-600">Subscribe to our newsletter for exclusive offers and new arrivals</p>
					</div>
					<Link
						href="/newsletter"
						className="rounded-lg bg-purple-600 px-4 py-2 text-white transition-colors hover:bg-purple-700"
					>
						Subscribe
					</Link>
				</div>
			</div>

			{/* Sign Out */}
			<div className="border-t border-gray-200 pt-6">
				<button className="flex items-center space-x-2 text-red-600 hover:text-red-700">
					<LogOut className="h-5 w-5" />
					<span>Sign Out</span>
				</button>
			</div>
		</div>
	);
}
