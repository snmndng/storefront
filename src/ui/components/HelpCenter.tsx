import Link from "next/link";
import {
	ShoppingBag,
	Truck,
	RotateCcw,
	CreditCard,
	Shield,
	Ruler,
	MessageCircle,
	Phone,
	Mail,
	Clock,
} from "lucide-react";

const helpCategories = [
	{
		title: "Orders & Shopping",
		icon: <ShoppingBag className="h-8 w-8" />,
		description: "Learn how to place orders, manage your cart, and track purchases",
		links: [
			{ title: "How to Place an Order", href: "/help/placing-orders" },
			{ title: "Order Status & Tracking", href: "/orders" },
			{ title: "Modifying Your Order", href: "/help/modify-order" },
			{ title: "Order History", href: "/orders" },
		],
	},
	{
		title: "Shipping & Delivery",
		icon: <Truck className="h-8 w-8" />,
		description: "Information about shipping options, delivery times, and costs",
		links: [
			{ title: "Shipping Information", href: "/shipping" },
			{ title: "Delivery Areas", href: "/help/delivery-areas" },
			{ title: "Express Delivery", href: "/help/express-delivery" },
			{ title: "International Shipping", href: "/help/international-shipping" },
		],
	},
	{
		title: "Returns & Exchanges",
		icon: <RotateCcw className="h-8 w-8" />,
		description: "Easy returns and exchanges for your peace of mind",
		links: [
			{ title: "Return Policy", href: "/returns" },
			{ title: "Start a Return", href: "/help/start-return" },
			{ title: "Exchange Process", href: "/help/exchanges" },
			{ title: "Refund Timeline", href: "/help/refunds" },
		],
	},
	{
		title: "Payment & Billing",
		icon: <CreditCard className="h-8 w-8" />,
		description: "Payment methods, billing, and transaction security",
		links: [
			{ title: "Payment Methods", href: "/help/payment-methods" },
			{ title: "M-Pesa Payments", href: "/help/mpesa" },
			{ title: "Payment Security", href: "/help/payment-security" },
			{ title: "Billing Issues", href: "/help/billing" },
		],
	},
	{
		title: "Product Information",
		icon: <Shield className="h-8 w-8" />,
		description: "Product authenticity, warranties, and care instructions",
		links: [
			{ title: "Product Authenticity", href: "/help/authenticity" },
			{ title: "Warranty Information", href: "/warranty" },
			{ title: "Care Instructions", href: "/help/care-instructions" },
			{ title: "Product Reviews", href: "/help/reviews" },
		],
	},
	{
		title: "Size & Fit Guide",
		icon: <Ruler className="h-8 w-8" />,
		description: "Find your perfect fit with our comprehensive size guides",
		links: [
			{ title: "Size Guide", href: "/size-guide" },
			{ title: "Fit Recommendations", href: "/help/fit-guide" },
			{ title: "Size Exchange", href: "/help/size-exchange" },
			{ title: "Measurement Tips", href: "/help/measurements" },
		],
	},
];

const contactOptions = [
	{
		title: "Live Chat",
		icon: <MessageCircle className="h-6 w-6" />,
		description: "Chat with our support team",
		action: "Start Chat",
		available: "24/7",
		color: "bg-green-500",
	},
	{
		title: "WhatsApp",
		icon: <Phone className="h-6 w-6" />,
		description: "+254 797 923 313",
		action: "Message Us",
		available: "9 AM - 9 PM",
		color: "bg-green-600",
		href: "https://wa.me/254797923313",
	},
	{
		title: "Email Support",
		icon: <Mail className="h-6 w-6" />,
		description: "hello@luxiorstore.co.ke",
		action: "Send Email",
		available: "24-48 hrs response",
		color: "bg-blue-500",
		href: "mailto:hello@luxiorstore.co.ke",
	},
	{
		title: "Phone Support",
		icon: <Phone className="h-6 w-6" />,
		description: "+254 797 923 313",
		action: "Call Now",
		available: "9 AM - 6 PM",
		color: "bg-amber-500",
		href: "tel:+254797923313",
	},
];

