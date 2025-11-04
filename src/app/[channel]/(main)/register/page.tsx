import { Suspense } from "react";
import { Loader } from "@/ui/atoms/Loader";
import { RegisterForm } from "@/ui/components/RegisterForm";

export const metadata = {
	title: "Create Account - Luxiorstore",
	description:
		"Join Luxiorstore and enjoy exclusive benefits, personalized recommendations, and luxury shopping experience.",
};

export default function RegisterPage() {
	return (
		<Suspense fallback={<Loader />}>
			<section className="mx-auto max-w-7xl p-8">
				<RegisterForm />
			</section>
		</Suspense>
	);
}
