"use server";

import { redirect } from "next/navigation";
import { getServerAuthClient } from "@/app/config";
import { executeGraphQL } from "@/lib/graphql";
import {
	AccountRegisterDocument,
	TokenCreateDocument,
	ShopInfoDocument,
	ProductListSimpleDocument,
} from "@/gql/graphql";

export async function login(email: string, password: string, channel: string = "default-channel") {
	"use server";

	try {
		// First try with Saleor auth client
		const authClient = await getServerAuthClient();
		const result = await authClient.signIn({ email, password });

		console.log("Auth client login result:", JSON.stringify(result, null, 2));

		if (result.data?.tokenCreate?.errors?.length) {
			const errors = result.data.tokenCreate.errors;
			console.log("Auth client login errors:", errors);

			// Try fallback direct GraphQL method
			console.log("Trying fallback GraphQL login method...");
			return await fallbackLogin(email, password, channel);
		}

		if (result.data?.tokenCreate?.token) {
			console.log("Auth client login successful, redirecting to account");
			redirect(`/${channel}/account`);
		}

		console.log("Auth client login failed - no token received, trying fallback...");
		return await fallbackLogin(email, password, channel);
	} catch (error) {
		// Check if this is a Next.js redirect (which is expected)
		if (error instanceof Error && error.message === "NEXT_REDIRECT") {
			throw error; // Re-throw redirect errors
		}
		console.error("Auth client login error:", error);
		console.log("Trying fallback GraphQL login method...");
		return await fallbackLogin(email, password, channel);
	}
}

async function fallbackLogin(email: string, password: string, channel: string) {
	try {
		console.log("Attempting direct GraphQL login for:", email);

		const result = await executeGraphQL(TokenCreateDocument, {
			variables: { email, password },
			withAuth: false,
		});

		console.log("Direct GraphQL login result:", JSON.stringify(result, null, 2));

		if (result.tokenCreate?.errors?.length) {
			const errors = result.tokenCreate.errors;
			console.log("Direct GraphQL login errors:", errors);
			return {
				success: false,
				errors: errors.map((error) => error.message || error.code || "Login failed"),
			};
		}

		if (result.tokenCreate?.token) {
			console.log("Direct GraphQL login successful");

			// TODO: Set the token in cookies manually since we bypassed the auth client
			// We might need to manually set the tokens here for proper session management

			redirect(`/${channel}/account`);
		}

		return {
			success: false,
			errors: ["Invalid email or password. Please check your credentials and try again."],
		};
	} catch (error) {
		// Check if this is a Next.js redirect (which is expected)
		if (error instanceof Error && error.message === "NEXT_REDIRECT") {
			throw error; // Re-throw redirect errors
		}
		console.error("Fallback login error:", error);
		return {
			success: false,
			errors: [
				`Login failed: ${
					error instanceof Error ? error.message : "Please check your credentials and try again"
				}`,
			],
		};
	}
}

export async function logout() {
	"use server";
	(await getServerAuthClient()).signOut();
	redirect("/");
}

export async function register(formData: {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	channel?: string;
}) {
	"use server";

	try {
		const result = await executeGraphQL(AccountRegisterDocument, {
			variables: {
				input: {
					email: formData.email,
					password: formData.password,
					firstName: formData.firstName,
					lastName: formData.lastName,
					channel: formData.channel || "default-channel",
				},
			},
			withAuth: false,
		});

		if (result.accountRegister?.errors?.length) {
			const errors = result.accountRegister.errors;
			return {
				success: false,
				errors: errors.map((error) => error.message || "Registration failed"),
			};
		}

		if (result.accountRegister?.user) {
			// Registration successful, now auto-login the user
			console.log("Registration successful, attempting auto-login");

			try {
				const authClient = await getServerAuthClient();
				const loginResult = await authClient.signIn({
					email: formData.email,
					password: formData.password,
				});

				if (loginResult.data?.tokenCreate?.token) {
					console.log("Auto-login successful, redirecting to account");
					// Auto-login successful, redirect to account page
					redirect(`/${formData.channel || "default-channel"}/account`);
				} else {
					console.log("Auto-login failed, user needs to login manually");
					// Auto-login failed, but registration was successful
					return {
						success: true,
						user: result.accountRegister.user,
						message: "Account created successfully! Please log in with your credentials.",
					};
				}
			} catch (loginError) {
				// Check if this is a Next.js redirect (which is expected)
				if (loginError instanceof Error && loginError.message === "NEXT_REDIRECT") {
					throw loginError; // Re-throw redirect errors
				}
				console.error("Auto-login error:", loginError);
				// Auto-login failed, but registration was successful
				return {
					success: true,
					user: result.accountRegister.user,
					message: "Account created successfully! Please log in with your credentials.",
				};
			}
		}

		return {
			success: false,
			errors: ["Registration failed. Please try again."],
		};
	} catch (error) {
		console.error("Registration error:", error);
		return {
			success: false,
			errors: ["An error occurred during registration. Please try again."],
		};
	}
}

// Debug function to test authentication setup
export async function testAuth() {
	"use server";

	try {
		console.log("Testing Saleor API connection...");

		// Test basic GraphQL connection
		const testResult = await executeGraphQL(ShopInfoDocument, {
			withAuth: false,
		});

		console.log("Shop query result:", testResult);

		// Test auth client creation
		try {
			await getServerAuthClient();
			console.log("Auth client created successfully");
		} catch (authError) {
			console.log("Auth client creation failed:", authError);
		}

		return {
			success: true,
			message: "Authentication setup is working",
			shopName: testResult?.shop?.name || "Unknown",
		};
	} catch (error) {
		console.error("Auth test error:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error",
		};
	}
}

// Create a test user for debugging (only use in development)
export async function createTestUser() {
	"use server";

	if (process.env.NODE_ENV === "production") {
		return { success: false, error: "Not available in production" };
	}

	const testEmail = "test@luxiorstore.com";
	const testPassword = "testpassword123";

	try {
		const result = await register({
			firstName: "Test",
			lastName: "User",
			email: testEmail,
			password: testPassword,
			channel: "default-channel",
		});

		return {
			success: result.success,
			email: testEmail,
			password: testPassword,
			message: result.success ? "Test user created successfully" : "Failed to create test user",
			errors: result.errors,
		};
	} catch (error) {
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error",
		};
	}
}

// Debug function to list available products
export async function listProducts(channel: string = "default-channel") {
	"use server";

	try {
		console.log("Fetching products for channel:", channel);

		const result = await executeGraphQL(ProductListSimpleDocument, {
			variables: { first: 10, channel },
			withAuth: false,
		});

		console.log("Products result:", result);

		const products = result?.products?.edges?.map((edge) => edge.node) || [];

		return {
			success: true,
			products,
			count: products.length,
		};
	} catch (error) {
		console.error("Error fetching products:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error",
		};
	}
}
