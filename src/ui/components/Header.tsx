import { Logo } from "./Logo";
import { Nav } from "./nav/Nav";

export function Header({ channel }: { channel: string }) {
	return (
		<>
			{/* Promotional Banner */}
			<div className="bg-gradient-to-r from-amber-600 to-orange-600 py-2 text-center text-xs text-white sm:text-sm">
				<div className="container mx-auto flex items-center justify-center space-x-2 px-2 sm:px-4">
					<span className="hidden sm:inline">
						⚡ Lightning-Fast Delivery: 1-3 Hours in Nairobi | Same-Day Nationwide
					</span>
					<span className="sm:hidden">⚡ Fast Delivery: 1-3hrs Nairobi | Same-Day Kenya</span>
				</div>
			</div>

			<header className="sticky top-0 z-20 border-b border-gray-200/50 bg-white/95 shadow-sm backdrop-blur-md">
				<div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
					<div className="flex h-16 items-center gap-2 lg:gap-4">
						{/* Logo */}
						<div className="flex flex-shrink-0 items-center">
							<Logo />
						</div>

						{/* Navigation with Search */}
						<div className="min-w-0 flex-1">
							<Nav channel={channel} />
						</div>
					</div>
				</div>
			</header>
		</>
	);
}
