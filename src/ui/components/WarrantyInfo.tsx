import Link from "next/link";
import { Shield, Clock, FileText, Phone, CheckCircle, AlertCircle } from "lucide-react";

const warrantyCategories = [
	{
		category: "Luxury Watches",
		duration: "2-5 Years",
		coverage: "Movement, case, bracelet defects",
		exclusions: "Water damage, impact damage, battery",
		icon: <Clock className="h-8 w-8" />,
	},
	{
		category: "Jewelry",
		duration: "1-2 Years",
		coverage: "Manufacturing defects, stone setting",
		exclusions: "Normal wear, scratches, resizing damage",
		icon: <Shield className="h-8 w-8" />,
	},
	{
		category: "Handbags & Leather Goods",
		duration: "1 Year",
		coverage: "Stitching, hardware, zipper defects",
		exclusions: "Normal wear, stains, scratches",
		icon: <FileText className="h-8 w-8" />,
	},
	{
		category: "Electronics",
		duration: "1-3 Years",
		coverage: "Manufacturing defects, functionality",
		exclusions: "Physical damage, water damage, misuse",
		icon: <CheckCircle className="h-8 w-8" />,
	},
];

const warrantyProcess = [
	{
		step: 1,
		title: "Contact Support",
		description: "Reach out to our customer service team with your order details and issue description.",
	},
	{
		step: 2,
		title: "Provide Documentation",
		description: "Submit photos of the item, proof of purchase, and any relevant documentation.",
	},
	{
		step: 3,
		title: "Assessment",
		description: "Our team will assess your claim and determine if it's covered under warranty.",
	},
	{
		step: 4,
		title: "Resolution",
		description: "We'll repair, replace, or provide store credit based on the warranty terms.",
	},
];

