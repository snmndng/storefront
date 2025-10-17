import Link from "next/link";
import Image from "next/image";
import { LinkWithChannel } from "../atoms/LinkWithChannel";
import { ChannelSelect } from "./ChannelSelect";
import { ChannelsListDocument, MenuGetBySlugDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";

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
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-gray-900 text-white">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16">
					{footerLinks.menu?.items?.map((item) => {
						return (
							<div key={item.id}>
								<h3 className="text-sm font-semibold text-white uppercase tracking-wider">{item.name}</h3>
								<ul className="mt-6 space-y-4">
									{item.children?.map((child) => {
										if (child.category) {
											return (
												<li key={child.id}>
													<LinkWithChannel 
														href={`/categories/${child.category.slug}`}
														className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
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
														className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
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
														className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
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
														className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
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
						);
					})}
				</div>

				{channels?.channels && (
					<div className="border-t border-gray-800 pt-8 pb-4">
						<label className="flex items-center space-x-2">
							<span className="text-sm text-gray-300">Change currency:</span> 
							<ChannelSelect channels={channels.channels} />
						</label>
					</div>
				)}

				<div className="flex flex-col justify-between border-t border-gray-800 py-8 sm:flex-row items-center">
					<p className="text-sm text-gray-400">Copyright &copy; {currentYear} Your Brand, Inc. All rights reserved.</p>
					<div className="flex items-center space-x-4 mt-4 sm:mt-0">
						<p className="flex items-center gap-2 text-sm text-gray-400">
							Powered by{" "}
							<Link target={"_blank"} href={"https://saleor.io/"} className="text-gray-300 hover:text-white transition-colors">
								Saleor
							</Link>{" "}
							<Link href={"https://github.com/saleor/saleor"} target={"_blank"} className="opacity-60 hover:opacity-100 transition-opacity">
								<Image alt="Saleor github repository" height={16} width={16} src={"/github-mark.svg"} className="invert" />
							</Link>
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
