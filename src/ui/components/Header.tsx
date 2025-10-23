import { Search, Menu, Heart, Bell, Gift } from "lucide-react";
import { Logo } from "./Logo";
import { Nav } from "./nav/Nav";
import { Button, IconButton } from "./Button";
import { brandConfig } from "@/config/branding";

export function Header({ channel }: { channel: string }) {
	const { header, navigation } = brandConfig.layout;
	const { showSearch, showWishlist } = header;

	return (
		<>
			{/* Promotional Banner */}
			<div className="bg-gradient-to-r from-blue-600 to-purple-600 py-2 text-center text-sm text-white">
				<div className="container mx-auto flex items-center justify-center space-x-2 px-4">
					<Gift className="h-4 w-4" />
					<span>Free shipping on orders over $100 | Use code: FREESHIP</span>
				</div>
			</div>

			<header
				className={`sticky top-0 z-20 transition-all duration-300 ${
					header.backgroundColor === "white"
						? "border-b border-gray-200/50 bg-white/95 shadow-sm backdrop-blur-md"
						: "border-b border-gray-700/50 bg-gray-900/95 text-white shadow-sm backdrop-blur-md"
				}`}
			>
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className={`flex items-center justify-between`} style={{ height: header.height }}>
						{/* Left section - Logo & Navigation */}
						<div className="flex items-center space-x-8">
							<Logo />

							{/* Desktop Navigation */}
							{navigation.style === "horizontal" && (
								<nav className="hidden items-center space-x-6 lg:flex">
									<a href="#" className="nav-link flex items-center space-x-1">
										<span>Home</span>
									</a>
									<div className="group relative">
										<a href="#" className="nav-link flex items-center space-x-1">
											<span>Shop</span>
											<svg
												className="h-4 w-4 transition-transform group-hover:rotate-180"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M19 9l-7 7-7-7"
												/>
											</svg>
										</a>
										{/* Dropdown Menu */}
										<div className="invisible absolute left-0 top-full mt-2 w-48 translate-y-2 transform rounded-lg border bg-white opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
											<div className="py-2">
												<a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
													All Products
												</a>
												<a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
													New Arrivals
												</a>
												<a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
													Best Sellers
												</a>
												<a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
													Sale Items
												</a>
											</div>
										</div>
									</div>
									<a href="#" className="nav-link">
										Categories
									</a>
									<a href="#" className="nav-link">
										Brands
									</a>
									<a href="#" className="nav-link">
										About
									</a>
									<a href="#" className="nav-link">
										Contact
									</a>
								</nav>
							)}
						</div>

						{/* Center section - Search (Desktop) */}
						{showSearch && (
							<div className="mx-8 hidden max-w-md flex-1 md:flex">
								<div className="relative w-full">
									<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
									<input type="text" placeholder="Search products..." className="input-search w-full" />
									<Button size="sm" className="absolute right-2 top-1/2 -translate-y-1/2 transform">
										Search
									</Button>
								</div>
							</div>
						)}

						{/* Right section - Actions */}
						<div className="flex items-center space-x-2">
							{/* Original Nav component for existing functionality */}
							<Nav channel={channel} />

							{/* Additional enhanced features */}
							{/* Notifications */}
							<div className="relative">
								<IconButton
									icon={<Bell className="h-5 w-5" />}
									variant="ghost"
									size="sm"
									aria-label="Notifications"
									className="relative"
								/>
								<span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500"></span>
							</div>

							{/* Search (Mobile) */}
							{showSearch && (
								<IconButton
									icon={<Search className="h-5 w-5" />}
									variant="ghost"
									size="sm"
									aria-label="Search"
									className="md:hidden"
								/>
							)}

							{/* Wishlist */}
							{showWishlist && (
								<div className="relative">
									<IconButton
										icon={<Heart className="h-5 w-5" />}
										variant="ghost"
										size="sm"
										aria-label="Wishlist"
										className="relative"
									/>
									<span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
										2
									</span>
								</div>
							)}

							{/* Mobile menu button */}
							<IconButton
								icon={<Menu className="h-5 w-5" />}
								variant="ghost"
								size="sm"
								aria-label="Menu"
								className="lg:hidden"
							/>
						</div>
					</div>

					{/* Mobile Search Bar */}
					{showSearch && (
						<div className="pb-4 md:hidden">
							<div className="relative">
								<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
								<input type="text" placeholder="Search products..." className="input-search w-full" />
							</div>
						</div>
					)}
				</div>
			</header>
		</>
	);
}
