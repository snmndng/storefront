"use client";

import { type InputHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	error?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
	({ label, error, className, id, ...props }, ref) => {
		const inputId = id || props.name;
		return (
			<div className="space-y-1">
				<label htmlFor={inputId} className="block text-sm font-medium text-neutral-700">
					{label}
					{props.required && <span className="text-red-500 ml-0.5">*</span>}
				</label>
				<input
					ref={ref}
					id={inputId}
					className={clsx(
						"w-full rounded-md border px-4 py-2.5 text-sm transition-colors",
						"focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900",
						"placeholder:text-neutral-400",
						error
							? "border-red-500 bg-red-50"
							: "border-neutral-300 bg-white hover:border-neutral-400",
						className
					)}
					aria-invalid={error ? "true" : "false"}
					aria-describedby={error ? `${inputId}-error` : undefined}
					{...props}
				/>
				{error && (
					<p id={`${inputId}-error`} className="text-sm text-red-600" role="alert">
						{error}
					</p>
				)}
			</div>
		);
	}
);

FormInput.displayName = "FormInput";
