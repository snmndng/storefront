import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary" | "accent" | "outline" | "ghost" | "link";
	size?: "sm" | "md" | "lg" | "xl";
	loading?: boolean;
	icon?: React.ReactNode;
	iconPosition?: "left" | "right";
	fullWidth?: boolean;
	rounded?: boolean;
}

const buttonVariants = {
	primary: "btn-primary",
	secondary: "btn-secondary",
	accent: "btn-accent",
	outline: "btn-outline",
	ghost: "btn-ghost",
	link: "text-blue-600 hover:text-blue-800 underline-offset-4 hover:underline font-medium",
};

const buttonSizes = {
	sm: "btn-sm",
	md: "py-3 px-6",
	lg: "btn-lg",
	xl: "py-5 px-10 text-xl",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant = "primary",
			size = "md",
			loading = false,
			icon,
			iconPosition = "left",
			fullWidth = false,
			rounded = false,
			children,
			disabled,
			...props
		},
		ref,
	) => {
		const baseClasses =
			"inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed";

		const variantClass = buttonVariants[variant];
		const sizeClass = buttonSizes[size];

		return (
			<button
				className={cn(
					baseClasses,
					variantClass,
					sizeClass,
					fullWidth && "w-full",
					rounded && "rounded-full",
					className,
				)}
				ref={ref}
				disabled={disabled || loading}
				{...props}
			>
				{loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

				{icon && iconPosition === "left" && !loading && <span className="mr-2">{icon}</span>}

				{children}

				{icon && iconPosition === "right" && !loading && <span className="ml-2">{icon}</span>}
			</button>
		);
	},
);

Button.displayName = "Button";

// Button Group Component
export interface ButtonGroupProps {
	children: React.ReactNode;
	className?: string;
	orientation?: "horizontal" | "vertical";
	size?: ButtonProps["size"];
	variant?: ButtonProps["variant"];
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
	children,
	className,
	orientation = "horizontal",
	size,
	variant,
}) => {
	return (
		<div
			className={cn(
				"inline-flex",
				orientation === "horizontal" ? "flex-row" : "flex-col",
				"[&>button:not(:first-child)]:ml-0",
				"[&>button:not(:last-child)]:rounded-r-none",
				"[&>button:not(:first-child)]:rounded-l-none",
				"[&>button:not(:first-child)]:border-l-0",
				orientation === "vertical" && [
					"flex-col",
					"[&>button:not(:first-child)]:ml-0",
					"[&>button:not(:first-child)]:mt-0",
					"[&>button:not(:last-child)]:rounded-b-none",
					"[&>button:not(:first-child)]:rounded-t-none",
					"[&>button:not(:first-child)]:border-t-0",
				],
				className,
			)}
		>
			{React.Children.map(children, (child) => {
				if (React.isValidElement<ButtonProps>(child) && child.type === Button) {
					return React.cloneElement(child, {
						size: size || child.props.size,
						variant: variant || child.props.variant,
					} as Partial<ButtonProps>);
				}
				return child;
			})}
		</div>
	);
};

// Icon Button Component
export interface IconButtonProps extends Omit<ButtonProps, "children"> {
	icon: React.ReactNode;
	"aria-label": string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
	({ icon, className, size = "md", ...props }, ref) => {
		const sizeClasses = {
			sm: "p-2",
			md: "p-3",
			lg: "p-4",
			xl: "p-5",
		};

		return (
			<Button ref={ref} className={cn("rounded-full", sizeClasses[size], className)} size={size} {...props}>
				{icon}
			</Button>
		);
	},
);

IconButton.displayName = "IconButton";
