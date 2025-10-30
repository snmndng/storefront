import { type ReactNode } from "react";
import { AuthProvider } from "@/ui/components/AuthProvider";

export const metadata = {
	title: "Checkout - Luxiorstore",
	description: "Secure checkout for your luxury shopping experience at Luxiorstore.",
};

export default function RootLayout(props: { children: ReactNode }) {
	return (
		<main>
			<AuthProvider>{props.children}</AuthProvider>
		</main>
	);
}
