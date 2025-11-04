"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqData = [
	{
		category: "Orders & Shipping",
		questions: [
			{
				question: "How fast is your delivery service?",
				answer:
					"Experience Kenya's fastest luxury delivery! We deliver within 1-3 hours in Nairobi, same-day delivery nationwide to major cities, and next-day delivery to all other areas. Quality service at the speed of light!",
			},
			{
				question: "What are your delivery options?",
				answer:
					"We offer lightning-fast delivery: 1-3 hours within Nairobi, same-day delivery nationwide to major cities. Free delivery on orders over KSh 5,000 in Nairobi, with competitive rates for all other areas.",
			},
			{
				question: "Can I track my order?",
				answer:
					"Absolutely! Once your order ships, you'll receive a tracking number via email and SMS. You can also track your order in your account dashboard.",
			},
			{
				question: "Do I pay before or after receiving my order?",
				answer:
					"You can choose! We offer 'Confirm & Pay' service where you inspect your order with our delivery person present and pay only when satisfied. This ensures 100% satisfaction with your luxury purchase.",
			},
		],
	},
	{
		category: "Returns & Exchanges",
		questions: [
			{
				question: "What is your return policy?",
				answer:
					"We offer a 30-day return policy for unworn items in original condition with tags attached. Luxury items may have specific return conditions.",
			},
			{
				question: "How do I initiate a return?",
				answer:
					"Contact our customer service team or visit the Returns page in your account. We'll provide you with a return label and instructions.",
			},
			{
				question: "Are there any items that can't be returned?",
				answer:
					"Personalized items, intimate apparel, and certain luxury goods may not be eligible for return. Check the product page for specific return policies.",
			},
		],
	},
	{
		category: "Products & Quality",
		questions: [
			{
				question: "Are your products authentic?",
				answer:
					"Yes, all our products are 100% authentic. We work directly with authorized distributors and brands to ensure authenticity.",
			},
			{
				question: "Do you offer warranties?",
				answer:
					"Yes, most of our luxury items come with manufacturer warranties. Extended warranty options are available for select products.",
			},
			{
				question: "How do I know my size?",
				answer:
					"Check our comprehensive Size Guide for detailed measurements. Our customer service team can also help you find the perfect fit.",
			},
		],
	},
	{
		category: "Account & Payment",
		questions: [
			{
				question: "What payment methods do you accept?",
				answer:
					"We accept M-Pesa, Visa, Mastercard, and bank transfers. All payments are processed securely through encrypted channels.",
			},
			{
				question: "Is my personal information secure?",
				answer:
					"Yes, we use industry-standard SSL encryption to protect your personal and payment information. We never share your data with third parties.",
			},
			{
				question: "Can I save my payment information?",
				answer:
					"Yes, you can securely save your payment methods in your account for faster checkout. All saved information is encrypted.",
			},
		],
	},
];

export function FAQSection() {
	const [openItems, setOpenItems] = useState<string[]>([]);

	const toggleItem = (id: string) => {
		setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
	};

	return (
		<div className="space-y-8">
			{faqData.map((category, categoryIndex) => (
				<div key={categoryIndex} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
					<h2 className="mb-6 text-2xl font-bold text-gray-900">{category.category}</h2>
					<div className="space-y-4">
						{category.questions.map((item, itemIndex) => {
							const itemId = `${categoryIndex}-${itemIndex}`;
							const isOpen = openItems.includes(itemId);

							return (
								<div key={itemIndex} className="border-b border-gray-100 last:border-b-0">
									<button
										onClick={() => toggleItem(itemId)}
										className="flex w-full items-center justify-between py-4 text-left transition-colors hover:text-amber-600"
									>
										<h3 className="font-medium text-gray-900">{item.question}</h3>
										{isOpen ? (
											<ChevronUp className="h-5 w-5 text-gray-500" />
										) : (
											<ChevronDown className="h-5 w-5 text-gray-500" />
										)}
									</button>
									{isOpen && (
										<div className="pb-4">
											<p className="text-gray-600">{item.answer}</p>
										</div>
									)}
								</div>
							);
						})}
					</div>
				</div>
			))}

			<div className="rounded-lg bg-amber-50 p-6 text-center">
				<h3 className="mb-2 text-lg font-semibold text-amber-800">Still have questions?</h3>
				<p className="mb-4 text-amber-700">
					Our customer service team is here to help you with any additional questions.
				</p>
				<div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
					<Link
						href="/contact"
						className="rounded-lg bg-amber-600 px-6 py-2 text-white transition-colors hover:bg-amber-700"
					>
						Contact Us
					</Link>
					<a
						href="https://wa.me/254797923313"
						target="_blank"
						rel="noopener noreferrer"
						className="rounded-lg border border-amber-600 px-6 py-2 text-amber-600 transition-colors hover:bg-amber-600 hover:text-white"
					>
						WhatsApp Support
					</a>
				</div>
			</div>
		</div>
	);
}
