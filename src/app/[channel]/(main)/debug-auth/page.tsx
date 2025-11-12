"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { testAuth, createTestUser, login, listProducts } from "@/app/actions";

interface DebugResult {
	type: string;
	success: boolean;
	error?: string;
	message?: string;
	email?: string;
	password?: string;
	errors?: string[];
	[key: string]: unknown;
}

export default function DebugAuthPage() {
	const [results, setResults] = useState<DebugResult | null>(null);
	const [loading, setLoading] = useState(false);
	const { channel } = useParams<{ channel?: string }>();
	const defaultChannel = process.env.NEXT_PUBLIC_CHANNEL || "default-channel";
	const currentChannel = (channel as string) || defaultChannel;

	const handleTestAuth = async () => {
		setLoading(true);
		try {
			const result = await testAuth();
			setResults({ type: "auth-test", ...result });
		} catch (error) {
			setResults({ type: "auth-test", success: false, error: String(error) });
		}
		setLoading(false);
	};

	const handleCreateTestUser = async () => {
		setLoading(true);
		try {
			const result = await createTestUser();
			setResults({ type: "create-user", ...result });
		} catch (error) {
			setResults({ type: "create-user", success: false, error: String(error) });
		}
		setLoading(false);
	};

	const handleTestLogin = async () => {
		setLoading(true);
		try {
			const result = await login("test@luxiorstore.com", "testpassword123", currentChannel);
			setResults({ type: "test-login", success: result.success, errors: result.errors });
		} catch (error) {
			setResults({ type: "test-login", success: false, error: String(error) });
		}
		setLoading(false);
	};

	const handleListProducts = async () => {
		setLoading(true);
		try {
			const result = await listProducts(currentChannel);
			setResults({ type: "list-products", ...result });
		} catch (error) {
			setResults({ type: "list-products", success: false, error: String(error) });
		}
		setLoading(false);
	};

	if (process.env.NODE_ENV === "production") {
		return (
			<div className="p-8">
				<h1 className="text-2xl font-bold text-red-600">Debug page not available in production</h1>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-4xl p-8">
			<h1 className="mb-8 text-3xl font-bold">Authentication Debug</h1>

			<div className="space-y-4">
				<button
					onClick={handleTestAuth}
					disabled={loading}
					className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
				>
					Test Auth Setup
				</button>

				<button
					onClick={handleCreateTestUser}
					disabled={loading}
					className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
				>
					Create Test User
				</button>

				<button
					onClick={handleTestLogin}
					disabled={loading}
					className="rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 disabled:opacity-50"
				>
					Test Login
				</button>

				<button
					onClick={handleListProducts}
					disabled={loading}
					className="rounded bg-orange-600 px-4 py-2 text-white hover:bg-orange-700 disabled:opacity-50"
				>
					List Products
				</button>
			</div>

			{loading && <div className="mt-8 text-blue-600">Loading...</div>}

			{results && (
				<div className="mt-8 rounded bg-gray-100 p-4">
					<h2 className="mb-4 text-xl font-semibold">Results ({results.type})</h2>
					<pre className="whitespace-pre-wrap text-sm">{JSON.stringify(results, null, 2)}</pre>
				</div>
			)}

			<div className="mt-8 rounded bg-yellow-50 p-4">
				<h3 className="font-semibold text-yellow-800">Instructions:</h3>
				<ol className="mt-2 list-inside list-decimal text-sm text-yellow-700">
					<li>First, click &quot;Test Auth Setup&quot; to verify Saleor API connection</li>
					<li>Click &quot;List Products&quot; to see available products and their slugs</li>
					<li>Then, click &quot;Create Test User&quot; to create a test account</li>
					<li>Finally, click &quot;Test Login&quot; to test the login functionality</li>
					<li>Check the browser console for detailed logs</li>
				</ol>
			</div>
		</div>
	);
}
