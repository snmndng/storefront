import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as {
			email: string;
			firstName?: string;
			preferences?: string[];
		};
		const { email, firstName, preferences } = body;

		// Validate required fields
		if (!email) {
			return NextResponse.json({ message: "Email is required" }, { status: 400 });
		}

		// Basic email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
		}

		// Simulate newsletter subscription logic
		// In a real app, you would integrate with your email service provider (Mailchimp, SendGrid, etc.)

		// Simulate existing subscriber check
		if (email === "existing@newsletter.com") {
			return NextResponse.json(
				{ message: "This email is already subscribed to our newsletter" },
				{ status: 409 },
			);
		}

		// Simulate successful subscription
		console.log("Newsletter subscription:", { email, firstName, preferences });

		return NextResponse.json(
			{
				message: "Successfully subscribed to newsletter",
				subscriber: { email, firstName, preferences },
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error("Newsletter subscription error:", error);
		return NextResponse.json({ message: "Internal server error" }, { status: 500 });
	}
}
