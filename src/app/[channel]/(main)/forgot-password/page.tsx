import { type Metadata } from "next";
import { ForgotPasswordFormClient } from "@/ui/components/auth";

export const metadata: Metadata = {
	title: "Reset Password · Your Store",
	description: "Reset your account password",
};

export default async function ForgotPasswordPage(props: {
	params: Promise<{ channel: string }>;
}) {
	const params = await props.params;
	const baseUrl = process.env.NEXT_PUBLIC_STOREFRONT_URL || "";
	const redirectUrl = `${baseUrl}/${params.channel}/reset-password`;

	return (
		<section className="mx-auto max-w-7xl px-4 py-12">
			<ForgotPasswordFormClient channel={params.channel} redirectUrl={redirectUrl} />
		</section>
	);
}
