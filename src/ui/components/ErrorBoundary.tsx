"use client";

import { Component, type ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "./Button";

interface Props {
	children: ReactNode;
	fallback?: ReactNode;
}

interface State {
	hasError: boolean;
	error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: any) {
		console.error("Error caught by boundary:", error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<div className="flex min-h-screen items-center justify-center px-4">
					<div className="max-w-md text-center">
						<div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
							<AlertTriangle className="h-8 w-8 text-red-600" />
						</div>
						<h1 className="mb-4 text-2xl font-bold text-gray-900">Something went wrong</h1>
						<p className="mb-6 text-gray-600">
							We apologize for the inconvenience. Please try refreshing the page or contact support if the
							problem persists.
						</p>
						<div className="space-y-3">
							<Button
								onClick={() => window.location.reload()}
								variant="primary"
								className="w-full"
								icon={<RefreshCw className="h-4 w-4" />}
							>
								Refresh Page
							</Button>
							<Button onClick={() => window.history.back()} variant="outline" className="w-full">
								Go Back
							</Button>
						</div>
						{process.env.NODE_ENV === "development" && this.state.error && (
							<details className="mt-6 text-left">
								<summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
									Error Details (Development)
								</summary>
								<pre className="mt-2 overflow-auto rounded bg-gray-100 p-3 text-xs text-gray-800">
									{this.state.error.stack}
								</pre>
							</details>
						)}
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export function ErrorFallback({ error: _error, resetError }: { error: Error; resetError: () => void }) {
	return (
		<div className="flex min-h-[400px] items-center justify-center px-4">
			<div className="max-w-md text-center">
				<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
					<AlertTriangle className="h-6 w-6 text-red-600" />
				</div>
				<h2 className="mb-2 text-lg font-semibold text-gray-900">Oops! Something went wrong</h2>
				<p className="mb-4 text-sm text-gray-600">We encountered an error while loading this content.</p>
				<Button onClick={resetError} variant="primary" size="sm">
					Try Again
				</Button>
			</div>
		</div>
	);
}
