"use client";

import { usePathname } from "next/navigation";
import { LinkWithChannel } from "../atoms/LinkWithChannel";
import { brandConfig } from "@/config/branding";

export const Logo = () => {
	const pathname = usePathname();
	const { company } = brandConfig;

	const logoContent = (
		<div className="flex items-center space-x-3">
			{/* Luxiorstore Logo Icon */}
			<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 shadow-lg">
				<span className="text-lg font-bold tracking-wider text-white">L</span>
			</div>
			<div className="flex flex-col">
				<span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
					{company.name}
				</span>
				<span className="-mt-1 text-xs font-medium tracking-wide text-gray-500">{company.tagline}</span>
			</div>
		</div>
	);

	if (pathname === "/") {
		return (
			<h1 className="flex items-center" aria-label="homepage">
				{logoContent}
			</h1>
		);
	}
	return (
		<LinkWithChannel aria-label="homepage" href="/" className="flex items-center">
			{logoContent}
		</LinkWithChannel>
	);
};
