// Brand Configuration
// Customize your storefront's appearance and branding here

export const brandConfig = {
	// Company Information
	company: {
		name: "Luxiorstore",
		tagline: "Luxury Redefined",
		description: "Discover premium luxury products with exceptional quality and unmatched service",
		founded: "2025",
		email: "hello@luxiorstore.com",
		phone: "+254 797923313",
		address: {
			street: "123 Luxury Avenue",
			city: "Nairobi",
			state: "Ke",
			zip: "10001",
			country: "Kenya",
		},
	},

	// Visual Branding
	branding: {
		// Logo Configuration
		logo: {
			text: "Luxiorstore",
			showIcon: true,
			iconType: "shopping-bag", // shopping-bag, store, crown, diamond
			size: "lg", // sm, md, lg, xl
		},

		// Color Scheme
		colors: {
			primary: "#3b82f6", // Blue
			primaryDark: "#2563eb",
			secondary: "#8b5cf6", // Purple
			secondaryDark: "#7c3aed",
			accent: "#f59e0b", // Amber
			accentDark: "#d97706",
			success: "#10b981", // Emerald
			warning: "#f59e0b", // Amber
			error: "#ef4444", // Red
			neutral: "#6b7280", // Gray
		},

		// Typography
		typography: {
			fontFamily: {
				primary: "Inter",
				heading: "Poppins",
				mono: "JetBrains Mono",
			},
			fontSize: {
				xs: "0.75rem",
				sm: "0.875rem",
				base: "1rem",
				lg: "1.125rem",
				xl: "1.25rem",
				"2xl": "1.5rem",
				"3xl": "1.875rem",
				"4xl": "2.25rem",
			},
		},

		// Border Radius
		borderRadius: {
			sm: "0.5rem",
			md: "0.75rem",
			lg: "1rem",
			xl: "1.5rem",
			full: "9999px",
		},

		// Shadows
		shadows: {
			sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
			md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
			lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
			xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
		},
	},

	// Layout Configuration
	layout: {
		// Header
		header: {
			height: "4rem",
			sticky: true,
			showSearch: true,
			showUserMenu: true,
			showCart: true,
			showWishlist: true,
			backgroundColor: "white",
			borderBottom: true,
		},

		// Navigation
		navigation: {
			style: "horizontal", // horizontal, vertical, mega
			showIcons: true,
			showDropdowns: true,
			mobileCollapsible: true,
		},

		// Footer
		footer: {
			style: "detailed", // minimal, detailed, newsletter
			showSocial: true,
			showNewsletter: true,
			showLinks: true,
			backgroundColor: "dark",
		},

		// Sidebar
		sidebar: {
			position: "left", // left, right, none
			collapsible: true,
			showFilters: true,
			showCategories: true,
		},
	},

	// Component Styles
	components: {
		// Buttons
		buttons: {
			defaultStyle: "rounded", // rounded, square, pill
			defaultSize: "md", // sm, md, lg
			showIcons: true,
			animateOnHover: true,
		},

		// Cards
		cards: {
			style: "elevated", // flat, elevated, outlined
			borderRadius: "lg",
			showShadow: true,
			hoverEffect: "lift", // none, lift, glow, scale
		},

		// Product Cards
		productCards: {
			showQuickView: true,
			showWishlist: true,
			showCompare: false,
			showRating: true,
			showBadges: true,
			imageAspectRatio: "square", // square, portrait, landscape
			hoverEffect: "zoom", // none, zoom, overlay, lift
		},

		// Forms
		forms: {
			inputStyle: "rounded", // rounded, square
			showLabels: true,
			showPlaceholders: true,
			validationStyle: "inline", // inline, tooltip, modal
		},
	},

	// Feature Flags
	features: {
		// E-commerce Features
		wishlist: true,
		compare: false,
		quickView: true,
		productReviews: true,
		productRatings: true,
		relatedProducts: true,
		recentlyViewed: true,

		// Search & Filter
		searchAutocomplete: true,
		advancedFilters: true,
		sortOptions: true,
		priceRange: true,

		// User Features
		userAccounts: true,
		guestCheckout: true,
		socialLogin: false,
		newsletter: true,

		// Marketing
		promotionalBanners: true,
		discountBadges: true,
		countdownTimers: false,
		stockIndicators: true,

		// Performance
		lazyLoading: true,
		imageOptimization: true,
		caching: true,
	},

	// Social Media Links
	social: {
		facebook: "https://facebook.com/luxiorstore",
		twitter: "https://twitter.com/luxiorstore",
		instagram: "https://instagram.com/luxiorstore",
		linkedin: "https://linkedin.com/company/luxiorstore",
		youtube: "https://youtube.com/@luxiorstore",
		tiktok: "https://tiktok.com/@luxiorstore",
		pinterest: "https://pinterest.com/luxiorstore",
	},

	// SEO Configuration
	seo: {
		defaultTitle: "Luxiorstore - Luxury Redefined",
		titleTemplate: "%s | Luxiorstore",
		defaultDescription:
			"Discover premium luxury products with exceptional quality and unmatched service at Luxiorstore",
		keywords: ["premium shopping", "luxury products", "online store", "quality goods"],
		ogImage: "/images/og-image.jpg",
		twitterCard: "summary_large_image",
	},

	// Analytics & Tracking
	analytics: {
		googleAnalytics: "",
		facebookPixel: "",
		hotjar: "",
		mixpanel: "",
	},

	// Performance Settings
	performance: {
		imageFormats: ["webp", "avif", "jpg"],
		imageSizes: [320, 640, 768, 1024, 1280, 1920],
		lazyLoadOffset: 100,
		cacheTimeout: 3600, // seconds
	},
};

// Theme Variants
export const themeVariants = {
	default: {
		name: "Default",
		colors: brandConfig.branding.colors,
	},
	dark: {
		name: "Dark Mode",
		colors: {
			...brandConfig.branding.colors,
			primary: "#60a5fa",
			background: "#1f2937",
			surface: "#374151",
			text: "#f9fafb",
		},
	},
	minimal: {
		name: "Minimal",
		colors: {
			primary: "#000000",
			secondary: "#6b7280",
			accent: "#f59e0b",
			background: "#ffffff",
			surface: "#f9fafb",
			text: "#111827",
		},
	},
	vibrant: {
		name: "Vibrant",
		colors: {
			primary: "#ec4899",
			secondary: "#8b5cf6",
			accent: "#f59e0b",
			background: "#ffffff",
			surface: "#fef7ff",
			text: "#111827",
		},
	},
};

export type BrandConfig = typeof brandConfig;
export type ThemeVariant = keyof typeof themeVariants;
