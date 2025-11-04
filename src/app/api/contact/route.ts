import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as {
			name: string;
			email: string;
			subject: string;
			message: string;
			phone?: string;
		};
		const { name, email, subject, message, phone } = body;

		// Validate required fields
		if (!name || !email || !subject || !message) {
			return NextResponse.json({ message: "All required fields must be provided" }, { status: 400 });
		}

		// Basic email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
		}

		// Validate message length
		if (message.length < 10) {
			return NextResponse.json({ message: "Message must be at least 10 characters long" }, { status: 400 });
		}

		// Simulate contact form submission logic
		// In a real app, you would:
		// 1. Save to database
		// 2. Send email notification to support team
		// 3. Send confirmation email to customer
		// 4. Integrate with CRM system

		console.log("Contact form submission:", { name, email, subject, message, phone });

		return NextResponse.json(
			{
				message: "Your message has been sent successfully. We'll get back to you within 24 hours.",
				ticket: {
					id: `CONTACT-${Date.now()}`,
					name,
					email,
					subject,
					status: "received",
				},
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error("Contact form error:", error);
		return NextResponse.json({ message: "Internal server error" }, { status: 500 });
	}
}
