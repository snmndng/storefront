import { type Metadata } from "next";
import { RegisterFormClient } from "@/ui/components/auth";

export const metadata: Metadata = {
	title: "Create Account · Your Store",
	description: "Create a new account to start shopping",
};

export default async function RegisterPage(props: {
	params: Promise<{ channel: string }>;
}) {
	const params = await props.params;
	const baseUrl = process.env.NEXT_PUBLIC_STOREFRONT_URL || "";
	const redirectUrl = `${baseUrl}/${params.channel}/confirm-account`;

	return (
		<section className="mx-auto max-w-7xl px-4 py-12">
			<RegisterFormClient channel={params.channel} redirectUrl={redirectUrl} />
		</section>
	);
}
