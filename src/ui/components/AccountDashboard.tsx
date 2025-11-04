import Link from "next/link";
import { User, Package, MapPin, Settings, LogOut } from "lucide-react";

interface AccountDashboardProps {
	channel: string;
}

export function AccountDashboard({}: AccountDashboardProps) {
	// This would fetch real user data from Saleor API using CurrentUserOrderList query
	const user = {
		name: "Sarah Johnson",
		email: "sarah@example.com",
		totalOrders: 12,
		totalSpent: 245000,
	};

	const quickActions = [
		{
			title: "My Orders",
			description: "View and track your orders",
			icon: <Package className="h-6 w-6" />,
			href: "/orders",
			count: user.totalOrders,
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
						<h1 className="mb-2 text-3xl font-bold">Welcome back, {user.name}!</h1>
						<p className="text-amber-100">Luxiorstore Customer</p>
					</div>
					<div className="flex gap-6 text-center lg:text-right">
						<div>
							<div className="text-2xl font-bold">{user.totalOrders}</div>
							<div className="text-sm text-amber-100">Orders</div>
						</div>
						<div>
							<div className="text-2xl font-bold">KSh {user.totalSpent.toLocaleString()}</div>
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
					{/* Mock recent orders */}
					{[
						{
							id: "LUX-2025-001234",
							date: "Nov 1, 2025",
							status: "Delivered",
							total: "KSh 45,000",
							items: 2,
						},
						{
							id: "LUX-2025-001233",
							date: "Oct 28, 2025",
							status: "In Transit",
							total: "KSh 28,500",
							items: 1,
						},
						{
							id: "LUX-2025-001232",
							date: "Oct 25, 2025",
							status: "Delivered",
							total: "KSh 67,200",
							items: 3,
						},
					].map((order) => (
						<div
							key={order.id}
							className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
						>
							<div>
								<div className="font-medium text-gray-900">Order #{order.id}</div>
								<div className="text-sm text-gray-600">
									{order.date} • {order.items} items
								</div>
							</div>
							<div className="text-right">
								<div className="font-medium text-gray-900">{order.total}</div>
								<div
									className={`text-sm ${
										order.status === "Delivered"
											? "text-green-600"
											: order.status === "In Transit"
												? "text-blue-600"
												: "text-gray-600"
									}`}
								>
									{order.status}
								</div>
							</div>
						</div>
					))}
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
