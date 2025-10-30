import { Logo } from "./Logo";
import { Nav } from "./nav/Nav";

export function Header({ channel }: { channel: string }) {
	return (
		<>
			{/* Promotional Banner */}
			<div className="bg-gradient-to-r from-amber-600 to-orange-600 py-2 text-center text-sm text-white">
				<div className="container mx-auto flex items-center justify-center space-x-2 px-4">
					<span>Free shipping within Nairobi for orders over KSh 5,000</span>
				</div>
			</div>

			<header className="sticky top-0 z-20 border-b border-gray-200/50 bg-white/95 shadow-sm backdrop-blur-md">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex h-16 items-center justify-between">
						{/* Left section - Logo */}
						<div className="flex items-center">
							<Logo />
						</div>

						{/* Right section - Navigation and Actions */}
						<Nav channel={channel} />
					</div>
				</div>
			</header>
		</>
	);
}
