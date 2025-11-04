import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as {
			orderNumber: string;
		};
		const { orderNumber } = body;

		// Validate required fields
		if (!orderNumber) {
			return NextResponse.json({ message: "Order number is required" }, { status: 400 });
		}

		// Simulate order tracking logic
		// In a real app, you would query your order management system or Saleor API

		// Mock order data for demonstration
		const mockOrders: Record<
			string,
			{
				orderNumber: string;
				status: string;
				estimatedDelivery: string;
				trackingNumber: string;
				items: Array<{ name: string; quantity: number; price: string }>;
				timeline: Array<{ status: string; date: string; completed: boolean }>;
			}
		> = {
			"LUX-2025-001234": {
				orderNumber: "LUX-2025-001234",
				status: "In Transit",
				estimatedDelivery: "2025-11-06",
				trackingNumber: "TRK123456789",
				items: [
					{ name: "Luxury Watch", quantity: 1, price: "KSh 45,000" },
					{ name: "Leather Wallet", quantity: 1, price: "KSh 8,500" },
				],
				timeline: [
					{ status: "Order Placed", date: "2025-11-01", completed: true },
					{ status: "Payment Confirmed", date: "2025-11-01", completed: true },
					{ status: "Processing", date: "2025-11-02", completed: true },
					{ status: "Shipped", date: "2025-11-03", completed: true },
					{ status: "In Transit", date: "2025-11-04", completed: true },
					{ status: "Out for Delivery", date: "2025-11-06", completed: false },
					{ status: "Delivered", date: "2025-11-06", completed: false },
				],
			},
			"LUX-2025-001233": {
				orderNumber: "LUX-2025-001233",
				status: "Delivered",
				estimatedDelivery: "2025-10-30",
				trackingNumber: "TRK987654321",
				items: [{ name: "Designer Handbag", quantity: 1, price: "KSh 28,500" }],
				timeline: [
					{ status: "Order Placed", date: "2025-10-28", completed: true },
					{ status: "Payment Confirmed", date: "2025-10-28", completed: true },
					{ status: "Processing", date: "2025-10-28", completed: true },
					{ status: "Shipped", date: "2025-10-29", completed: true },
					{ status: "In Transit", date: "2025-10-29", completed: true },
					{ status: "Out for Delivery", date: "2025-10-30", completed: true },
					{ status: "Delivered", date: "2025-10-30", completed: true },
				],
			},
		};

		// Check if order exists
		const order = mockOrders[orderNumber.toUpperCase()];

		if (!order) {
			return NextResponse.json(
				{
					message: "Order not found. Please check your order number and try again.",
				},
				{ status: 404 },
			);
		}

		return NextResponse.json(
			{
				message: "Order found successfully",
				order,
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error("Order tracking error:", error);
		return NextResponse.json({ message: "Internal server error" }, { status: 500 });
	}
}
