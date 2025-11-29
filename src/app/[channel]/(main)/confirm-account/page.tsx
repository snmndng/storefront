import { type Metadata } from "next";
import Link from "next/link";
import { executeGraphQL } from "@/lib/graphql";
import { ConfirmAccountDocument } from "@/gql/graphql";

export const metadata: Metadata = {
	title: "Confirm Account · Your Store",
	description: "Confirm your account email",
};

export default async function ConfirmAccountPage(props: {
	params: Promise<{ channel: string }>;
	searchParams: Promise<{ email?: string; token?: string }>;
}) {
	const params = await props.params;
	const searchParams = await props.searchParams;

	if (!searchParams.email || !searchParams.token) {
		return (
			<section className="mx-auto max-w-7xl px-4 py-12">
				<div className="mx-auto max-w-md text-center">
					<h1 className="text-2xl font-semibold text-neutral-900">Invalid Confirmation Link</h1>
					<p className="mt-2 text-neutral-600">
						This account confirmation link is invalid or has expired.
					</p>
					<Link
						href={`/${params.channel}/register`}
						className="mt-4 inline-block rounded-md bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
					>
						Register Again
					</Link>
				</div>
			</section>
		);
	}

	const result = await executeGraphQL(ConfirmAccountDocument, {
		variables: {
			email: searchParams.email,
			token: searchParams.token,
		},
		cache: "no-store",
	});

	const hasErrors = result.confirmAccount?.errors && result.confirmAccount.errors.length > 0;

	if (hasErrors) {
		return (
			<section className="mx-auto max-w-7xl px-4 py-12">
				<div className="mx-auto max-w-md text-center">
					<h1 className="text-2xl font-semibold text-neutral-900">Confirmation Failed</h1>
					<p className="mt-2 text-neutral-600">
						{result.confirmAccount?.errors?.[0]?.message || "Unable to confirm your account. The link may have expired."}
					</p>
					<Link
						href={`/${params.channel}/register`}
						className="mt-4 inline-block rounded-md bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
					>
						Register Again
					</Link>
				</div>
			</section>
		);
	}

	return (
		<section className="mx-auto max-w-7xl px-4 py-12">
			<div className="mx-auto max-w-md text-center">
				<div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
					<svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
					</svg>
				</div>
				<h1 className="text-2xl font-semibold text-neutral-900">Account Confirmed!</h1>
				<p className="mt-2 text-neutral-600">
					Your email has been verified successfully. You can now sign in to your account.
				</p>
				<Link
					href={`/${params.channel}/login`}
					className="mt-6 inline-block rounded-md bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
				>
					Sign In
				</Link>
			</div>
		</section>
	);
}
