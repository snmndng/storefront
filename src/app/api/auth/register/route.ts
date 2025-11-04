import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as {
			firstName: string;
			lastName: string;
			email: string;
			password: string;
		};
		const { firstName, lastName, email, password } = body;

		// Simulate registration logic
		// In a real app, you would save to your database
		if (!firstName || !lastName || !email || !password) {
			return NextResponse.json({ message: "All required fields must be provided" }, { status: 400 });
		}

		// Simulate email already exists
		if (email === "existing@example.com") {
			return NextResponse.json({ message: "An account with this email already exists" }, { status: 409 });
		}

		// Simulate successful registration
		return NextResponse.json(
			{
				message: "Registration successful",
				user: { email, firstName, lastName },
			},
			{ status: 201 },
		);
	} catch (error) {
		return NextResponse.json({ message: "Internal server error" }, { status: 500 });
	}
}
