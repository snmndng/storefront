"use client";

import { useFormStatus } from "react-dom";
import { LogOut, Loader2 } from "lucide-react";
import { logout } from "@/app/auth-actions";

function LogoutButtonInner() {
	const { pending } = useFormStatus();

	return (
		<button
			type="submit"
			disabled={pending}
			className="flex items-center gap-2 rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 disabled:opacity-50 transition-colors"
		>
			{pending ? (
				<Loader2 className="h-4 w-4 animate-spin" />
			) : (
				<LogOut className="h-4 w-4" />
			)}
			{pending ? "Signing out..." : "Sign out"}
		</button>
	);
}

export function LogoutButton() {
	return (
		<form action={logout}>
			<LogoutButtonInner />
		</form>
	);
}
