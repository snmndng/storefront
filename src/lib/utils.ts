import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Format currency
export function formatCurrency(amount: number, currency: string = "USD"): string {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency,
	}).format(amount);
}

// Format money (alias for formatCurrency)
export function formatMoney(amount: number, currency: string = "USD"): string {
	return formatCurrency(amount, currency);
}

// Format money range
export function formatMoneyRange({
	start,
	stop,
}: {
	start?: { amount: number; currency: string } | null;
	stop?: { amount: number; currency: string } | null;
}): string {
	if (!start && !stop) return "Price not available";

	if (start && stop && start.amount !== stop.amount) {
		return `${formatMoney(start.amount, start.currency)} - ${formatMoney(stop.amount, stop.currency)}`;
	}

	const price = start || stop;
	return price ? formatMoney(price.amount, price.currency) : "Price not available";
}

// Get href for variant (placeholder function)
export function getHrefForVariant(productSlug: string, variantId: string): string {
	return `/products/${productSlug}?variant=${variantId}`;
}

// Format date
export function formatDate(date: Date | string): string {
	return new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(new Date(date));
}

// Truncate text
export function truncateText(text: string, maxLength: number): string {
	if (text.length <= maxLength) return text;
	return text.slice(0, maxLength) + "...";
}

// Generate random ID
export function generateId(): string {
	return Math.random().toString(36).substr(2, 9);
}

// Debounce function
export function debounce<T extends (...args: unknown[]) => unknown>(
	func: T,
	wait: number,
): (...args: Parameters<T>) => void {
	let timeout: NodeJS.Timeout;
	return (...args: Parameters<T>) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), wait);
	};
}

// Throttle function
export function throttle<T extends (...args: unknown[]) => unknown>(
	func: T,
	limit: number,
): (...args: Parameters<T>) => void {
	let inThrottle: boolean;
	return (...args: Parameters<T>) => {
		if (!inThrottle) {
			func(...args);
			inThrottle = true;
			setTimeout(() => (inThrottle = false), limit);
		}
	};
}
