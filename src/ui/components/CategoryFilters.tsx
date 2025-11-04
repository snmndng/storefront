"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, X, Filter } from "lucide-react";

interface FilterOption {
	id: string;
	label: string;
	count?: number;
}

interface FilterGroup {
	id: string;
	label: string;
	options: FilterOption[];
	type: "checkbox" | "radio" | "range";
}

const filterGroups: FilterGroup[] = [
	{
		id: "price",
		label: "Price Range",
		type: "checkbox",
		options: [
			{ id: "under-5000", label: "Under KSh 5,000", count: 24 },
			{ id: "5000-15000", label: "KSh 5,000 - 15,000", count: 18 },
			{ id: "15000-50000", label: "KSh 15,000 - 50,000", count: 12 },
			{ id: "50000-100000", label: "KSh 50,000 - 100,000", count: 8 },
			{ id: "over-100000", label: "Over KSh 100,000", count: 5 },
		],
	},
	{
		id: "brand",
		label: "Brand",
		type: "checkbox",
		options: [
			{ id: "gucci", label: "Gucci", count: 15 },
			{ id: "prada", label: "Prada", count: 12 },
			{ id: "louis-vuitton", label: "Louis Vuitton", count: 10 },
			{ id: "chanel", label: "Chanel", count: 8 },
			{ id: "hermes", label: "Hermès", count: 6 },
			{ id: "versace", label: "Versace", count: 9 },
		],
	},
	{
		id: "size",
		label: "Size",
		type: "checkbox",
		options: [
			{ id: "xs", label: "XS", count: 5 },
			{ id: "s", label: "S", count: 12 },
			{ id: "m", label: "M", count: 18 },
			{ id: "l", label: "L", count: 15 },
			{ id: "xl", label: "XL", count: 8 },
			{ id: "xxl", label: "XXL", count: 4 },
		],
	},
	{
		id: "color",
		label: "Color",
		type: "checkbox",
		options: [
			{ id: "black", label: "Black", count: 25 },
			{ id: "white", label: "White", count: 18 },
			{ id: "brown", label: "Brown", count: 12 },
			{ id: "gold", label: "Gold", count: 10 },
			{ id: "silver", label: "Silver", count: 8 },
			{ id: "red", label: "Red", count: 6 },
		],
	},
	{
		id: "material",
		label: "Material",
		type: "checkbox",
		options: [
			{ id: "leather", label: "Leather", count: 20 },
			{ id: "silk", label: "Silk", count: 15 },
			{ id: "cotton", label: "Cotton", count: 12 },
			{ id: "wool", label: "Wool", count: 8 },
			{ id: "cashmere", label: "Cashmere", count: 6 },
			{ id: "gold-plated", label: "Gold Plated", count: 10 },
		],
	},
];

interface CategoryFiltersProps {
	isOpen: boolean;
	onToggle: () => void;
	onFiltersChange: (filters: Record<string, string[]>) => void;
}

export function CategoryFilters({ isOpen, onToggle, onFiltersChange }: CategoryFiltersProps) {
	const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
	const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(["price", "brand"]));

	const toggleGroup = (groupId: string) => {
		const newExpanded = new Set(expandedGroups);
		if (newExpanded.has(groupId)) {
			newExpanded.delete(groupId);
		} else {
			newExpanded.add(groupId);
		}
		setExpandedGroups(newExpanded);
	};

	const handleFilterChange = (groupId: string, optionId: string, checked: boolean) => {
		const newFilters = { ...selectedFilters };

		if (!newFilters[groupId]) {
			newFilters[groupId] = [];
		}

		if (checked) {
			newFilters[groupId] = [...newFilters[groupId], optionId];
		} else {
			newFilters[groupId] = newFilters[groupId].filter((id) => id !== optionId);
		}

		if (newFilters[groupId].length === 0) {
			delete newFilters[groupId];
		}

		setSelectedFilters(newFilters);
		onFiltersChange(newFilters);
	};

	const clearAllFilters = () => {
		setSelectedFilters({});
		onFiltersChange({});
	};

	const clearGroupFilters = (groupId: string) => {
		const newFilters = { ...selectedFilters };
		delete newFilters[groupId];
		setSelectedFilters(newFilters);
		onFiltersChange(newFilters);
	};

	const getTotalActiveFilters = () => {
		return Object.values(selectedFilters).reduce((total, filters) => total + filters.length, 0);
	};

	if (!isOpen) {
		return null;
	}

	return (
		<div className="w-full lg:w-80">
			<div className="rounded-lg border border-gray-200 bg-white shadow-sm">
				{/* Header */}
				<div className="flex items-center justify-between border-b border-gray-200 p-4">
					<div className="flex items-center space-x-2">
						<Filter className="h-5 w-5 text-gray-600" />
						<h3 className="font-semibold text-gray-900">Filters</h3>
						{getTotalActiveFilters() > 0 && (
							<span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
								{getTotalActiveFilters()}
							</span>
						)}
					</div>
					<div className="flex items-center space-x-2">
						{getTotalActiveFilters() > 0 && (
							<button onClick={clearAllFilters} className="text-sm text-amber-600 hover:text-amber-700">
								Clear All
							</button>
						)}
						<button
							onClick={onToggle}
							className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 lg:hidden"
						>
							<X className="h-5 w-5" />
						</button>
					</div>
				</div>

				{/* Filter Groups */}
				<div className="max-h-96 overflow-y-auto lg:max-h-none">
					{filterGroups.map((group) => (
						<div key={group.id} className="border-b border-gray-200 last:border-b-0">
							<button
								onClick={() => toggleGroup(group.id)}
								className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-50"
							>
								<span className="font-medium text-gray-900">{group.label}</span>
								<div className="flex items-center space-x-2">
									{selectedFilters[group.id]?.length > 0 && (
										<span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
											{selectedFilters[group.id].length}
										</span>
									)}
									{expandedGroups.has(group.id) ? (
										<ChevronUp className="h-4 w-4 text-gray-500" />
									) : (
										<ChevronDown className="h-4 w-4 text-gray-500" />
									)}
								</div>
							</button>

							{expandedGroups.has(group.id) && (
								<div className="px-4 pb-4">
									{selectedFilters[group.id]?.length > 0 && (
										<button
											onClick={() => clearGroupFilters(group.id)}
											className="mb-3 text-sm text-amber-600 hover:text-amber-700"
										>
											Clear {group.label}
										</button>
									)}
									<div className="space-y-2">
										{group.options.map((option) => (
											<label key={option.id} className="flex cursor-pointer items-center space-x-3">
												<input
													type="checkbox"
													checked={selectedFilters[group.id]?.includes(option.id) || false}
													onChange={(e) => handleFilterChange(group.id, option.id, e.target.checked)}
													className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
												/>
												<span className="flex-1 text-sm text-gray-700">{option.label}</span>
												{option.count && <span className="text-xs text-gray-500">({option.count})</span>}
											</label>
										))}
									</div>
								</div>
							)}
						</div>
					))}
				</div>

				{/* Apply Filters Button (Mobile) */}
				<div className="border-t border-gray-200 p-4 lg:hidden">
					<button
						onClick={onToggle}
						className="w-full rounded-lg bg-amber-600 py-3 font-medium text-white transition-colors hover:bg-amber-700"
					>
						Apply Filters ({getTotalActiveFilters()})
					</button>
				</div>
			</div>
		</div>
	);
}
