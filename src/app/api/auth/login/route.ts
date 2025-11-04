import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const body = (await request.json()) as { email: string; password: string };
		const { email, password } = body;

		// Simulate authentication logic
		// In a real app, you would validate against your database
		if (!email || !password) {
			return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
		}

		// Simulate user not found
		if (email === "notfound@example.com") {
			return NextResponse.json({ message: "Account not found" }, { status: 404 });
		}

		// Simulate invalid credentials
		if (password === "wrongpassword") {
			return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
		}

		// Simulate successful login
		return NextResponse.json(
			{
				message: "Login successful",
				user: { email, name: "User" },
			},
			{ status: 200 },
		);
	} catch (error) {
		return NextResponse.json({ message: "Internal server error" }, { status: 500 });
	}
}
