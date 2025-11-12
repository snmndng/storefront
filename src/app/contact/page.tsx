import { redirect } from "next/navigation";

export default function ContactRedirect() {
	const defaultChannel = process.env.NEXT_PUBLIC_CHANNEL || "default-channel";
	redirect(`/${defaultChannel}/contact`);
}
