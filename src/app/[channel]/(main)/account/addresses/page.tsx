import { Suspense } from "react";
import { Loader } from "@/ui/atoms/Loader";
import { AddressesPage } from "@/ui/components/AddressesPage";

export const metadata = {
	title: "My Addresses - Luxiorstore",
	description: "Manage your shipping and billing addresses at Luxiorstore.",
};

export default async function Addresses(props: { params: Promise<{ channel: string }> }) {
	const params = await props.params;
	return (
		<Suspense fallback={<Loader />}>
			<section className="mx-auto max-w-4xl p-8">
				<AddressesPage channel={params.channel} />
			</section>
		</Suspense>
	);
}
