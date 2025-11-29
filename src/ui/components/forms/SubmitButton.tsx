"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import clsx from "clsx";

interface SubmitButtonProps {
	children: React.ReactNode;
	className?: string;
	loadingText?: string;
}

export function SubmitButton({ children, className, loadingText = "Please wait..." }: SubmitButtonProps) {
	const { pending } = useFormStatus();

	return (
		<button
			type="submit"
			disabled={pending}
			className={clsx(
				"w-full rounded-md bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white",
				"transition-colors hover:bg-neutral-800",
				"focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2",
				"disabled:cursor-not-allowed disabled:opacity-60",
				className
			)}
		>
			{pending ? (
				<span className="flex items-center justify-center gap-2">
					<Loader2 className="h-4 w-4 animate-spin" />
					{loadingText}
				</span>
			) : (
				children
			)}
		</button>
	);
}
