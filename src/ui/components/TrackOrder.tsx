"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Package, Truck, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/ui/components/Button";

interface OrderItem {
	name: string;
	quantity: number;
	price: string;
}

interface TimelineStep {
	status: string;
	date: string;
	description: string;
	completed: boolean;
	current?: boolean;
	icon: React.ReactElement;
}

interface OrderData {
	orderNumber: string;
	status: string;
	estimatedDelivery: string;
	trackingNumber: string;
	items: OrderItem[];
	timeline: TimelineStep[];
}

export function TrackOrder() {
	const [orderNumber, setOrderNumber] = useState("");
	const [email, setEmail] = useState("");
	const [orderData, setOrderData] = useState<OrderData | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleTrackOrder = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		if (!orderNumber) {
			setOrderData(null);
			setIsLoading(false);
			return;
		}

		try {
			const response = await fetch("/api/track-order", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ orderNumber }),
			});

			if (response.ok) {
				const data = (await response.json()) as { order: OrderData };
				setOrderData(data.order);
			} else {
				setOrderData(null);
			}
		} catch (error) {
			console.error("Error tracking order:", error);
			setOrderData(null);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="space-y-8">
			{/* Track Order Form */}
			<div className="mx-auto max-w-2xl">
				<form
					onSubmit={handleTrackOrder}
					className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm"
				>
					<div className="mb-6 grid gap-4 md:grid-cols-2">
						<div>
							<label htmlFor="orderNumber" className="mb-2 block text-sm font-medium text-gray-700">
								Order Number *
							</label>
							<input
								type="text"
								id="orderNumber"
								value={orderNumber}
								onChange={(e) => setOrderNumber(e.target.value)}
								required
								placeholder="e.g., LUX-2025-001234"
								className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
							/>
						</div>
						<div>
							<label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
								Email Address *
							</label>
							<input
								type="email"
								id="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								placeholder="Enter your email"
								className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
							/>
						</div>
					</div>

					<Button
						type="submit"
						variant="primary"
						size="lg"
						fullWidth
						loading={isLoading}
						icon={<Search className="h-5 w-5" />}
					>
						Track Order
					</Button>

					<p className="mt-4 text-center text-sm text-gray-500">
						You can find your order number in your confirmation email or account dashboard.
					</p>
				</form>
			</div>

			{/* Order Results */}
			{orderData && (
				<div className="space-y-6">
					{/* Order Summary */}
					<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
						<div className="mb-6 flex items-center justify-between">
							<div>
								<h2 className="text-2xl font-bold text-gray-900">Order #{orderData.orderNumber}</h2>
								<p className="text-gray-600">Tracking: {orderData.trackingNumber}</p>
							</div>
							<div className="text-right">
								<div className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
									<Clock className="mr-1 h-4 w-4" />
									{orderData.status}
								</div>
								<p className="mt-1 text-sm text-gray-600">Est. Delivery: {orderData.estimatedDelivery}</p>
							</div>
						</div>

						{/* Order Items */}
						<div className="border-t border-gray-200 pt-4">
							<h3 className="mb-3 font-medium text-gray-900">Order Items</h3>
							{orderData.items.map((item, index) => (
								<div key={index} className="flex items-center justify-between py-2">
									<div>
										<p className="font-medium text-gray-900">{item.name}</p>
										<p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
									</div>
									<p className="font-medium text-gray-900">{item.price}</p>
								</div>
							))}
						</div>
					</div>

					{/* Tracking Timeline */}
					<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
						<h3 className="mb-6 text-xl font-bold text-gray-900">Tracking Timeline</h3>
						<div className="space-y-4">
							{orderData.timeline.map((step, index) => (
								<div key={index} className="flex items-start space-x-4">
									<div
										className={`flex h-10 w-10 items-center justify-center rounded-full ${
											step.completed
												? step.current
													? "bg-amber-500 text-white"
													: "bg-green-500 text-white"
												: "bg-gray-200 text-gray-400"
										}`}
									>
										{step.icon}
									</div>
									<div className="flex-1">
										<div className="flex items-center justify-between">
											<h4 className={`font-medium ${step.completed ? "text-gray-900" : "text-gray-500"}`}>
												{step.status}
											</h4>
											<span className={`text-sm ${step.completed ? "text-gray-600" : "text-gray-400"}`}>
												{step.date}
											</span>
										</div>
										<p className={`text-sm ${step.completed ? "text-gray-600" : "text-gray-400"}`}>
											{step.description}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Contact Support */}
					<div className="rounded-lg bg-amber-50 p-6">
						<h3 className="mb-2 font-medium text-amber-800">Need Help?</h3>
						<p className="mb-4 text-amber-700">
							If you have questions about your order or need assistance, our customer service team is here to
							help.
						</p>
						<div className="flex flex-col gap-2 sm:flex-row">
							<Link
								href="/contact"
								className="rounded-lg bg-amber-600 px-4 py-2 text-center text-white transition-colors hover:bg-amber-700"
							>
								Contact Support
							</Link>
							<a
								href="https://wa.me/254797923313"
								target="_blank"
								rel="noopener noreferrer"
								className="rounded-lg border border-amber-600 px-4 py-2 text-center text-amber-600 transition-colors hover:bg-amber-600 hover:text-white"
							>
								WhatsApp Us
							</a>
						</div>
					</div>
				</div>
			)}

			{/* No Order Found */}
			{orderData === null && orderNumber && !isLoading && (
				<div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
					<h3 className="mb-2 font-medium text-red-800">Order Not Found</h3>
					<p className="mb-4 text-red-700">
						We couldn&apos;t find an order with the provided details. Please check your order number and email
						address.
					</p>
					<div className="text-sm text-red-600">
						<p>• Make sure your order number is correct (e.g., LUX-2025-001234)</p>
						<p>• Use the same email address you used when placing the order</p>
						<p>• Contact support if you continue to have issues</p>
					</div>
				</div>
			)}

			{/* Help Section */}
			<div className="grid gap-6 md:grid-cols-3">
				<div className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
					<Package className="mx-auto mb-3 h-8 w-8 text-amber-600" />
					<h3 className="mb-2 font-medium text-gray-900">Order Issues</h3>
					<p className="text-sm text-gray-600">
						Problems with your order? We&apos;re here to help resolve any issues quickly.
					</p>
				</div>
				<div className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
					<Truck className="mx-auto mb-3 h-8 w-8 text-amber-600" />
					<h3 className="mb-2 font-medium text-gray-900">Delivery Updates</h3>
					<p className="text-sm text-gray-600">
						Get SMS and email notifications about your delivery status and updates.
					</p>
				</div>
				<div className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
					<CheckCircle className="mx-auto mb-3 h-8 w-8 text-amber-600" />
					<h3 className="mb-2 font-medium text-gray-900">Order History</h3>
					<p className="text-sm text-gray-600">
						View all your past orders and track multiple packages in your account.
					</p>
				</div>
			</div>
		</div>
	);
}
