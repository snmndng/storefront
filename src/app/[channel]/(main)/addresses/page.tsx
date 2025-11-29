import { type Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { MapPin, ArrowLeft } from "lucide-react";
import { UserAddressesDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";

export const metadata: Metadata = {
	title: "My Addresses · Your Store",
	description: "Manage your saved addresses",
};

export default async function AddressesPage(props: {
	params: Promise<{ channel: string }>;
}) {
	const params = await props.params;
	const { me: user } = await executeGraphQL(UserAddressesDocument, {
		cache: "no-cache",
	});

	if (!user) {
		redirect(`/${params.channel}/login?redirectTo=/${params.channel}/addresses`);
	}

	const addresses = user.addresses || [];

	return (
		<div className="mx-auto max-w-7xl px-4 py-8">
			<div className="mb-8">
				<Link
					href={`/${params.channel}/profile`}
					className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors mb-4"
				>
					<ArrowLeft className="h-4 w-4" />
					Back to Profile
				</Link>
				<h1 className="text-2xl font-bold text-neutral-900">My Addresses</h1>
				<p className="mt-1 text-neutral-600">
					Manage your saved shipping and billing addresses
				</p>
			</div>

			{addresses.length === 0 ? (
				<div className="rounded-lg border border-neutral-200 bg-white p-12 text-center">
					<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
						<MapPin className="h-8 w-8 text-neutral-400" />
					</div>
					<h2 className="text-lg font-semibold text-neutral-900">No addresses saved</h2>
					<p className="mt-2 text-neutral-600">
						Add addresses during checkout to save them here.
					</p>
				</div>
			) : (
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{addresses.map((address) => (
						<div
							key={address.id}
							className="rounded-lg border border-neutral-200 bg-white p-4"
						>
							<div className="flex items-start justify-between mb-3">
								<div className="flex gap-2">
									{address.isDefaultShippingAddress && (
										<span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
											Default Shipping
										</span>
									)}
									{address.isDefaultBillingAddress && (
										<span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
											Default Billing
										</span>
									)}
								</div>
							</div>
							<div className="text-sm text-neutral-900">
								<p className="font-medium">
									{address.firstName} {address.lastName}
								</p>
								<p className="text-neutral-600 mt-1">{address.streetAddress1}</p>
								{address.streetAddress2 && (
									<p className="text-neutral-600">{address.streetAddress2}</p>
								)}
								<p className="text-neutral-600">
									{address.city}
									{address.cityArea && `, ${address.cityArea}`}
									{address.postalCode && ` ${address.postalCode}`}
								</p>
								<p className="text-neutral-600">
									{address.countryArea && `${address.countryArea}, `}
									{address.country.country}
								</p>
								{address.phone && (
									<p className="text-neutral-600 mt-2">{address.phone}</p>
								)}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
