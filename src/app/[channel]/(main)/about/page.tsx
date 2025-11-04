import { brandConfig } from "@/config/branding";

export const metadata = {
	title: "About Us - Luxiorstore",
	description: "Learn about Luxiorstore's commitment to luxury, quality, and exceptional service in Kenya.",
};

export default function AboutPage() {
	const { company } = brandConfig;

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero Section */}
			<section className="bg-gradient-to-r from-amber-600 to-orange-600 py-20 text-white">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<h1 className="text-4xl font-bold sm:text-6xl">About {company.name}</h1>
						<p className="mt-6 text-xl">{company.tagline}</p>
					</div>
				</div>
			</section>

			{/* Main Content */}
			<section className="py-16">
				<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
					<div className="prose prose-lg mx-auto">
						<h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
						<p className="text-lg leading-relaxed text-gray-600">
							Founded in {company.founded}, {company.name} was born from a vision to redefine luxury shopping
							in Kenya. We believe that everyone deserves access to premium quality products that reflect
							their sophisticated taste and lifestyle.
						</p>

						<h3 className="mt-12 text-2xl font-semibold text-gray-900">Our Mission</h3>
						<p className="text-gray-600">
							To provide Kenyan customers with carefully curated luxury products that combine exceptional
							quality, timeless design, and unmatched service. We are committed to making luxury accessible
							while maintaining the highest standards of authenticity and customer satisfaction.
						</p>

						<h3 className="mt-12 text-2xl font-semibold text-gray-900">Why Choose {company.name}?</h3>
						<div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
							<div className="rounded-lg bg-white p-6 shadow-sm">
								<h4 className="mb-3 text-xl font-semibold text-gray-900">Premium Quality</h4>
								<p className="text-gray-600">
									Every product is carefully selected and authenticated to ensure you receive only the finest
									quality items.
								</p>
							</div>
							<div className="rounded-lg bg-white p-6 shadow-sm">
								<h4 className="mb-3 text-xl font-semibold text-gray-900">Local Expertise</h4>
								<p className="text-gray-600">
									Based in Nairobi, we understand the Kenyan market and provide personalized service tailored
									to local needs.
								</p>
							</div>
							<div className="rounded-lg bg-white p-6 shadow-sm">
								<h4 className="mb-3 text-xl font-semibold text-gray-900">⚡ Lightning-Fast Delivery</h4>
								<p className="text-gray-600">
									Experience Kenya&apos;s fastest luxury delivery: 1-3 hours within Nairobi, same-day delivery
									nationwide. Inspect and confirm your order before payment - quality service at the speed of
									light!
								</p>
							</div>
							<div className="rounded-lg bg-white p-6 shadow-sm">
								<h4 className="mb-3 text-xl font-semibold text-gray-900">Customer First</h4>
								<p className="text-gray-600">
									Our dedicated customer service team is available via phone, email, and WhatsApp to assist
									you.
								</p>
							</div>
						</div>

						<h3 className="mt-12 text-2xl font-semibold text-gray-900">Our Commitment</h3>
						<p className="text-gray-600">
							At {company.name}, we are committed to sustainability, ethical sourcing, and supporting local
							communities. We believe luxury should not come at the expense of our environment or society.
						</p>

						<div className="mt-12 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 p-8">
							<h3 className="mb-4 text-2xl font-semibold text-gray-900">Get in Touch</h3>
							<p className="mb-4 text-gray-600">
								Have questions or need assistance? We&apos;d love to hear from you.
							</p>
							<div className="space-y-2">
								<p>
									<strong>Email:</strong> {company.email}
								</p>
								<p>
									<strong>Phone:</strong> {company.phone}
								</p>
								<p>
									<strong>WhatsApp:</strong> {company.whatsapp}
								</p>
								<p>
									<strong>Address:</strong> {company.address.street}, {company.address.city}
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
