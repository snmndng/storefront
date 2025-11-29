import { type Metadata } from "next";
import { LoginFormClient } from "@/ui/components/auth";

export const metadata: Metadata = {
	title: "Sign In · Your Store",
	description: "Sign in to your account",
};

export default async function LoginPage(props: {
	params: Promise<{ channel: string }>;
	searchParams: Promise<{ registered?: string; redirectTo?: string }>;
}) {
	const params = await props.params;
	const searchParams = await props.searchParams;

	return (
		<section className="mx-auto max-w-7xl px-4 py-12">
			{searchParams.registered && (
				<div className="mx-auto mb-6 max-w-md rounded-md border border-green-200 bg-green-50 p-4 text-center text-sm text-green-700">
					Account created successfully! You can now sign in.
				</div>
			)}
			<LoginFormClient
				channel={params.channel}
				redirectTo={searchParams.redirectTo || `/${params.channel}`}
			/>
		</section>
	);
}
