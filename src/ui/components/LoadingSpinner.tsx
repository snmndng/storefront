import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
	size?: "sm" | "md" | "lg";
	className?: string;
	text?: string;
}

export function LoadingSpinner({ size = "md", className, text }: LoadingSpinnerProps) {
	const sizeClasses = {
		sm: "h-4 w-4",
		md: "h-8 w-8",
		lg: "h-12 w-12",
	};

	return (
		<div className={cn("flex flex-col items-center justify-center space-y-2", className)}>
			<div
				className={cn(
					"animate-spin rounded-full border-2 border-gray-300 border-t-amber-600",
					sizeClasses[size],
				)}
			/>
			{text && <p className="animate-pulse text-sm text-gray-600">{text}</p>}
		</div>
	);
}

export function PageLoader() {
	return (
		<div className="flex min-h-screen items-center justify-center">
			<LoadingSpinner size="lg" text="Loading..." />
		</div>
	);
}

export function ProductCardSkeleton() {
	return (
		<div className="card-product animate-pulse">
			<div className="h-64 rounded-t-xl bg-gray-200"></div>
			<div className="space-y-3 p-4">
				<div className="h-4 w-3/4 rounded bg-gray-200"></div>
				<div className="h-3 w-1/2 rounded bg-gray-200"></div>
				<div className="flex items-center justify-between">
					<div className="h-6 w-1/3 rounded bg-gray-200"></div>
					<div className="h-8 w-20 rounded bg-gray-200"></div>
				</div>
			</div>
		</div>
	);
}
