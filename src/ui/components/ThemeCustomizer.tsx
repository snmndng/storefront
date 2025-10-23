"use client";

import { useState } from "react";
import { Palette, Settings, X, Check } from "lucide-react";
import { Button, IconButton } from "./Button";
import { brandConfig, themeVariants } from "@/config/branding";

export function ThemeCustomizer() {
	const [isOpen, setIsOpen] = useState(false);
	const [activeTheme, setActiveTheme] = useState("default");
	const [customColors, setCustomColors] = useState(brandConfig.branding.colors);

	const handleThemeChange = (themeName: string) => {
		setActiveTheme(themeName);
		const theme = themeVariants[themeName as keyof typeof themeVariants];
		if (theme) {
			// Apply theme colors to CSS variables
			const root = document.documentElement;
			Object.entries(theme.colors).forEach(([key, value]) => {
				root.style.setProperty(`--brand-${key}`, value);
			});
		}
	};

	const handleColorChange = (colorKey: string, value: string) => {
		setCustomColors((prev) => ({ ...prev, [colorKey]: value }));
		// Apply color change immediately
		document.documentElement.style.setProperty(`--brand-${colorKey}`, value);
	};

	if (!isOpen) {
		return (
			<div className="fixed bottom-6 right-6 z-50">
				<IconButton
					icon={<Palette className="h-5 w-5" />}
					onClick={() => setIsOpen(true)}
					aria-label="Open theme customizer"
					className="bg-blue-600 text-white shadow-lg hover:bg-blue-700"
				/>
			</div>
		);
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
			<div className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl">
				{/* Header */}
				<div className="flex items-center justify-between border-b p-6">
					<div className="flex items-center space-x-2">
						<Settings className="h-5 w-5 text-blue-600" />
						<h2 className="text-xl font-semibold">Theme Customizer</h2>
					</div>
					<IconButton
						icon={<X className="h-5 w-5" />}
						onClick={() => setIsOpen(false)}
						variant="ghost"
						size="sm"
						aria-label="Close customizer"
					/>
				</div>

				{/* Content */}
				<div className="max-h-[calc(90vh-120px)] overflow-y-auto p-6">
					{/* Theme Presets */}
					<div className="mb-8">
						<h3 className="mb-4 text-lg font-semibold">Theme Presets</h3>
						<div className="grid grid-cols-2 gap-4">
							{Object.entries(themeVariants).map(([key, theme]) => (
								<button
									key={key}
									onClick={() => handleThemeChange(key)}
									className={`rounded-lg border-2 p-4 transition-all duration-200 ${
										activeTheme === key
											? "border-blue-500 bg-blue-50"
											: "border-gray-200 hover:border-gray-300"
									}`}
								>
									<div className="mb-2 flex items-center justify-between">
										<span className="font-medium">{theme.name}</span>
										{activeTheme === key && <Check className="h-4 w-4 text-blue-600" />}
									</div>
									<div className="flex space-x-2">
										<div
											className="h-6 w-6 rounded-full border"
											style={{ backgroundColor: theme.colors.primary }}
										/>
										<div
											className="h-6 w-6 rounded-full border"
											style={{ backgroundColor: theme.colors.secondary }}
										/>
										<div
											className="h-6 w-6 rounded-full border"
											style={{ backgroundColor: theme.colors.accent }}
										/>
									</div>
								</button>
							))}
						</div>
					</div>

					{/* Custom Colors */}
					<div className="mb-8">
						<h3 className="mb-4 text-lg font-semibold">Custom Colors</h3>
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							{Object.entries(customColors).map(([key, value]) => (
								<div key={key} className="flex items-center space-x-3">
									<label className="flex-1 text-sm font-medium capitalize">
										{key.replace(/([A-Z])/g, " $1").trim()}
									</label>
									<div className="flex items-center space-x-2">
										<input
											type="color"
											value={value}
											onChange={(e) => handleColorChange(key, e.target.value)}
											className="h-10 w-10 cursor-pointer rounded border border-gray-300"
										/>
										<input
											type="text"
											value={value}
											onChange={(e) => handleColorChange(key, e.target.value)}
											className="w-20 rounded border border-gray-300 px-2 py-1 text-xs"
										/>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Component Previews */}
					<div className="mb-8">
						<h3 className="mb-4 text-lg font-semibold">Preview</h3>
						<div className="space-y-4 rounded-lg bg-gray-50 p-4">
							{/* Button Previews */}
							<div className="flex flex-wrap gap-2">
								<Button variant="primary" size="sm">
									Primary
								</Button>
								<Button variant="secondary" size="sm">
									Secondary
								</Button>
								<Button variant="accent" size="sm">
									Accent
								</Button>
								<Button variant="outline" size="sm">
									Outline
								</Button>
								<Button variant="ghost" size="sm">
									Ghost
								</Button>
							</div>

							{/* Card Preview */}
							<div className="card max-w-sm p-4">
								<h4 className="mb-2 font-semibold">Sample Product</h4>
								<p className="mb-3 text-sm text-gray-600">
									This is how your product cards will look with the selected theme.
								</p>
								<div className="flex items-center justify-between">
									<span className="font-bold">$29.99</span>
									<Button size="sm">Add to Cart</Button>
								</div>
							</div>
						</div>
					</div>

					{/* Layout Options */}
					<div className="mb-8">
						<h3 className="mb-4 text-lg font-semibold">Layout Options</h3>
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<label className="font-medium">Rounded Corners</label>
								<select className="rounded border border-gray-300 px-3 py-1">
									<option value="sm">Small</option>
									<option value="md">Medium</option>
									<option value="lg">Large</option>
									<option value="xl">Extra Large</option>
								</select>
							</div>
							<div className="flex items-center justify-between">
								<label className="font-medium">Button Style</label>
								<select className="rounded border border-gray-300 px-3 py-1">
									<option value="rounded">Rounded</option>
									<option value="square">Square</option>
									<option value="pill">Pill</option>
								</select>
							</div>
							<div className="flex items-center justify-between">
								<label className="font-medium">Card Shadow</label>
								<select className="rounded border border-gray-300 px-3 py-1">
									<option value="sm">Small</option>
									<option value="md">Medium</option>
									<option value="lg">Large</option>
									<option value="xl">Extra Large</option>
								</select>
							</div>
						</div>
					</div>
				</div>

				{/* Footer */}
				<div className="flex items-center justify-between border-t bg-gray-50 p-6">
					<Button variant="ghost" onClick={() => setIsOpen(false)}>
						Cancel
					</Button>
					<div className="flex space-x-2">
						<Button variant="outline" size="sm">
							Reset to Default
						</Button>
						<Button variant="primary" size="sm">
							Save Changes
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
