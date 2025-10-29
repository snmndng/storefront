import { type ReactNode } from "react";
import { Footer } from "@/ui/components/Footer";
import { Header } from "@/ui/components/Header";
import { ErrorBoundary } from "@/ui/components/ErrorBoundary";
import { ToastProvider } from "@/ui/components/Toast";

export const metadata = {
	title: "Luxiorstore - Luxury Redefined",
	description:
		"Discover premium luxury products with exceptional quality and unmatched service at Luxiorstore.",
};

export default async function RootLayout(props: {
	children: ReactNode;
	params: Promise<{ channel: string }>;
}) {
	const channel = (await props.params).channel;

	return (
		<ErrorBoundary>
			<ToastProvider>
				<div className="flex min-h-screen flex-col">
					<Header channel={channel} />
					<main className="flex-1">{props.children}</main>
					<Footer channel={channel} />
				</div>
			</ToastProvider>
		</ErrorBoundary>
	);
}
