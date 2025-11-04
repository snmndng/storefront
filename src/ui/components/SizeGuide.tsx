"use client";

import { useState } from "react";
import Link from "next/link";
import { Ruler, User, Shirt, Footprints } from "lucide-react";

interface ClothingSize {
	size: string;
	chest: string;
	waist: string;
	hips?: string;
	uk: string;
	us: string;
	eu: string;
}

interface ShoeSize {
	size: string;
	uk: string;
	us_women: string;
	us_men: string;
	cm: string;
}

const sizeCategories = [
	{
		id: "women-clothing",
		title: "Women's Clothing",
		icon: <Shirt className="h-6 w-6" />,
		type: "clothing" as const,
		sizes: [
			{ size: "XS", chest: "32-34", waist: "24-26", hips: "34-36", uk: "6", us: "2", eu: "34" },
			{ size: "S", chest: "34-36", waist: "26-28", hips: "36-38", uk: "8", us: "4", eu: "36" },
			{ size: "M", chest: "36-38", waist: "28-30", hips: "38-40", uk: "10", us: "6", eu: "38" },
			{ size: "L", chest: "38-40", waist: "30-32", hips: "40-42", uk: "12", us: "8", eu: "40" },
			{ size: "XL", chest: "40-42", waist: "32-34", hips: "42-44", uk: "14", us: "10", eu: "42" },
			{ size: "XXL", chest: "42-44", waist: "34-36", hips: "44-46", uk: "16", us: "12", eu: "44" },
		] as ClothingSize[],
	},
	{
		id: "men-clothing",
		title: "Men's Clothing",
		icon: <User className="h-6 w-6" />,
		type: "clothing" as const,
		sizes: [
			{ size: "S", chest: "36-38", waist: "28-30", uk: "36", us: "S", eu: "46" },
			{ size: "M", chest: "38-40", waist: "30-32", uk: "38", us: "M", eu: "48" },
			{ size: "L", chest: "40-42", waist: "32-34", uk: "40", us: "L", eu: "50" },
			{ size: "XL", chest: "42-44", waist: "34-36", uk: "42", us: "XL", eu: "52" },
			{ size: "XXL", chest: "44-46", waist: "36-38", uk: "44", us: "XXL", eu: "54" },
			{ size: "XXXL", chest: "46-48", waist: "38-40", uk: "46", us: "XXXL", eu: "56" },
		] as ClothingSize[],
	},
	{
		id: "shoes",
		title: "Shoes",
		icon: <Footprints className="h-6 w-6" />,
		type: "shoes" as const,
		sizes: [
			{ size: "35", uk: "2.5", us_women: "5", us_men: "3.5", cm: "22.5" },
			{ size: "36", uk: "3.5", us_women: "6", us_men: "4.5", cm: "23" },
			{ size: "37", uk: "4", us_women: "6.5", us_men: "5", cm: "23.5" },
			{ size: "38", uk: "5", us_women: "7.5", us_men: "6", cm: "24" },
			{ size: "39", uk: "6", us_women: "8.5", us_men: "7", cm: "24.5" },
			{ size: "40", uk: "6.5", us_women: "9", us_men: "7.5", cm: "25" },
			{ size: "41", uk: "7.5", us_women: "10", us_men: "8.5", cm: "25.5" },
			{ size: "42", uk: "8", us_women: "10.5", us_men: "9", cm: "26" },
			{ size: "43", uk: "9", us_women: "11.5", us_men: "10", cm: "26.5" },
			{ size: "44", uk: "9.5", us_women: "12", us_men: "10.5", cm: "27" },
			{ size: "45", uk: "10.5", us_women: "13", us_men: "11.5", cm: "27.5" },
		] as ShoeSize[],
	},
];

const measurementTips = [
	{
		title: "Chest/Bust",
		description: "Measure around the fullest part of your chest, keeping the tape horizontal.",
	},
	{
		title: "Waist",
		description: "Measure around your natural waistline, which is the narrowest part of your torso.",
	},
	{
		title: "Hips",
		description: "Measure around the fullest part of your hips, about 7-9 inches below your waist.",
	},
	{
		title: "Foot Length",
		description: "Stand on a piece of paper and mark your heel and longest toe. Measure the distance.",
	},
];

