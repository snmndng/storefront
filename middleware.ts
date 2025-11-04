import { NextResponse ,type  NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const defaultChannel = process.env.NEXT_PUBLIC_CHANNEL || "default-channel";

	// Handle root redirect
	if (pathname === "/") {
		return NextResponse.redirect(new URL(`/${defaultChannel}`, request.url));
	}

	// Handle common incorrect URLs without channel
	const redirects: Record<string, string> = {
		"/contact": `/${defaultChannel}/contact`,
		"/contact/warranty": `/${defaultChannel}/warranty`,
		"/warranty": `/${defaultChannel}/warranty`,
		"/products": `/${defaultChannel}/products`,
		"/about": `/${defaultChannel}/about`,
		"/login": `/${defaultChannel}/login`,
		"/register": `/${defaultChannel}/register`,
		"/cart": `/${defaultChannel}/cart`,
		"/account": `/${defaultChannel}/account`,
		"/search": `/${defaultChannel}/search`,
		"/categories": `/${defaultChannel}/categories`,
		"/shipping": `/${defaultChannel}/shipping`,
		"/returns": `/${defaultChannel}/returns`,
		"/terms": `/${defaultChannel}/terms`,
		"/privacy": `/${defaultChannel}/privacy`,
		"/faq": `/${defaultChannel}/faq`,
		"/help": `/${defaultChannel}/help`,
		"/track-order": `/${defaultChannel}/track-order`,
		"/size-guide": `/${defaultChannel}/size-guide`,
		"/newsletter": `/${defaultChannel}/newsletter`,
	};

	if (redirects[pathname]) {
		return NextResponse.redirect(new URL(redirects[pathname], request.url));
	}

	// Handle old channel names (redirect any other channel to the default one)
	if (pathname.startsWith("/default-channel") && defaultChannel !== "default-channel") {
		const newPath = pathname.replace("/default-channel", `/${defaultChannel}`);
		return NextResponse.redirect(new URL(newPath, request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico).*)",
	],
};
