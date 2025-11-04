import { Suspense } from "react";
import { Loader } from "@/ui/atoms/Loader";
import { AccountDashboard } from "@/ui/components/AccountDashboard";

export const metadata = {
	title: "My Account - Luxiorstore",
	description: "Manage your Luxiorstore account, orders, addresses, and preferences.",
};

export default async function AccountPage(props: { params: Promise<{ channel: string }> }) {
	const params = await props.params;
	return (
		<Suspense fallback={<Loader />}>
			<section className="mx-auto max-w-7xl p-8">
				<AccountDashboard channel={params.channel} />
			</section>
		</Suspense>
	);
}
