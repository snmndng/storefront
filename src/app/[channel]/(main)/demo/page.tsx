import { notFound } from "next/navigation";
import { CustomizationDemo } from "@/ui/components/CustomizationDemo";

export const metadata = {
	title: "Customization Demo - Luxiorstore",
	description: "Explore all the enhanced customization features and components available in Luxiorstore.",
};

export default function DemoPage() {
	// Only allow demo page in development
	if (process.env.NODE_ENV === "production") {
		notFound();
	}

	return (
		<div className="min-h-screen bg-gray-50 py-12">
			<CustomizationDemo />
		</div>
	);
}
