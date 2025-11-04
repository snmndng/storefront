"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, MessageCircle, CheckCircle, AlertCircle } from "lucide-react";
import { brandConfig } from "@/config/branding";

export default function ContactPage() {
	const { company } = brandConfig;
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [errors, setErrors] = useState<string[]>([]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setErrors([]);

		// Basic validation
		if (!formData.name || !formData.email || !formData.subject || !formData.message) {
			setErrors(["All fields are required"]);
			setIsLoading(false);
			return;
		}

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				setSuccess(true);
				setFormData({ name: "", email: "", subject: "", message: "" });
			} else {
				try {
					const errorData = (await response.json()) as { message?: string };
					setErrors([errorData.message || "Failed to send message. Please try again."]);
				} catch {
					setErrors(["Failed to send message. Please try again."]);
				}
			}
		} catch (error) {
			setErrors(["Unable to send message at the moment.", "Please try again later or contact us directly."]);
		} finally {
			setIsLoading(false);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero Section */}
			<section className="bg-gradient-to-r from-amber-600 to-orange-600 py-16 text-white">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<h1 className="text-4xl font-bold sm:text-5xl">Contact Us</h1>
						<p className="mt-4 text-xl">We&apos;re here to help with any questions or concerns</p>
					</div>
				</div>
			</section>

			{/* Contact Information & Form */}
			<section className="py-16">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
						{/* Contact Information */}
						<div>
							<h2 className="mb-8 text-3xl font-bold text-gray-900">Get in Touch</h2>
							<p className="mb-8 text-lg text-gray-600">
								Have questions about our products or need assistance with your order? Our customer service
								team is ready to help.
							</p>

							<div className="space-y-6">
								<div className="flex items-start space-x-4">
									<Mail className="mt-1 h-6 w-6 text-amber-600" />
									<div>
										<h3 className="font-semibold text-gray-900">Email</h3>
										<p className="text-gray-600">{company.email}</p>
										<p className="text-sm text-gray-500">We typically respond within 24 hours</p>
									</div>
								</div>

								<div className="flex items-start space-x-4">
									<Phone className="mt-1 h-6 w-6 text-amber-600" />
									<div>
										<h3 className="font-semibold text-gray-900">Phone</h3>
										<p className="text-gray-600">{company.phone}</p>
										<p className="text-sm text-gray-500">Monday - Friday, 9:00 AM - 6:00 PM EAT</p>
									</div>
								</div>

								<div className="flex items-start space-x-4">
									<MessageCircle className="mt-1 h-6 w-6 text-amber-600" />
									<div>
										<h3 className="font-semibold text-gray-900">WhatsApp</h3>
										<p className="text-gray-600">{company.whatsapp}</p>
										<p className="text-sm text-gray-500">Quick responses during business hours</p>
									</div>
								</div>

								<div className="flex items-start space-x-4">
									<MapPin className="mt-1 h-6 w-6 text-amber-600" />
									<div>
										<h3 className="font-semibold text-gray-900">Address</h3>
										<p className="text-gray-600">
											{company.address.street}
											<br />
											{company.address.city}, {company.address.county} {company.address.postalCode}
											<br />
											{company.address.country}
										</p>
									</div>
								</div>

								<div className="flex items-start space-x-4">
									<Clock className="mt-1 h-6 w-6 text-amber-600" />
									<div>
										<h3 className="font-semibold text-gray-900">Business Hours</h3>
										<div className="text-gray-600">
											<p>Monday - Friday: 9:00 AM - 6:00 PM</p>
											<p>Saturday: 10:00 AM - 4:00 PM</p>
											<p>Sunday: Closed</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Contact Form */}
						<div className="rounded-lg bg-white p-8 shadow-sm">
							<h2 className="mb-6 text-2xl font-bold text-gray-900">Send us a Message</h2>

							{/* Success Message */}
							{success && (
								<div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4">
									<div className="flex items-start">
										<CheckCircle className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
										<div>
											<p className="text-sm text-green-700">
												Thank you for your message! We&apos;ve received your inquiry and will get back to you
												within 24 hours.
											</p>
										</div>
									</div>
								</div>
							)}

							{/* Error Messages */}
							{errors.length > 0 && (
								<div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
									<div className="flex items-start">
										<AlertCircle className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
										<div>
											{errors.map((error, index) => (
												<p key={index} className="text-sm text-red-700">
													{error}
												</p>
											))}
										</div>
									</div>
								</div>
							)}

							<form onSubmit={handleSubmit} className="space-y-6">
								<div>
									<label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
										Full Name *
									</label>
									<input
										type="text"
										id="name"
										name="name"
										required
										value={formData.name}
										onChange={handleChange}
										className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-amber-500"
										placeholder="Your full name"
									/>
								</div>

								<div>
									<label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
										Email Address *
									</label>
									<input
										type="email"
										id="email"
										name="email"
										required
										value={formData.email}
										onChange={handleChange}
										className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-amber-500"
										placeholder="your.email@example.com"
									/>
								</div>

								<div>
									<label htmlFor="subject" className="mb-2 block text-sm font-medium text-gray-700">
										Subject *
									</label>
									<select
										id="subject"
										name="subject"
										required
										value={formData.subject}
										onChange={handleChange}
										className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-amber-500"
									>
										<option value="">Select a subject</option>
										<option value="general">General Inquiry</option>
										<option value="order">Order Support</option>
										<option value="product">Product Question</option>
										<option value="shipping">Shipping & Delivery</option>
										<option value="returns">Returns & Exchanges</option>
										<option value="technical">Technical Support</option>
									</select>
								</div>

								<div>
									<label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
										Message *
									</label>
									<textarea
										id="message"
										name="message"
										required
										rows={6}
										value={formData.message}
										onChange={handleChange}
										className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-amber-500"
										placeholder="Please describe how we can help you..."
									/>
								</div>

								<button
									type="submit"
									disabled={isLoading}
									className="w-full transform rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:from-amber-700 hover:to-orange-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
								>
									{isLoading ? "Sending..." : "Send Message"}
								</button>
							</form>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
