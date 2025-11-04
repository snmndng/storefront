"use client";

import { useState } from "react";
import { Plus, MapPin, Edit, Trash2, Star } from "lucide-react";
import { Button } from "@/ui/components/Button";

interface Address {
	id: string;
	firstName: string;
	lastName: string;
	streetAddress1: string;
	streetAddress2?: string;
	city: string;
	postalCode: string;
	country: string;
	phone?: string;
	isDefaultBillingAddress: boolean;
	isDefaultShippingAddress: boolean;
}

interface AddressesPageProps {
	channel: string;
}

// Mock addresses - would come from Saleor API using user addresses query
const mockAddresses: Address[] = [
	{
		id: "1",
		firstName: "Sarah",
		lastName: "Johnson",
		streetAddress1: "123 Westlands Road",
		streetAddress2: "Apt 4B",
		city: "Nairobi",
		postalCode: "00100",
		country: "Kenya",
		phone: "+254 712 345 678",
		isDefaultBillingAddress: true,
		isDefaultShippingAddress: true,
	},
	{
		id: "2",
		firstName: "Sarah",
		lastName: "Johnson",
		streetAddress1: "456 Karen Road",
		city: "Nairobi",
		postalCode: "00502",
		country: "Kenya",
		phone: "+254 712 345 678",
		isDefaultBillingAddress: false,
		isDefaultShippingAddress: false,
	},
];

