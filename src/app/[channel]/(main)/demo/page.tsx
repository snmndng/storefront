import { CustomizationDemo } from "@/ui/components/CustomizationDemo";

export const metadata = {
	title: "Customization Demo - LuxiorMall",
	description: "Explore all the enhanced customization features and components available in LuxiorMall.",
};

export default function DemoPage() {
	return (
		<div className="min-h-screen bg-gray-50 py-12">
			<CustomizationDemo />
		</div>
	);
}