export function SizeGuide() {
	const [activeCategory, setActiveCategory] = useState("women-clothing");

	const activeData = sizeCategories.find((cat) => cat.id === activeCategory);

	return (
		<div className="space-y-8">
			{/* Category Tabs */}
			<div className="flex flex-wrap justify-center gap-4">
				{sizeCategories.map((category) => (
					<button
						key={category.id}
						onClick={() => setActiveCategory(category.id)}
						className={`flex items-center space-x-2 rounded-lg px-6 py-3 font-medium transition-colors ${
							activeCategory === category.id
								? "bg-amber-600 text-white"
								: "bg-gray-100 text-gray-700 hover:bg-gray-200"
						}`}
					>
						{category.icon}
						<span>{category.title}</span>
					</button>
				))}
			</div>

			{/* Size Chart */}
			{activeData && (
				<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
					<h2 className="mb-6 text-2xl font-bold text-gray-900">{activeData.title} Size Chart</h2>
					<div className="overflow-x-auto">
						<table className="w-full text-sm">
							<thead>
								<tr className="border-b border-gray-200 bg-gray-50">
									<th className="px-4 py-3 text-left font-medium text-gray-900">Size</th>
									{activeData.id === "shoes" ? (
										<>
											<th className="px-4 py-3 text-left font-medium text-gray-900">UK</th>
											<th className="px-4 py-3 text-left font-medium text-gray-900">US Women</th>
											<th className="px-4 py-3 text-left font-medium text-gray-900">US Men</th>
											<th className="px-4 py-3 text-left font-medium text-gray-900">Length (cm)</th>
										</>
									) : (
										<>
											<th className="px-4 py-3 text-left font-medium text-gray-900">Chest/Bust (inches)</th>
											<th className="px-4 py-3 text-left font-medium text-gray-900">Waist (inches)</th>
											{activeData.id === "women-clothing" && (
												<th className="px-4 py-3 text-left font-medium text-gray-900">Hips (inches)</th>
											)}
											<th className="px-4 py-3 text-left font-medium text-gray-900">UK</th>
											<th className="px-4 py-3 text-left font-medium text-gray-900">US</th>
											<th className="px-4 py-3 text-left font-medium text-gray-900">EU</th>
										</>
									)}
								</tr>
							</thead>
							<tbody>
								{activeData.sizes.map((size, index) => (
									<tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
										<td className="px-4 py-3 font-medium text-gray-900">{size.size}</td>
										{activeData.type === "shoes" ? (
											<>
												<td className="px-4 py-3 text-gray-600">{size.uk}</td>
												<td className="px-4 py-3 text-gray-600">{(size as ShoeSize).us_women}</td>
												<td className="px-4 py-3 text-gray-600">{(size as ShoeSize).us_men}</td>
												<td className="px-4 py-3 text-gray-600">{(size as ShoeSize).cm}</td>
											</>
										) : (
											<>
												<td className="px-4 py-3 text-gray-600">{(size as ClothingSize).chest}</td>
												<td className="px-4 py-3 text-gray-600">{(size as ClothingSize).waist}</td>
												{activeData.id === "women-clothing" && (
													<td className="px-4 py-3 text-gray-600">{(size as ClothingSize).hips}</td>
												)}
												<td className="px-4 py-3 text-gray-600">{size.uk}</td>
												<td className="px-4 py-3 text-gray-600">{(size as ClothingSize).us}</td>
												<td className="px-4 py-3 text-gray-600">{(size as ClothingSize).eu}</td>
											</>
										)}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}

			{/* Measurement Guide */}
			<div className="grid gap-6 lg:grid-cols-2">
				<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
					<div className="mb-4 flex items-center space-x-2">
						<Ruler className="h-6 w-6 text-amber-600" />
						<h3 className="text-xl font-bold text-gray-900">How to Measure</h3>
					</div>
					<div className="space-y-4">
						{measurementTips.map((tip, index) => (
							<div key={index}>
								<h4 className="font-medium text-gray-900">{tip.title}</h4>
								<p className="text-sm text-gray-600">{tip.description}</p>
							</div>
						))}
					</div>
				</div>

				<div className="rounded-lg bg-amber-50 p-6">
					<h3 className="mb-4 text-xl font-bold text-amber-800">Fit Tips</h3>
					<ul className="space-y-2 text-sm text-amber-700">
						<li>• Measure yourself wearing the undergarments you plan to wear with the item</li>
						<li>• Take measurements over bare skin or close-fitting clothing</li>
						<li>• Keep the measuring tape snug but not tight</li>
						<li>• For the most accurate fit, have someone else take your measurements</li>
						<li>• When in doubt between sizes, choose the larger size</li>
						<li>• Check individual product pages for specific fit notes</li>
					</ul>

					<div className="mt-6 rounded-lg bg-white p-4">
						<h4 className="mb-2 font-medium text-amber-800">Need Help?</h4>
						<p className="text-sm text-amber-700">
							Our customer service team can help you find the perfect fit.
							<Link href="/contact" className="ml-1 underline hover:no-underline">
								Contact us
							</Link>{" "}
							for personalized sizing assistance.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
