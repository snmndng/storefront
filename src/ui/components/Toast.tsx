"use client";

import { useState, useEffect, createContext, useContext, type ReactNode } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
	id: string;
	type: ToastType;
	title: string;
	message?: string;
	duration?: number;
}

interface ToastContextType {
	addToast: (toast: Omit<Toast, "id">) => void;
	removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error("useToast must be used within a ToastProvider");
	}
	return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
	const [toasts, setToasts] = useState<Toast[]>([]);

	const addToast = (toast: Omit<Toast, "id">) => {
		const id = Math.random().toString(36).substr(2, 9);
		const newToast = { ...toast, id };
		setToasts((prev) => [...prev, newToast]);

		// Auto remove after duration
		setTimeout(() => {
			removeToast(id);
		}, toast.duration || 5000);
	};

	const removeToast = (id: string) => {
		setToasts((prev) => prev.filter((toast) => toast.id !== id));
	};

	return (
		<ToastContext.Provider value={{ addToast, removeToast }}>
			{children}
			<ToastContainer toasts={toasts} removeToast={removeToast} />
		</ToastContext.Provider>
	);
}

function ToastContainer({ toasts, removeToast }: { toasts: Toast[]; removeToast: (id: string) => void }) {
	if (toasts.length === 0) return null;

	return (
		<div className="fixed right-4 top-4 z-50 space-y-2">
			{toasts.map((toast) => (
				<ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
			))}
		</div>
	);
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: () => void }) {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);
	}, []);

	const handleRemove = () => {
		setIsVisible(false);
		setTimeout(onRemove, 300);
	};

	const icons = {
		success: CheckCircle,
		error: AlertCircle,
		warning: AlertTriangle,
		info: Info,
	};

	const colors = {
		success: "bg-green-50 border-green-200 text-green-800",
		error: "bg-red-50 border-red-200 text-red-800",
		warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
		info: "bg-blue-50 border-blue-200 text-blue-800",
	};

	const iconColors = {
		success: "text-green-500",
		error: "text-red-500",
		warning: "text-yellow-500",
		info: "text-blue-500",
	};

	const Icon = icons[toast.type];

	return (
		<div
			className={cn(
				"flex max-w-sm items-start space-x-3 rounded-lg border p-4 shadow-lg transition-all duration-300",
				colors[toast.type],
				isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0",
			)}
		>
			<Icon className={cn("mt-0.5 h-5 w-5 flex-shrink-0", iconColors[toast.type])} />
			<div className="min-w-0 flex-1">
				<p className="text-sm font-medium">{toast.title}</p>
				{toast.message && <p className="mt-1 text-sm opacity-90">{toast.message}</p>}
			</div>
			<button
				onClick={handleRemove}
				className="ml-2 flex-shrink-0 opacity-60 transition-opacity hover:opacity-100"
			>
				<X className="h-4 w-4" />
			</button>
		</div>
	);
}
