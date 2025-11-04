"use client";

import { useState } from "react";
import { SearchIcon, X } from "lucide-react";

export const MobileSearchBar = ({ channel }: { channel: string }) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [searchValue, setSearchValue] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchValue && searchValue.trim().length > 0) {
			window.location.href = `/${encodeURIComponent(channel)}/search?query=${encodeURIComponent(
				searchValue,
			)}`;
		}
	};

	const handleSearchClick = () => {
		setIsExpanded(true);
	};

	const handleClose = () => {
		setIsExpanded(false);
		setSearchValue("");
	};

	if (isExpanded) {
		return (
			<div className="mobile-search-overlay md:hidden">
				<div className="flex h-16 items-center border-b border-gray-200 bg-white px-4">
					<form onSubmit={handleSubmit} className="flex flex-1 items-center gap-3">
						<button
							type="button"
							onClick={handleClose}
							className="mobile-touch-target text-gray-500 hover:text-gray-700"
						>
							<X className="h-6 w-6" />
						</button>
						<input
							type="search"
							value={searchValue}
							onChange={(e) => setSearchValue(e.target.value)}
							placeholder="Search for products..."
							autoFocus
							className="search-input mobile-high-contrast h-12 flex-1 text-base"
						/>
						<button type="submit" className="mobile-touch-target mobile-search-button">
							<SearchIcon className="h-6 w-6" />
						</button>
					</form>
				</div>
			</div>
		);
	}

	return (
		<button
			onClick={handleSearchClick}
			className="mobile-touch-target text-gray-500 transition-colors hover:text-amber-600 md:hidden"
			aria-label="Search"
		>
			<SearchIcon className="h-6 w-6" />
		</button>
	);
};
