"use client";

import { AlertCircle } from "lucide-react";
import clsx from "clsx";

interface FormErrorProps {
	errors: Array<{ message: string | null }>;
	className?: string;
}

export function FormError({ errors, className }: FormErrorProps) {
	const messages = errors.filter((e) => e.message).map((e) => e.message);

	if (messages.length === 0) return null;

	return (
		<div
			className={clsx(
				"rounded-md border border-red-200 bg-red-50 p-4",
				className
			)}
			role="alert"
		>
			<div className="flex gap-3">
				<AlertCircle className="h-5 w-5 flex-shrink-0 text-red-600" />
				<div className="flex-1">
					{messages.length === 1 ? (
						<p className="text-sm text-red-700">{messages[0]}</p>
					) : (
						<ul className="list-disc pl-4 text-sm text-red-700 space-y-1">
							{messages.map((message, index) => (
								<li key={index}>{message}</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</div>
	);
}
