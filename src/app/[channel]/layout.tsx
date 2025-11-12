import { type ReactNode } from "react";
import { executeGraphQL } from "@/lib/graphql";
import { ChannelsListDocument } from "@/gql/graphql";

export const generateStaticParams = async () => {
	// the `channels` query is protected
	// you can either hardcode the channels or use an app token to fetch the channel list here
	const defaultChannel = process.env.NEXT_PUBLIC_CHANNEL || "default-channel";

	try {
		if (process.env.SALEOR_APP_TOKEN) {
			const channels = await executeGraphQL(ChannelsListDocument, {
				withAuth: false, // disable cookie-based auth for this call
				headers: {
					// and use app token instead
					Authorization: `Bearer ${process.env.SALEOR_APP_TOKEN}`,
				},
			});
			return (
				channels.channels
					?.filter((channel) => channel.isActive)
					.map((channel) => ({ channel: channel.slug })) ?? []
			);
		} else {
			return [{ channel: defaultChannel }];
		}
	} catch (error) {
		console.warn("Failed to generate static params for channels:", error);
		// Fallback to default channel
		return [{ channel: defaultChannel }];
	}
};

export default function ChannelLayout({ children }: { children: ReactNode }) {
	return children;
}
