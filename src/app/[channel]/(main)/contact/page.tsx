import { type Metadata } from "next";
import { ContactForm } from "@/ui/components/ContactForm";

export const metadata: Metadata = {
        title: "Contact Us · Your Store",
        description: "Get in touch with our team",
};

export default async function ContactPage() {
        return (
                <div className="mx-auto max-w-7xl px-4 py-12">
                        <div className="mx-auto max-w-2xl">
                                <div className="text-center mb-10">
                                        <h1 className="text-3xl font-bold text-neutral-900">Contact Us</h1>
                                        <p className="mt-3 text-lg text-neutral-600">
                                                Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
                                        </p>
                                </div>

                                <ContactForm />

                                <div className="mt-12 grid gap-8 sm:grid-cols-2">
                                        <div className="rounded-lg border border-neutral-200 bg-white p-6">
                                                <h3 className="text-lg font-semibold text-neutral-900">Email Us</h3>
                                                <p className="mt-2 text-neutral-600">
                                                        For general inquiries, email us at:
                                                </p>
                                                <a
                                                        href="mailto:support@yourstore.com"
                                                        className="mt-2 inline-block text-neutral-900 hover:underline"
                                                >
                                                        support@yourstore.com
                                                </a>
                                        </div>

                                        <div className="rounded-lg border border-neutral-200 bg-white p-6">
                                                <h3 className="text-lg font-semibold text-neutral-900">Business Hours</h3>
                                                <p className="mt-2 text-neutral-600">
                                                        Monday - Friday: 9:00 AM - 6:00 PM EST
                                                </p>
                                                <p className="text-neutral-600">
                                                        Saturday - Sunday: Closed
                                                </p>
                                        </div>
                                </div>
                        </div>
                </div>
        );
}
