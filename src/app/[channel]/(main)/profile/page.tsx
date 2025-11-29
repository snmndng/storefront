import { type Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { User, Package, MapPin } from "lucide-react";
import { CurrentUserDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { ProfileForm, LogoutButton } from "@/ui/components/account";

export const metadata: Metadata = {
	title: "My Profile · Your Store",
	description: "Manage your account settings",
};

export default async function ProfilePage(props: {
	params: Promise<{ channel: string }>;
}) {
	const params = await props.params;
	const { me: user } = await executeGraphQL(CurrentUserDocument, {
		cache: "no-cache",
	});

	if (!user) {
		redirect(`/${params.channel}/login?redirectTo=/${params.channel}/profile`);
	}

	return (
		<div className="mx-auto max-w-7xl px-4 py-8">
			<div className="mb-8 flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold text-neutral-900">My Account</h1>
					<p className="mt-1 text-neutral-600">
						Welcome back, {user.firstName || user.email}
					</p>
				</div>
				<LogoutButton />
			</div>

			<div className="grid gap-6 lg:grid-cols-3">
				<div className="lg:col-span-2 space-y-6">
					<ProfileForm
						initialFirstName={user.firstName || ""}
						initialLastName={user.lastName || ""}
					/>

					<div className="rounded-lg border border-neutral-200 bg-white p-6">
						<h2 className="text-lg font-semibold text-neutral-900 mb-4">Account Details</h2>
						<div className="space-y-3">
							<div>
								<span className="text-sm text-neutral-500">Email</span>
								<p className="text-neutral-900">{user.email}</p>
							</div>
						</div>
					</div>
				</div>

				<div className="space-y-4">
					<Link
						href={`/${params.channel}/orders`}
						className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-white p-4 hover:border-neutral-300 transition-colors"
					>
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
							<Package className="h-5 w-5 text-neutral-600" />
						</div>
						<div>
							<p className="font-medium text-neutral-900">Order History</p>
							<p className="text-sm text-neutral-500">View your past orders</p>
						</div>
					</Link>

					<Link
						href={`/${params.channel}/addresses`}
						className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-white p-4 hover:border-neutral-300 transition-colors"
					>
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
							<MapPin className="h-5 w-5 text-neutral-600" />
						</div>
						<div>
							<p className="font-medium text-neutral-900">Addresses</p>
							<p className="text-sm text-neutral-500">Manage your addresses</p>
						</div>
					</Link>

					<Link
						href={`/${params.channel}/forgot-password`}
						className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-white p-4 hover:border-neutral-300 transition-colors"
					>
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
							<User className="h-5 w-5 text-neutral-600" />
						</div>
						<div>
							<p className="font-medium text-neutral-900">Change Password</p>
							<p className="text-sm text-neutral-500">Update your password</p>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}
