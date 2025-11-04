import { Suspense } from "react";
import { UserMenuContainer } from "./components/UserMenu/UserMenuContainer";
import { CartNavItem } from "./components/CartNavItem";
import { NavLinks } from "./components/NavLinks";
import { MobileMenu } from "./components/MobileMenu";
import { SearchBar } from "./components/SearchBar";
import { MobileSearchBar } from "./components/MobileSearchBar";

export const Nav = ({ channel }: { channel: string }) => {
	return (
		<nav className="flex w-full gap-2 lg:gap-6" aria-label="Main navigation">
			{/* Desktop Navigation Links */}
			<ul className="hidden gap-4 overflow-x-auto whitespace-nowrap md:flex lg:gap-8 lg:px-0">
				<NavLinks channel={channel} />
			</ul>

			{/* Desktop Search Bar */}
			<div className="mx-2 hidden max-w-md flex-1 md:flex lg:mx-4">
				<SearchBar channel={channel} />
			</div>

			{/* Right Section - User Menu and Cart */}
			<div className="flex items-center gap-2 lg:gap-4">
				{/* Mobile Search Button */}
				<MobileSearchBar channel={channel} />

				<Suspense fallback={<div className="w-8" />}>
					<UserMenuContainer />
				</Suspense>
				<Suspense fallback={<div className="w-6" />}>
					<CartNavItem channel={channel} />
				</Suspense>
			</div>

			{/* Mobile Menu */}
			<Suspense>
				<MobileMenu>
					<NavLinks channel={channel} />
				</MobileMenu>
			</Suspense>
		</nav>
	);
};
