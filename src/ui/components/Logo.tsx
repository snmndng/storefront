"use client";

import { usePathname } from "next/navigation";
import { LinkWithChannel } from "../atoms/LinkWithChannel";

const companyName = "Your Brand"; // TODO: Replace with your actual brand name

export const Logo = () => {
	const pathname = usePathname();

	const logoContent = (
		<div className="flex items-center space-x-2">
			{/* You can replace this with your logo image */}
			<div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
				<span className="text-white font-bold text-sm">{companyName.charAt(0)}</span>
			</div>
			<span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
				{companyName}
			</span>
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
