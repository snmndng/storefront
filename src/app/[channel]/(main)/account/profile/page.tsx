import { Suspense } from "react";
import { User, Mail, Phone, Calendar } from "lucide-react";
import { Loader } from "@/ui/atoms/Loader";

export const metadata = {
	title: "Profile Settings - Luxiorstore",
	description: "Manage your personal information and account details.",
};

export default function ProfilePage() {
	return (
		<Suspense fallback={<Loader />}>
			<div className="space-y-8">
				{/* Header */}
				<div>
					<h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
					<p className="mt-2 text-gray-600">Manage your personal information and account details</p>
				</div>

				{/* Profile Form */}
				<div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
					<form className="space-y-6">
						<div className="grid gap-6 md:grid-cols-2">
							<div>
								<label htmlFor="firstName" className="mb-2 block text-sm font-medium text-gray-700">
									First Name
								</label>
								<div className="relative">
									<User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
									<input
										type="text"
										id="firstName"
										name="firstName"
										defaultValue="Sarah"
										className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-gray-900 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
									/>
								</div>
							</div>

							<div>
								<label htmlFor="lastName" className="mb-2 block text-sm font-medium text-gray-700">
									Last Name
								</label>
								<div className="relative">
									<User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
									<input
										type="text"
										id="lastName"
										name="lastName"
										defaultValue="Johnson"
										className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-gray-900 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
									/>
								</div>
							</div>
						</div>

						<div>
							<label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
								Email Address
							</label>
							<div className="relative">
								<Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
								<input
									type="email"
									id="email"
									name="email"
									defaultValue="sarah@example.com"
									className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-gray-900 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
								/>
							</div>
						</div>

						<div>
							<label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
								Phone Number
							</label>
							<div className="relative">
								<Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
								<input
									type="tel"
									id="phone"
									name="phone"
									defaultValue="+254 712 345 678"
									className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-gray-900 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
								/>
							</div>
						</div>

						<div>
							<label htmlFor="dateOfBirth" className="mb-2 block text-sm font-medium text-gray-700">
								Date of Birth
							</label>
							<div className="relative">
								<Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
								<input
									type="date"
									id="dateOfBirth"
									name="dateOfBirth"
									className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-gray-900 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
								/>
							</div>
						</div>

						<div className="flex justify-end space-x-4">
							<button
								type="button"
								className="rounded-lg border border-gray-300 px-6 py-3 text-gray-700 transition-colors hover:bg-gray-50"
							>
								Cancel
							</button>
							<button
								type="submit"
								className="rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-3 text-white transition-colors hover:from-amber-700 hover:to-orange-700"
							>
								Save Changes
							</button>
						</div>
					</form>
				</div>

				{/* Account Information */}
				<div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
					<h2 className="mb-6 text-xl font-semibold text-gray-900">Account Information</h2>
					<div className="space-y-4">
						<div className="flex items-center justify-between border-b border-gray-100 pb-4">
							<div>
								<p className="font-medium text-gray-900">Account Status</p>
								<p className="text-sm text-gray-600">Your account is active and verified</p>
							</div>
							<span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
								Active
							</span>
						</div>
						<div className="flex items-center justify-between border-b border-gray-100 pb-4">
							<div>
								<p className="font-medium text-gray-900">Member Since</p>
								<p className="text-sm text-gray-600">January 15, 2024</p>
							</div>
						</div>
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium text-gray-900">Customer Type</p>
								<p className="text-sm text-gray-600">VIP Member</p>
							</div>
							<span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
								VIP
							</span>
						</div>
					</div>
				</div>
			</div>
		</Suspense>
	);
}
