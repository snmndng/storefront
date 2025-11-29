"use client";

import { CheckCircle } from "lucide-react";
import clsx from "clsx";

interface FormSuccessProps {
	message: string;
	className?: string;
}

export function FormSuccess({ message, className }: FormSuccessProps) {
	return (
		<div
			className={clsx(
				"rounded-md border border-green-200 bg-green-50 p-4",
				className
			)}
			role="status"
		>
			<div className="flex gap-3">
				<CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600" />
				<p className="text-sm text-green-700">{message}</p>
			</div>
		</div>
	);
}
