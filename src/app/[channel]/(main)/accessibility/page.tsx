import { Suspense } from "react";
import { Eye, Ear, Hand, Heart, Keyboard } from "lucide-react";
import { Loader } from "@/ui/atoms/Loader";

export const metadata = {
	title: "Accessibility Statement - Luxiorstore",
	description:
		"Our commitment to making Luxiorstore accessible to everyone, including people with disabilities.",
};

export default function AccessibilityPage() {
	return (
		<Suspense fallback={<Loader />}>
			<div className="min-h-screen bg-gray-50">
				{/* Hero Section */}
				<section className="bg-gradient-to-r from-amber-600 to-orange-600 py-16 text-white">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="text-center">
							<Heart className="mx-auto mb-4 h-16 w-16" />
							<h1 className="text-4xl font-bold sm:text-5xl">Accessibility Statement</h1>
							<p className="mt-4 text-xl">Our commitment to inclusive shopping for everyone</p>
						</div>
					</div>
				</section>

				{/* Content */}
				<section className="py-16">
					<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
						<div className="rounded-lg bg-white p-8 shadow-sm">
							<div className="prose max-w-none">
								<h2 className="mb-6 text-2xl font-bold text-gray-900">Our Commitment</h2>
								<p className="mb-8 text-gray-700">
									At Luxiorstore, we are committed to ensuring that our website is accessible to everyone,
									including people with disabilities. We believe that everyone should have equal access to
									luxury shopping and information, regardless of their abilities.
								</p>

								<h2 className="mb-6 text-2xl font-bold text-gray-900">Accessibility Features</h2>

								<div className="mb-8 grid gap-6 md:grid-cols-2">
									<div className="rounded-lg border border-gray-200 p-6">
										<div className="mb-3 flex items-center space-x-3">
											<Eye className="h-6 w-6 text-blue-600" />
											<h3 className="text-lg font-semibold text-gray-900">Visual Accessibility</h3>
										</div>
										<ul className="space-y-2 text-sm text-gray-700">
											<li>• High contrast color schemes</li>
											<li>• Scalable text and images</li>
											<li>• Alternative text for images</li>
											<li>• Clear visual hierarchy</li>
											<li>• Screen reader compatibility</li>
										</ul>
									</div>

									<div className="rounded-lg border border-gray-200 p-6">
										<div className="mb-3 flex items-center space-x-3">
											<Keyboard className="h-6 w-6 text-green-600" />
											<h3 className="text-lg font-semibold text-gray-900">Keyboard Navigation</h3>
										</div>
										<ul className="space-y-2 text-sm text-gray-700">
											<li>• Full keyboard navigation support</li>
											<li>• Visible focus indicators</li>
											<li>• Logical tab order</li>
											<li>• Skip navigation links</li>
											<li>• Keyboard shortcuts</li>
										</ul>
									</div>

									<div className="rounded-lg border border-gray-200 p-6">
										<div className="mb-3 flex items-center space-x-3">
											<Ear className="h-6 w-6 text-purple-600" />
											<h3 className="text-lg font-semibold text-gray-900">Audio & Video</h3>
										</div>
										<ul className="space-y-2 text-sm text-gray-700">
											<li>• Captions for video content</li>
											<li>• Audio descriptions available</li>
											<li>• Volume controls</li>
											<li>• Auto-play disabled by default</li>
											<li>• Transcript availability</li>
										</ul>
									</div>

									<div className="rounded-lg border border-gray-200 p-6">
										<div className="mb-3 flex items-center space-x-3">
											<Hand className="h-6 w-6 text-amber-600" />
											<h3 className="text-lg font-semibold text-gray-900">Motor Accessibility</h3>
										</div>
										<ul className="space-y-2 text-sm text-gray-700">
											<li>• Large clickable areas</li>
											<li>• Drag and drop alternatives</li>
											<li>• Timeout extensions</li>
											<li>• Error prevention and correction</li>
											<li>• Voice control compatibility</li>
										</ul>
									</div>
								</div>

								<h2 className="mb-6 text-2xl font-bold text-gray-900">Standards Compliance</h2>
								<p className="mb-6 text-gray-700">
									Our website aims to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA
									standards. These guidelines explain how to make web content more accessible for people with
									disabilities.
								</p>

								<div className="mb-8 rounded-lg bg-blue-50 p-6">
									<h3 className="mb-3 text-lg font-semibold text-blue-800">WCAG 2.1 Principles</h3>
									<div className="grid gap-4 md:grid-cols-2">
										<div>
											<h4 className="font-medium text-blue-900">Perceivable</h4>
											<p className="text-sm text-blue-700">
												Information must be presentable in ways users can perceive
											</p>
										</div>
										<div>
											<h4 className="font-medium text-blue-900">Operable</h4>
											<p className="text-sm text-blue-700">
												Interface components must be operable by all users
											</p>
										</div>
										<div>
											<h4 className="font-medium text-blue-900">Understandable</h4>
											<p className="text-sm text-blue-700">
												Information and UI operation must be understandable
											</p>
										</div>
										<div>
											<h4 className="font-medium text-blue-900">Robust</h4>
											<p className="text-sm text-blue-700">
												Content must be robust enough for various assistive technologies
											</p>
										</div>
									</div>
								</div>

								<h2 className="mb-6 text-2xl font-bold text-gray-900">Assistive Technologies</h2>
								<p className="mb-4 text-gray-700">
									Our website is designed to work with assistive technologies, including:
								</p>
								<ul className="mb-6 list-inside list-disc space-y-2 text-gray-700">
									<li>Screen readers (JAWS, NVDA, VoiceOver, TalkBack)</li>
									<li>Voice recognition software (Dragon NaturallySpeaking)</li>
									<li>Switch navigation devices</li>
									<li>Eye-tracking systems</li>
									<li>Magnification software</li>
								</ul>

								<h2 className="mb-6 text-2xl font-bold text-gray-900">Browser and Device Support</h2>
								<p className="mb-4 text-gray-700">
									We test our website regularly on various browsers and devices to ensure compatibility:
								</p>
								<div className="mb-6 grid gap-4 md:grid-cols-2">
									<div>
										<h4 className="font-medium text-gray-900">Desktop Browsers</h4>
										<ul className="mt-2 text-sm text-gray-700">
											<li>• Chrome (latest 2 versions)</li>
											<li>• Firefox (latest 2 versions)</li>
											<li>• Safari (latest 2 versions)</li>
											<li>• Edge (latest 2 versions)</li>
										</ul>
									</div>
									<div>
										<h4 className="font-medium text-gray-900">Mobile Devices</h4>
										<ul className="mt-2 text-sm text-gray-700">
											<li>• iOS Safari (latest 2 versions)</li>
											<li>• Android Chrome (latest 2 versions)</li>
											<li>• Samsung Internet</li>
											<li>• Mobile accessibility features</li>
										</ul>
									</div>
								</div>

								<h2 className="mb-6 text-2xl font-bold text-gray-900">Ongoing Improvements</h2>
								<p className="mb-6 text-gray-700">
									We are continuously working to improve the accessibility of our website. Our efforts
									include:
								</p>
								<ul className="mb-6 list-inside list-disc space-y-2 text-gray-700">
									<li>Regular accessibility audits and testing</li>
									<li>User feedback integration</li>
									<li>Staff training on accessibility best practices</li>
									<li>Collaboration with accessibility experts</li>
									<li>Implementation of new accessibility technologies</li>
								</ul>

								<h2 className="mb-6 text-2xl font-bold text-gray-900">Known Issues</h2>
								<p className="mb-4 text-gray-700">
									We are aware of some accessibility challenges and are actively working to address them:
								</p>
								<ul className="mb-6 list-inside list-disc space-y-2 text-gray-700">
									<li>Some third-party payment widgets may have limited accessibility features</li>
									<li>Complex product image galleries are being enhanced for better screen reader support</li>
									<li>Live chat functionality is being improved for keyboard-only users</li>
								</ul>

								<h2 className="mb-6 text-2xl font-bold text-gray-900">Feedback and Support</h2>
								<p className="mb-4 text-gray-700">
									We welcome your feedback on the accessibility of our website. If you encounter any
									accessibility barriers or have suggestions for improvement, please contact us:
								</p>
								<div className="rounded-lg bg-gray-50 p-6">
									<h4 className="mb-3 font-medium text-gray-900">Accessibility Contact Information</h4>
									<ul className="space-y-2 text-gray-700">
										<li>
											<strong>Email:</strong> accessibility@luxiorstore.com
										</li>
										<li>
											<strong>Phone:</strong> +254 700 123 456
										</li>
										<li>
											<strong>Address:</strong> Westlands, Nairobi, Kenya
										</li>
									</ul>
									<p className="mt-4 text-sm text-gray-600">
										We aim to respond to accessibility feedback within 2 business days.
									</p>
								</div>

								<h2 className="mb-6 text-2xl font-bold text-gray-900">Alternative Access</h2>
								<p className="text-gray-700">
									If you are unable to access any content or functionality on our website, we offer
									alternative ways to obtain the same information and services:
								</p>
								<ul className="mt-4 list-inside list-disc space-y-2 text-gray-700">
									<li>Phone orders and customer service</li>
									<li>Email assistance for product information</li>
									<li>In-store shopping assistance</li>
									<li>Alternative format documents upon request</li>
								</ul>
							</div>
						</div>
					</div>
				</section>
			</div>
		</Suspense>
	);
}
