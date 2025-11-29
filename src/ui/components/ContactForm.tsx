"use client";

import { useState } from "react";
import { FormInput, SubmitButton, FormSuccess } from "@/ui/components/forms";

export function ContactForm() {
        const [submitted, setSubmitted] = useState(false);
        const [errors, setErrors] = useState<{
                name?: string;
                email?: string;
                subject?: string;
                message?: string;
        }>({});

        const handleSubmit = (formData: FormData) => {
                const newErrors: typeof errors = {};
                const name = formData.get("name")?.toString() || "";
                const email = formData.get("email")?.toString() || "";
                const subject = formData.get("subject")?.toString() || "";
                const message = formData.get("message")?.toString() || "";

                if (!name.trim()) {
                        newErrors.name = "Name is required";
                }

                if (!email) {
                        newErrors.email = "Email is required";
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                        newErrors.email = "Please enter a valid email address";
                }

                if (!subject.trim()) {
                        newErrors.subject = "Subject is required";
                }

                if (!message.trim()) {
                        newErrors.message = "Message is required";
                } else if (message.length < 10) {
                        newErrors.message = "Message must be at least 10 characters";
                }

                setErrors(newErrors);

                if (Object.keys(newErrors).length === 0) {
                        setSubmitted(true);
                }
        };

        if (submitted) {
                return (
                        <div className="rounded-lg border border-neutral-200 bg-white p-8">
                                <FormSuccess
                                        message="Thank you for your message! We'll get back to you as soon as possible."
                                />
                        </div>
                );
        }

        return (
                <div className="rounded-lg border border-neutral-200 bg-white p-8">
                        <form action={handleSubmit} className="space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                        <FormInput
                                                label="Name"
                                                type="text"
                                                name="name"
                                                autoComplete="name"
                                                placeholder="Your name"
                                                required
                                                error={errors.name}
                                        />

                                        <FormInput
                                                label="Email"
                                                type="email"
                                                name="email"
                                                autoComplete="email"
                                                placeholder="you@example.com"
                                                required
                                                error={errors.email}
                                        />
                                </div>

                                <FormInput
                                        label="Subject"
                                        type="text"
                                        name="subject"
                                        placeholder="How can we help?"
                                        required
                                        error={errors.subject}
                                />

                                <div className="space-y-1">
                                        <label htmlFor="message" className="block text-sm font-medium text-neutral-700">
                                                Message <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                                id="message"
                                                name="message"
                                                rows={5}
                                                placeholder="Your message..."
                                                className={`w-full rounded-md border px-4 py-2.5 text-sm transition-colors focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 placeholder:text-neutral-400 ${
                                                        errors.message
                                                                ? "border-red-500 bg-red-50"
                                                                : "border-neutral-300 bg-white hover:border-neutral-400"
                                                }`}
                                        />
                                        {errors.message && (
                                                <p className="text-sm text-red-600">{errors.message}</p>
                                        )}
                                </div>

                                <SubmitButton>Send Message</SubmitButton>
                        </form>
                </div>
        );
}
