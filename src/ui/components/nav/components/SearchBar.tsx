import { redirect } from "next/navigation";
import { SearchIcon } from "lucide-react";

export const SearchBar = ({ channel }: { channel: string }) => {
	async function onSubmit(formData: FormData) {
		"use server";
		const search = formData.get("search") as string;
		if (search && search.trim().length > 0) {
			redirect(`/${encodeURIComponent(channel)}/search?query=${encodeURIComponent(search)}`);
		}
	}

	return (
		<form action={onSubmit} className="group relative flex w-full items-center justify-items-center text-sm">
			<label className="w-full">
				<span className="sr-only">search for products</span>
				<input
					type="search"
					name="search"
					placeholder="Search products..."
					autoComplete="on"
					required
					className="search-input h-10 pr-10 text-sm sm:placeholder:text-gray-500"
				/>
			</label>
			<div className="absolute inset-y-0 right-0">
				<button
					type="submit"
					className="inline-flex aspect-square w-10 items-center justify-center text-gray-500 transition-colors hover:text-amber-600 focus:text-amber-600 group-invalid:pointer-events-none group-invalid:opacity-80"
				>
					<span className="sr-only">search</span>
					<SearchIcon aria-hidden className="h-5 w-5" />
				</button>
			</div>
		</form>
	);
};
