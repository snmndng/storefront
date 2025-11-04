import {
	Facebook,
	Instagram,
	Twitter,
	Youtube,
	Linkedin,
	Mail,
	Phone,
	MapPin,
	CreditCard,
	Shield,
	Truck,
	RotateCcw,
} from "lucide-react";
import { LinkWithChannel } from "../atoms/LinkWithChannel";
import { ChannelSelect } from "./ChannelSelect";
import { ChannelsListDocument, MenuGetBySlugDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { brandConfig } from "@/config/branding";

export async function Footer({ channel }: { channel: string }) {
	const footerLinks = await executeGraphQL(MenuGetBySlugDocument, {
		variables: { slug: "footer", channel },
		revalidate: 60 * 60 * 24,
	});
	const channels = process.env.SALEOR_APP_TOKEN
		? await executeGraphQL(ChannelsListDocument, {
				withAuth: false, // disable cookie-based auth for this call
				headers: {
					// and use app token instead
					Authorization: `Bearer ${process.env.SALEOR_APP_TOKEN}`,
				},
			})
		: null;

	const { company, social } = brandConfig;
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-gray-900 text-white">
			{/* Newsletter Section */}
			<div className="bg-gradient-to-r from-amber-600 to-orange-600">
				<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
					<div className="flex flex-col items-center justify-between md:flex-row">
						<div className="mb-4 md:mb-0">
							<h3 className="mb-2 text-xl font-bold text-white">Stay in the Loop</h3>
							<p className="text-amber-100">Get exclusive offers and updates delivered to your inbox</p>
						</div>
						<div className="flex w-full md:w-auto">
							<input
								type="email"
								placeholder="Enter your email"
								className="flex-1 rounded-l-lg border-0 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white md:w-80"
							/>
							<button className="rounded-r-lg bg-gray-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-800">
								Subscribe
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Main Footer Content */}
			<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
					{/* Company Info */}
					<div className="lg:col-span-1">
						<div className="mb-6 flex items-center space-x-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-500">
								<span className="text-lg font-bold text-white">L</span>
							</div>
							<div>
								<h3 className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-xl font-bold text-transparent">
									{company.name}
								</h3>
								<p className="text-xs text-gray-400">{company.tagline}</p>
							</div>
						</div>
						<p className="mb-6 leading-relaxed text-gray-300">{company.description}</p>

						{/* Contact Info */}
						<div className="space-y-3">
							<div className="flex items-center space-x-3">
								<Mail className="h-4 w-4 text-amber-400" />
								<a
									href={`mailto:${company.email}`}
									className="text-sm text-gray-300 transition-colors hover:text-white"
								>
									{company.email}
								</a>
							</div>
							<div className="flex items-center space-x-3">
								<Phone className="h-4 w-4 text-amber-400" />
								<a
									href={`tel:${company.phone}`}
									className="text-sm text-gray-300 transition-colors hover:text-white"
								>
									{company.phone}
								</a>
							</div>
							{company.whatsapp && (
								<div className="flex items-center space-x-3">
									<svg className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
										<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.097" />
									</svg>
									<a
										href={`https://wa.me/${company.whatsapp.replace(/\s+/g, "")}`}
										target="_blank"
										rel="noopener noreferrer"
										className="text-sm text-gray-300 transition-colors hover:text-white"
									>
										WhatsApp: {company.whatsapp}
									</a>
								</div>
							)}
							<div className="flex items-start space-x-3">
								<MapPin className="mt-0.5 h-4 w-4 text-amber-400" />
								<div className="text-sm text-gray-300">
									<p>{company.address.street}</p>
									<p>
										{company.address.city}, {company.address.county} {company.address.postalCode}
									</p>
									<p>{company.address.country}</p>
								</div>
							</div>
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="mb-6 text-lg font-semibold text-white">Quick Links</h3>
						<ul className="space-y-3">
							<li>
								<LinkWithChannel
									href="/about"
									className="group flex items-center text-sm text-gray-300 transition-colors hover:text-amber-400"
								>
									<span className="transition-transform group-hover:translate-x-1">About Us</span>
								</LinkWithChannel>
							</li>
							<li>
								<LinkWithChannel
									href="/contact"
									className="group flex items-center text-sm text-gray-300 transition-colors hover:text-amber-400"
								>
									<span className="transition-transform group-hover:translate-x-1">Contact</span>
								</LinkWithChannel>
							</li>
							<li>
								<LinkWithChannel
									href="/shipping"
									className="group flex items-center text-sm text-gray-300 transition-colors hover:text-amber-400"
								>
									<Truck className="mr-2 h-3 w-3" />
									<span className="transition-transform group-hover:translate-x-1">Shipping Info</span>
								</LinkWithChannel>
							</li>
							<li>
								<LinkWithChannel
									href="/returns"
									className="group flex items-center text-sm text-gray-300 transition-colors hover:text-amber-400"
								>
									<RotateCcw className="mr-2 h-3 w-3" />
									<span className="transition-transform group-hover:translate-x-1">Returns Policy</span>
								</LinkWithChannel>
							</li>
							<li>
								<LinkWithChannel
									href="/size-guide"
									className="group flex items-center text-sm text-gray-300 transition-colors hover:text-amber-400"
								>
									<span className="transition-transform group-hover:translate-x-1">Size Guide</span>
								</LinkWithChannel>
							</li>
						</ul>
					</div>

					{/* Customer Service */}
					<div>
						<h3 className="mb-6 text-lg font-semibold text-white">Customer Service</h3>
						<ul className="space-y-3">
							<li>
								<LinkWithChannel
									href="/help"
									className="group flex items-center text-sm text-gray-300 transition-colors hover:text-amber-400"
								>
									<span className="transition-transform group-hover:translate-x-1">Help Center</span>
								</LinkWithChannel>
							</li>
							<li>
								<LinkWithChannel
									href="/faq"
									className="group flex items-center text-sm text-gray-300 transition-colors hover:text-amber-400"
								>
									<span className="transition-transform group-hover:translate-x-1">FAQ</span>
								</LinkWithChannel>
							</li>
							<li>
								<LinkWithChannel
									href="/track-order"
									className="group flex items-center text-sm text-gray-300 transition-colors hover:text-amber-400"
								>
									<span className="transition-transform group-hover:translate-x-1">Track Your Order</span>
								</LinkWithChannel>
							</li>
							<li>
								<LinkWithChannel
									href="/support"
									className="group flex items-center text-sm text-gray-300 transition-colors hover:text-amber-400"
								>
									<span className="transition-transform group-hover:translate-x-1">Live Support</span>
								</LinkWithChannel>
							</li>
							<li>
								<LinkWithChannel
									href="/warranty"
									className="group flex items-center text-sm text-gray-300 transition-colors hover:text-amber-400"
								>
									<Shield className="mr-2 h-3 w-3" />
									<span className="transition-transform group-hover:translate-x-1">Warranty</span>
								</LinkWithChannel>
							</li>
						</ul>
					</div>

					{/* Social & Trust */}
					<div>
						<h3 className="mb-6 text-lg font-semibold text-white">Connect With Us</h3>

						{/* Social Media */}
						<div className="mb-6 flex space-x-4">
							{social.facebook && (
								<a
									href={social.facebook}
									className="rounded-lg p-2 text-gray-300 transition-colors hover:bg-gray-800 hover:text-amber-400"
								>
									<Facebook className="h-5 w-5" />
									<span className="sr-only">Facebook</span>
								</a>
							)}
							{social.instagram && (
								<a
									href={social.instagram}
									className="rounded-lg p-2 text-gray-300 transition-colors hover:bg-gray-800 hover:text-amber-400"
								>
									<Instagram className="h-5 w-5" />
									<span className="sr-only">Instagram</span>
								</a>
							)}
							{social.twitter && (
								<a
									href={social.twitter}
									className="rounded-lg p-2 text-gray-300 transition-colors hover:bg-gray-800 hover:text-amber-400"
								>
									<Twitter className="h-5 w-5" />
									<span className="sr-only">Twitter</span>
								</a>
							)}
							{social.youtube && (
								<a
									href={social.youtube}
									className="rounded-lg p-2 text-gray-300 transition-colors hover:bg-gray-800 hover:text-amber-400"
								>
									<Youtube className="h-5 w-5" />
									<span className="sr-only">YouTube</span>
								</a>
							)}
							{social.linkedin && (
								<a
									href={social.linkedin}
									className="rounded-lg p-2 text-gray-300 transition-colors hover:bg-gray-800 hover:text-amber-400"
								>
									<Linkedin className="h-5 w-5" />
									<span className="sr-only">LinkedIn</span>
								</a>
							)}
						</div>

						{/* Payment Methods */}
						<div className="mb-6">
							<h4 className="mb-3 text-sm font-semibold text-gray-300">We Accept</h4>
							<div className="flex space-x-2">
								<div className="rounded bg-white p-1">
									<CreditCard className="h-6 w-6 text-gray-700" />
								</div>
								<div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 p-1 text-xs font-bold text-white">
									VISA
								</div>
								<div className="flex h-8 w-8 items-center justify-center rounded bg-red-600 p-1 text-xs font-bold text-white">
									MC
								</div>
								<div className="flex h-8 w-8 items-center justify-center rounded bg-blue-500 p-1 text-xs font-bold text-white">
									AMEX
								</div>
								<div className="flex h-8 w-8 items-center justify-center rounded bg-yellow-400 p-1 text-xs font-bold text-gray-900">
									PP
								</div>
							</div>
						</div>

						{/* Trust Badges */}
						<div className="space-y-2">
							<div className="flex items-center space-x-2 text-xs text-gray-400">
								<Shield className="h-3 w-3 text-green-400" />
								<span>SSL Secured Checkout</span>
							</div>
							<div className="flex items-center space-x-2 text-xs text-gray-400">
								<Truck className="h-3 w-3 text-blue-400" />
								<span>Lightning-Fast Delivery</span>
							</div>
							<div className="flex items-center space-x-2 text-xs text-gray-400">
								<RotateCcw className="h-3 w-3 text-amber-400" />
								<span>30-Day Returns</span>
							</div>
						</div>
					</div>
				</div>

				{/* Dynamic Footer Links from Saleor */}
				{footerLinks.menu?.items && footerLinks.menu.items.length > 0 && (
					<div className="mt-8 border-t border-gray-700 pt-8">
						<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
							{footerLinks.menu.items.map((item) => (
								<div key={item.id}>
									<h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
										{item.name}
									</h3>
									<ul className="space-y-3">
										{item.children?.map((child) => {
											if (child.category) {
												return (
													<li key={child.id}>
														<LinkWithChannel
															href={`/categories/${child.category.slug}`}
															className="text-sm text-gray-300 transition-colors duration-200 hover:text-amber-400"
														>
															{child.category.name}
														</LinkWithChannel>
													</li>
												);
											}
											if (child.collection) {
												return (
													<li key={child.id}>
														<LinkWithChannel
															href={`/collections/${child.collection.slug}`}
															className="text-sm text-gray-300 transition-colors duration-200 hover:text-amber-400"
														>
															{child.collection.name}
														</LinkWithChannel>
													</li>
												);
											}
											if (child.page) {
												return (
													<li key={child.id}>
														<LinkWithChannel
															href={`/pages/${child.page.slug}`}
															className="text-sm text-gray-300 transition-colors duration-200 hover:text-amber-400"
														>
															{child.page.title}
														</LinkWithChannel>
													</li>
												);
											}
											if (child.url) {
												return (
													<li key={child.id}>
														<LinkWithChannel
															href={child.url}
															className="text-sm text-gray-300 transition-colors duration-200 hover:text-amber-400"
														>
															{child.name}
														</LinkWithChannel>
													</li>
												);
											}
											return null;
										})}
									</ul>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Channel Selection */}
				{channels?.channels && (
					<div className="mt-8 border-t border-gray-700 pt-6">
						<label className="flex items-center space-x-2">
							<span className="text-sm text-gray-300">Change currency:</span>
							<ChannelSelect channels={channels.channels} />
						</label>
					</div>
				)}
			</div>

			{/* Bottom Section */}
			<div className="border-t border-gray-700">
				<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
					<div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
						<div className="flex flex-col items-center space-y-2 md:flex-row md:space-x-6 md:space-y-0">
							<p className="text-sm text-gray-400">
								© {currentYear} {company.name}. All rights reserved.
							</p>
							<p className="text-xs text-gray-500">
								Founded in {company.founded} • {company.tagline}
							</p>
						</div>
						<div className="flex flex-wrap justify-center space-x-6 md:justify-end">
							<LinkWithChannel
								href="/privacy"
								className="text-sm text-gray-400 transition-colors hover:text-amber-400"
							>
								Privacy Policy
							</LinkWithChannel>
							<LinkWithChannel
								href="/terms"
								className="text-sm text-gray-400 transition-colors hover:text-amber-400"
							>
								Terms of Service
							</LinkWithChannel>
							<LinkWithChannel
								href="/cookies"
								className="text-sm text-gray-400 transition-colors hover:text-amber-400"
							>
								Cookie Policy
							</LinkWithChannel>
							<LinkWithChannel
								href="/accessibility"
								className="text-sm text-gray-400 transition-colors hover:text-amber-400"
							>
								Accessibility
							</LinkWithChannel>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