export function AddressesPage({}: AddressesPageProps) {
	const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
	const [showAddForm, setShowAddForm] = useState(false);

	const deleteAddress = async (addressId: string) => {
		// This would use the accountAddressDelete mutation
		setAddresses(addresses.filter((addr) => addr.id !== addressId));
	};

	const setDefaultAddress = async (addressId: string, type: "billing" | "shipping") => {
		// This would use the accountSetDefaultAddress mutation
		setAddresses(
			addresses.map((addr) => ({
				...addr,
				isDefaultBillingAddress: type === "billing" ? addr.id === addressId : addr.isDefaultBillingAddress,
				isDefaultShippingAddress: type === "shipping" ? addr.id === addressId : addr.isDefaultShippingAddress,
			})),
		);
	};

	const formatAddress = (address: Address) => {
		const parts = [
			address.streetAddress1,
			address.streetAddress2,
			address.city,
			address.postalCode,
			address.country,
		].filter(Boolean);
		return parts.join(", ");
	};

	return (
		<div className="space-y-8">
			{/* Header */}
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">My Addresses</h1>
					<p className="text-gray-600">Manage your shipping and billing addresses</p>
				</div>
				<Button variant="primary" onClick={() => setShowAddForm(true)} icon={<Plus className="h-4 w-4" />}>
					Add New Address
				</Button>
			</div>

			{addresses.length === 0 ? (
				/* Empty State */
				<div className="py-16 text-center">
					<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
						<MapPin className="h-8 w-8 text-gray-400" />
					</div>
					<h3 className="mb-2 text-lg font-medium text-gray-900">No addresses saved</h3>
					<p className="mb-6 text-gray-600">Add your shipping and billing addresses for faster checkout.</p>
					<Button variant="primary" onClick={() => setShowAddForm(true)} icon={<Plus className="h-4 w-4" />}>
						Add Your First Address
					</Button>
				</div>
			) : (
				/* Addresses Grid */
				<div className="grid gap-6 md:grid-cols-2">
					{addresses.map((address) => (
						<div
							key={address.id}
							className="relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
						>
							{/* Default Address Badges */}
							<div className="mb-4 flex flex-wrap gap-2">
								{address.isDefaultBillingAddress && (
									<span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
										<Star className="mr-1 h-3 w-3" />
										Default Billing
									</span>
								)}
								{address.isDefaultShippingAddress && (
									<span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
										<Star className="mr-1 h-3 w-3" />
										Default Shipping
									</span>
								)}
							</div>

							{/* Address Details */}
							<div className="mb-4">
								<h3 className="font-semibold text-gray-900">
									{address.firstName} {address.lastName}
								</h3>
								<p className="mt-1 text-gray-600">{formatAddress(address)}</p>
								{address.phone && <p className="mt-1 text-sm text-gray-500">{address.phone}</p>}
							</div>

							{/* Actions */}
							<div className="flex items-center justify-between">
								<div className="flex space-x-2">
									<button
										onClick={() => {
											/* Edit address */
										}}
										className="flex items-center space-x-1 text-sm text-amber-600 hover:text-amber-700"
									>
										<Edit className="h-4 w-4" />
										<span>Edit</span>
									</button>
									<button
										onClick={() => deleteAddress(address.id)}
										className="flex items-center space-x-1 text-sm text-red-600 hover:text-red-700"
									>
										<Trash2 className="h-4 w-4" />
										<span>Delete</span>
									</button>
								</div>

								{/* Set Default Dropdown */}
								<div className="relative">
									<select
										onChange={(e) => {
											const [type] = e.target.value.split("-");
											if (type === "billing" || type === "shipping") {
												void setDefaultAddress(address.id, type);
											}
										}}
										className="rounded border border-gray-300 px-2 py-1 text-xs"
										defaultValue=""
									>
										<option value="" disabled>
											Set as default
										</option>
										{!address.isDefaultBillingAddress && <option value="billing">Default Billing</option>}
										{!address.isDefaultShippingAddress && <option value="shipping">Default Shipping</option>}
									</select>
								</div>
							</div>
						</div>
					))}
				</div>
			)}

			{/* Add Address Form Modal */}
			{showAddForm && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
					<div className="mx-4 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6">
						<h3 className="mb-6 text-xl font-bold">Add New Address</h3>

						<form className="space-y-4">
							<div className="grid gap-4 sm:grid-cols-2">
								<div>
									<label className="mb-1 block text-sm font-medium text-gray-700">First Name *</label>
									<input
										type="text"
										required
										className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
									/>
								</div>
								<div>
									<label className="mb-1 block text-sm font-medium text-gray-700">Last Name *</label>
									<input
										type="text"
										required
										className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
									/>
								</div>
							</div>

							<div>
								<label className="mb-1 block text-sm font-medium text-gray-700">Street Address *</label>
								<input
									type="text"
									required
									className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
								/>
							</div>

							<div>
								<label className="mb-1 block text-sm font-medium text-gray-700">
									Apartment, suite, etc. (optional)
								</label>
								<input
									type="text"
									className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
								/>
							</div>

							<div className="grid gap-4 sm:grid-cols-2">
								<div>
									<label className="mb-1 block text-sm font-medium text-gray-700">City *</label>
									<input
										type="text"
										required
										className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
									/>
								</div>
								<div>
									<label className="mb-1 block text-sm font-medium text-gray-700">Postal Code *</label>
									<input
										type="text"
										required
										className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
									/>
								</div>
							</div>

							<div>
								<label className="mb-1 block text-sm font-medium text-gray-700">Country *</label>
								<select
									required
									className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
								>
									<option value="">Select Country</option>
									<option value="KE">Kenya</option>
									<option value="UG">Uganda</option>
									<option value="TZ">Tanzania</option>
								</select>
							</div>

							<div>
								<label className="mb-1 block text-sm font-medium text-gray-700">Phone Number</label>
								<input
									type="tel"
									className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
								/>
							</div>

							<div className="space-y-2">
								<label className="flex items-center">
									<input
										type="checkbox"
										className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
									/>
									<span className="ml-2 text-sm text-gray-700">Set as default billing address</span>
								</label>
								<label className="flex items-center">
									<input
										type="checkbox"
										className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
									/>
									<span className="ml-2 text-sm text-gray-700">Set as default shipping address</span>
								</label>
							</div>

							<div className="flex justify-end space-x-4 pt-4">
								<Button variant="outline" onClick={() => setShowAddForm(false)}>
									Cancel
								</Button>
								<Button variant="primary" type="submit">
									Save Address
								</Button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* Help Section */}
			<div className="rounded-lg bg-amber-50 p-6">
				<h3 className="mb-2 font-medium text-amber-800">Address Tips</h3>
				<ul className="space-y-1 text-sm text-amber-700">
					<li>• Use your default billing address for payment processing</li>
					<li>• Set a default shipping address for faster checkout</li>
					<li>• Make sure your address details are accurate for successful delivery</li>
					<li>• You can have different billing and shipping addresses</li>
				</ul>
			</div>
		</div>
	);
}
