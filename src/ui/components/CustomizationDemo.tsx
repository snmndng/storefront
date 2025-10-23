import { Heart, ShoppingCart, Star, Eye, Gift, Zap } from "lucide-react";
import { Button, ButtonGroup, IconButton } from "./Button";
import { ThemeCustomizer } from "./ThemeCustomizer";

export function CustomizationDemo() {
	return (
		<div className="mx-auto max-w-4xl space-y-12 p-8">
			{/* Header */}
			<div className="text-center">
				<h1 className="brand-text mb-4 text-4xl font-bold">LuxiorMall Customization Demo</h1>
				<p className="text-lg text-gray-600">
					Explore all the enhanced customization features and components
				</p>
			</div>

			{/* Button Showcase */}
			<section className="space-y-6">
				<h2 className="text-2xl font-semibold">Enhanced Buttons</h2>

				<div className="space-y-4">
					<div className="flex flex-wrap gap-4">
						<Button variant="primary">Primary Button</Button>
						<Button variant="secondary">Secondary Button</Button>
						<Button variant="accent">Accent Button</Button>
						<Button variant="outline">Outline Button</Button>
						<Button variant="ghost">Ghost Button</Button>
					</div>

					<div className="flex flex-wrap gap-4">
						<Button variant="primary" size="sm">
							Small
						</Button>
						<Button variant="primary" size="md">
							Medium
						</Button>
						<Button variant="primary" size="lg">
							Large
						</Button>
						<Button variant="primary" size="xl">
							Extra Large
						</Button>
					</div>

					<div className="flex flex-wrap gap-4">
						<Button variant="primary" icon={<ShoppingCart className="h-4 w-4" />}>
							With Icon
						</Button>
						<Button variant="secondary" loading>
							Loading State
						</Button>
						<Button variant="accent" rounded>
							Rounded
						</Button>
						<Button variant="outline" fullWidth>
							Full Width Button
						</Button>
					</div>

					<ButtonGroup>
						<Button variant="outline">First</Button>
						<Button variant="outline">Second</Button>
						<Button variant="outline">Third</Button>
					</ButtonGroup>

					<div className="flex gap-2">
						<IconButton icon={<Heart className="h-4 w-4" />} variant="ghost" aria-label="Like" />
						<IconButton
							icon={<ShoppingCart className="h-4 w-4" />}
							variant="primary"
							aria-label="Add to cart"
						/>
						<IconButton icon={<Eye className="h-4 w-4" />} variant="secondary" aria-label="Quick view" />
					</div>
				</div>
			</section>

			{/* Card Showcase */}
			<section className="space-y-6">
				<h2 className="text-2xl font-semibold">Enhanced Cards</h2>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
					<div className="card p-6">
						<h3 className="mb-2 font-semibold">Standard Card</h3>
						<p className="mb-4 text-gray-600">
							This is a standard card with hover effects and smooth transitions.
						</p>
						<Button size="sm">Learn More</Button>
					</div>

					<div className="card-featured p-6">
						<h3 className="mb-2 font-semibold">Featured Card</h3>
						<p className="mb-4 text-white/90">
							This is a featured card with gradient background and special styling.
						</p>
						<Button variant="secondary" size="sm">
							Get Started
						</Button>
					</div>

					<div className="card-product relative overflow-hidden">
						<div className="absolute left-3 top-3 z-10 flex flex-col space-y-2">
							<span className="badge badge-primary flex items-center space-x-1">
								<Zap className="h-3 w-3" />
								<span>New</span>
							</span>
							<span className="badge badge-error">Sale</span>
						</div>

						<div className="absolute right-3 top-3 z-10">
							<IconButton
								icon={<Heart className="h-4 w-4" />}
								variant="secondary"
								size="sm"
								aria-label="Add to wishlist"
								className="bg-white/90 backdrop-blur-sm"
							/>
						</div>

						<div className="flex h-48 items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
							<Gift className="h-16 w-16 text-blue-500" />
						</div>

						<div className="p-4">
							<div className="mb-2 flex items-center space-x-1">
								{Array.from({ length: 5 }, (_, i) => (
									<Star
										key={i}
										className={`h-3 w-3 ${i < 4 ? "fill-current text-yellow-400" : "text-gray-300"}`}
									/>
								))}
								<span className="ml-1 text-xs text-gray-500">4.2 (89)</span>
							</div>

							<h3 className="mb-1 font-semibold">Sample Product</h3>
							<p className="mb-3 text-sm text-gray-500">Electronics</p>

							<div className="flex items-center justify-between">
								<div>
									<span className="text-lg font-bold">$29.99</span>
									<span className="ml-2 text-sm text-gray-500 line-through">$39.99</span>
								</div>
								<Button size="sm">Add to Cart</Button>
							</div>

							<div className="mt-2">
								<span className="text-xs text-green-600">In stock</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Badge Showcase */}
			<section className="space-y-6">
				<h2 className="text-2xl font-semibold">Badges & Indicators</h2>

				<div className="flex flex-wrap gap-4">
					<span className="badge badge-primary">Primary</span>
					<span className="badge badge-success">Success</span>
					<span className="badge badge-warning">Warning</span>
					<span className="badge badge-error">Error</span>
				</div>
			</section>

			{/* Animation Showcase */}
			<section className="space-y-6">
				<h2 className="text-2xl font-semibold">Animations</h2>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
					<div className="card animate-fade-in p-6">
						<h3 className="mb-2 font-semibold">Fade In</h3>
						<p className="text-gray-600">Smooth fade in animation</p>
					</div>

					<div className="card animate-slide-up p-6">
						<h3 className="mb-2 font-semibold">Slide Up</h3>
						<p className="text-gray-600">Slide up from bottom animation</p>
					</div>

					<div className="card animate-bounce-in p-6">
						<h3 className="mb-2 font-semibold">Bounce In</h3>
						<p className="text-gray-600">Bouncy entrance animation</p>
					</div>
				</div>
			</section>

			{/* Form Elements */}
			<section className="space-y-6">
				<h2 className="text-2xl font-semibold">Form Elements</h2>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					<div>
						<label className="mb-2 block text-sm font-medium">Standard Input</label>
						<input type="text" placeholder="Enter your text..." className="input-field" />
					</div>

					<div>
						<label className="mb-2 block text-sm font-medium">Search Input</label>
						<input type="search" placeholder="Search products..." className="input-search" />
					</div>
				</div>
			</section>

			{/* Theme Customizer */}
			<section className="space-y-6">
				<h2 className="text-2xl font-semibold">Interactive Theme Customizer</h2>
				<p className="text-gray-600">
					Click the palette icon in the bottom right to open the theme customizer and see live changes!
				</p>
			</section>

			{/* Add the Theme Customizer */}
			<ThemeCustomizer />
		</div>
	);
}
