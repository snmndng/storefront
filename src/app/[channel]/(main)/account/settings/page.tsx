import { Suspense } from "react";
import { Bell, Shield, Eye } from "lucide-react";
import { Loader } from "@/ui/atoms/Loader";

export const metadata = {
	title: "Account Settings - Luxiorstore",
	description: "Manage your account preferences and security settings.",
};

export default function SettingsPage() {
	return (
		<Suspense fallback={<Loader />}>
			<div className="space-y-8">
				{/* Header */}
				<div>
					<h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
					<p className="mt-2 text-gray-600">Manage your account preferences and security settings</p>
				</div>

				{/* Notification Settings */}
				<div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
					<div className="mb-6 flex items-center space-x-3">
						<Bell className="h-6 w-6 text-amber-600" />
						<h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
					</div>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium text-gray-900">Email Notifications</p>
								<p className="text-sm text-gray-600">Receive order updates and promotional emails</p>
							</div>
							<label className="relative inline-flex cursor-pointer items-center">
								<input type="checkbox" defaultChecked className="sr-only" />
								<div className="h-6 w-11 rounded-full bg-amber-600 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full"></div>
							</label>
						</div>
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium text-gray-900">SMS Notifications</p>
								<p className="text-sm text-gray-600">Get text messages for important updates</p>
							</div>
							<label className="relative inline-flex cursor-pointer items-center">
								<input type="checkbox" className="sr-only" />
								<div className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-amber-600 peer-checked:after:translate-x-full"></div>
							</label>
						</div>
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium text-gray-900">Marketing Communications</p>
								<p className="text-sm text-gray-600">Receive newsletters and promotional offers</p>
							</div>
							<label className="relative inline-flex cursor-pointer items-center">
								<input type="checkbox" defaultChecked className="sr-only" />
								<div className="h-6 w-11 rounded-full bg-amber-600 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full"></div>
							</label>
						</div>
					</div>
				</div>

				{/* Privacy Settings */}
				<div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
					<div className="mb-6 flex items-center space-x-3">
						<Shield className="h-6 w-6 text-amber-600" />
						<h2 className="text-xl font-semibold text-gray-900">Privacy & Security</h2>
					</div>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium text-gray-900">Profile Visibility</p>
								<p className="text-sm text-gray-600">Control who can see your profile information</p>
							</div>
							<select className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20">
								<option>Private</option>
								<option>Friends Only</option>
								<option>Public</option>
							</select>
						</div>
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium text-gray-900">Two-Factor Authentication</p>
								<p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
							</div>
							<button className="rounded-lg bg-amber-600 px-4 py-2 text-sm text-white transition-colors hover:bg-amber-700">
								Enable 2FA
							</button>
						</div>
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium text-gray-900">Login Activity</p>
								<p className="text-sm text-gray-600">View recent login attempts and active sessions</p>
							</div>
							<button className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50">
								View Activity
							</button>
						</div>
					</div>
				</div>

				{/* Display Settings */}
				<div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
					<div className="mb-6 flex items-center space-x-3">
						<Eye className="h-6 w-6 text-amber-600" />
						<h2 className="text-xl font-semibold text-gray-900">Display Preferences</h2>
					</div>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium text-gray-900">Language</p>
								<p className="text-sm text-gray-600">Choose your preferred language</p>
							</div>
							<select className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20">
								<option>English</option>
								<option>Swahili</option>
								<option>French</option>
							</select>
						</div>
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium text-gray-900">Currency</p>
								<p className="text-sm text-gray-600">Select your preferred currency</p>
							</div>
							<select className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20">
								<option>KES - Kenyan Shilling</option>
								<option>USD - US Dollar</option>
								<option>EUR - Euro</option>
							</select>
						</div>
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium text-gray-900">Time Zone</p>
								<p className="text-sm text-gray-600">Set your local time zone</p>
							</div>
							<select className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20">
								<option>EAT (UTC+3)</option>
								<option>UTC (UTC+0)</option>
								<option>EST (UTC-5)</option>
							</select>
						</div>
					</div>
				</div>

				{/* Danger Zone */}
				<div className="rounded-lg border border-red-200 bg-red-50 p-8">
					<h2 className="mb-4 text-xl font-semibold text-red-900">Danger Zone</h2>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium text-red-900">Delete Account</p>
								<p className="text-sm text-red-700">Permanently delete your account and all data</p>
							</div>
							<button className="rounded-lg border border-red-300 bg-white px-4 py-2 text-sm text-red-700 transition-colors hover:bg-red-50">
								Delete Account
							</button>
						</div>
					</div>
				</div>
			</div>
		</Suspense>
	);
}
