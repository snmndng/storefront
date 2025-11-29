import { type Metadata } from "next";
import Link from "next/link";
import { ResetPasswordFormClient } from "@/ui/components/auth";

export const metadata: Metadata = {
	title: "Set New Password · Your Store",
	description: "Set your new password",
};

export default async function ResetPasswordPage(props: {
	params: Promise<{ channel: string }>;
	searchParams: Promise<{ email?: string; token?: string }>;
}) {
	const params = await props.params;
	const searchParams = await props.searchParams;

	if (!searchParams.email || !searchParams.token) {
		return (
			<section className="mx-auto max-w-7xl px-4 py-12">
				<div className="mx-auto max-w-md text-center">
					<h1 className="text-2xl font-semibold text-neutral-900">Invalid Reset Link</h1>
					<p className="mt-2 text-neutral-600">
						This password reset link is invalid or has expired.
					</p>
					<Link
						href={`/${params.channel}/forgot-password`}
						className="mt-4 inline-block rounded-md bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
					>
						Request New Link
					</Link>
				</div>
			</section>
		);
	}

	return (
		<section className="mx-auto max-w-7xl px-4 py-12">
			<ResetPasswordFormClient
				channel={params.channel}
				email={searchParams.email}
				token={searchParams.token}
			/>
		</section>
	);
}