export function WarrantyInfo() {
	return (
		<div className="space-y-12">
			{/* Warranty Overview */}
			<div className="rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 p-8">
				<div className="mb-4 flex items-center space-x-3">
					<Shield className="h-8 w-8 text-amber-600" />
					<h2 className="text-2xl font-bold text-gray-900">Warranty Protection</h2>
				</div>
				<p className="mb-6 text-gray-700">
					At Luxiorstore, we stand behind the quality of our luxury products. All items come with manufacturer
					warranties, and we offer additional protection for your peace of mind.
				</p>
				<div className="grid gap-4 md:grid-cols-3">
					<div className="rounded-lg bg-white p-4 shadow-sm">
						<h3 className="mb-2 font-semibold text-gray-900">Authentic Products</h3>
						<p className="text-sm text-gray-600">
							All items are 100% authentic with valid manufacturer warranties
						</p>
					</div>
					<div className="rounded-lg bg-white p-4 shadow-sm">
						<h3 className="mb-2 font-semibold text-gray-900">Extended Coverage</h3>
						<p className="text-sm text-gray-600">
							Optional extended warranty plans available for select items
						</p>
					</div>
					<div className="rounded-lg bg-white p-4 shadow-sm">
						<h3 className="mb-2 font-semibold text-gray-900">Expert Service</h3>
						<p className="text-sm text-gray-600">
							Authorized service centers and certified repair technicians
						</p>
					</div>
				</div>
			</div>

			{/* Warranty Categories */}
			<div>
				<h2 className="mb-8 text-2xl font-bold text-gray-900">Warranty Coverage by Category</h2>
				<div className="grid gap-6 md:grid-cols-2">
					{warrantyCategories.map((item, index) => (
						<div key={index} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
							<div className="mb-4 flex items-center space-x-3">
								<div className="text-amber-600">{item.icon}</div>
								<h3 className="text-lg font-semibold text-gray-900">{item.category}</h3>
							</div>
							<div className="space-y-3">
								<div>
									<span className="text-sm font-medium text-gray-700">Duration: </span>
									<span className="text-sm text-gray-600">{item.duration}</span>
								</div>
								<div>
									<span className="text-sm font-medium text-gray-700">Covers: </span>
									<span className="text-sm text-gray-600">{item.coverage}</span>
								</div>
								<div>
									<span className="text-sm font-medium text-gray-700">Excludes: </span>
									<span className="text-sm text-gray-600">{item.exclusions}</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Warranty Claim Process */}
			<div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
				<h2 className="mb-8 text-2xl font-bold text-gray-900">How to Make a Warranty Claim</h2>
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
					{warrantyProcess.map((step, index) => (
						<div key={index} className="text-center">
							<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 font-bold text-amber-600">
								{step.step}
							</div>
							<h3 className="mb-2 font-semibold text-gray-900">{step.title}</h3>
							<p className="text-sm text-gray-600">{step.description}</p>
						</div>
					))}
				</div>
			</div>

			{/* Important Information */}
			<div className="grid gap-6 lg:grid-cols-2">
				<div className="rounded-lg border border-green-200 bg-green-50 p-6">
					<div className="mb-4 flex items-center space-x-2">
						<CheckCircle className="h-6 w-6 text-green-600" />
						<h3 className="text-lg font-semibold text-green-800">What&apos;s Covered</h3>
					</div>
					<ul className="space-y-2 text-sm text-green-700">
						<li>• Manufacturing defects in materials and workmanship</li>
						<li>• Functional failures under normal use</li>
						<li>• Hardware malfunctions (zippers, clasps, etc.)</li>
						<li>• Movement issues in watches and timepieces</li>
						<li>• Stone setting problems in jewelry</li>
						<li>• Electronic component failures</li>
					</ul>
				</div>

				<div className="rounded-lg border border-red-200 bg-red-50 p-6">
					<div className="mb-4 flex items-center space-x-2">
						<AlertCircle className="h-6 w-6 text-red-600" />
						<h3 className="text-lg font-semibold text-red-800">What&apos;s Not Covered</h3>
					</div>
					<ul className="space-y-2 text-sm text-red-700">
						<li>• Normal wear and tear</li>
						<li>• Damage from accidents or misuse</li>
						<li>• Water damage (unless specified as water-resistant)</li>
						<li>• Scratches, dents, or cosmetic damage</li>
						<li>• Damage from unauthorized repairs</li>
						<li>• Battery replacement (for electronic items)</li>
					</ul>
				</div>
			</div>

			{/* Contact Information */}
			<div className="rounded-lg bg-gray-900 p-8 text-white">
				<div className="text-center">
					<h2 className="mb-4 text-2xl font-bold">Need Warranty Support?</h2>
					<p className="mb-6 text-gray-300">
						Our warranty specialists are here to help you with any questions or claims.
					</p>
					<div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
						<Link
							href="/contact"
							className="rounded-lg bg-amber-600 px-6 py-3 font-medium text-white transition-colors hover:bg-amber-700"
						>
							Submit Warranty Claim
						</Link>
						<a
							href="mailto:warranty@luxiorstore.co.ke"
							className="rounded-lg border border-gray-600 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800"
						>
							Email Warranty Team
						</a>
					</div>
					<div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-400">
						<Phone className="h-4 w-4" />
						<span>Warranty Hotline: +254 797 923 313</span>
					</div>
				</div>
			</div>

			{/* Extended Warranty */}
			<div className="rounded-lg border border-amber-200 bg-amber-50 p-6">
				<h3 className="mb-4 text-lg font-semibold text-amber-800">Extended Warranty Plans</h3>
				<p className="mb-4 text-amber-700">
					Protect your investment with our extended warranty plans, offering coverage beyond the manufacturer
					warranty period.
				</p>
				<div className="grid gap-4 md:grid-cols-3">
					<div className="rounded bg-white p-4">
						<h4 className="font-medium text-gray-900">1 Year Extension</h4>
						<p className="text-sm text-gray-600">Additional year of coverage</p>
						<p className="text-lg font-bold text-amber-600">5% of item value</p>
					</div>
					<div className="rounded bg-white p-4">
						<h4 className="font-medium text-gray-900">2 Year Extension</h4>
						<p className="text-sm text-gray-600">Two additional years</p>
						<p className="text-lg font-bold text-amber-600">8% of item value</p>
					</div>
					<div className="rounded bg-white p-4">
						<h4 className="font-medium text-gray-900">Premium Care</h4>
						<p className="text-sm text-gray-600">Includes accidental damage</p>
						<p className="text-lg font-bold text-amber-600">12% of item value</p>
					</div>
				</div>
			</div>
		</div>
	);
}