export function HelpCenter() {
	return (
		<div className="space-y-12">
			{/* Quick Search */}
			<div className="mx-auto max-w-2xl">
				<div className="relative">
					<input
						type="text"
						placeholder="Search for help articles..."
						className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pl-12 text-gray-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
					/>
					<div className="absolute left-4 top-1/2 -translate-y-1/2">
						<svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</div>
				</div>
			</div>

			{/* Help Categories */}
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{helpCategories.map((category, index) => (
					<div
						key={index}
						className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
					>
						<div className="mb-4 flex items-center space-x-3">
							<div className="text-amber-600">{category.icon}</div>
							<h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
						</div>
						<p className="mb-4 text-sm text-gray-600">{category.description}</p>
						<ul className="space-y-2">
							{category.links.map((link, linkIndex) => (
								<li key={linkIndex}>
									<Link
										href={link.href}
										className="text-sm text-amber-600 transition-colors hover:text-amber-700 hover:underline"
									>
										{link.title}
									</Link>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>

			{/* Contact Support */}
			<div className="rounded-lg bg-gray-50 p-8">
				<div className="mb-8 text-center">
					<h2 className="mb-2 text-2xl font-bold text-gray-900">Need Personal Assistance?</h2>
					<p className="text-gray-600">Our customer service team is ready to help you</p>
				</div>

				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{contactOptions.map((option, index) => (
						<div key={index} className="rounded-lg bg-white p-4 shadow-sm">
							<div className="mb-3 flex items-center space-x-3">
								<div className={`rounded-full p-2 text-white ${option.color}`}>{option.icon}</div>
								<div>
									<h4 className="font-medium text-gray-900">{option.title}</h4>
									<p className="text-sm text-gray-600">{option.description}</p>
								</div>
							</div>
							<div className="mb-2 flex items-center space-x-1 text-xs text-gray-500">
								<Clock className="h-3 w-3" />
								<span>{option.available}</span>
							</div>
							{option.href ? (
								<a
									href={option.href}
									target={option.href.startsWith("http") ? "_blank" : undefined}
									rel={option.href.startsWith("http") ? "noopener noreferrer" : undefined}
									className="block w-full rounded bg-gray-900 py-2 text-center text-sm text-white transition-colors hover:bg-gray-800"
								>
									{option.action}
								</a>
							) : (
								<button className="w-full rounded bg-gray-900 py-2 text-sm text-white transition-colors hover:bg-gray-800">
									{option.action}
								</button>
							)}
						</div>
					))}
				</div>
			</div>

			{/* Popular Articles */}
			<div className="rounded-lg border border-gray-200 bg-white p-8">
				<h2 className="mb-6 text-2xl font-bold text-gray-900">Popular Help Articles</h2>
				<div className="grid gap-4 md:grid-cols-2">
					<div className="space-y-3">
						<Link href="/faq" className="block text-amber-600 hover:text-amber-700 hover:underline">
							How do I track my order?
						</Link>
						<Link href="/returns" className="block text-amber-600 hover:text-amber-700 hover:underline">
							What is your return policy?
						</Link>
						<Link href="/size-guide" className="block text-amber-600 hover:text-amber-700 hover:underline">
							How do I find my size?
						</Link>
					</div>
					<div className="space-y-3">
						<Link href="/shipping" className="block text-amber-600 hover:text-amber-700 hover:underline">
							What are your shipping options?
						</Link>
						<Link href="/warranty" className="block text-amber-600 hover:text-amber-700 hover:underline">
							Do you offer product warranties?
						</Link>
						<Link href="/faq" className="block text-amber-600 hover:text-amber-700 hover:underline">
							Are your products authentic?
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
