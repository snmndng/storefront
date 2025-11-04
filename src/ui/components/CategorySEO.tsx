interface CategorySEOProps {
	category: {
		id: string;
		name: string;
		slug: string;
		description?: string | null;
		seoTitle?: string | null;
		seoDescription?: string | null;
		backgroundImage?: {
			url: string;
			alt?: string | null;
		} | null;
		products?: {
			totalCount?: number | null;
		} | null;
		parent?: {
			name: string;
			slug: string;
		} | null;
	};
}

export function CategorySEO({ category }: CategorySEOProps) {
	const baseUrl = "https://luxiorstore.co.ke";
	const categoryUrl = `${baseUrl}/categories/${category.slug}`;

	// Generate rich structured data for the category
	const structuredData = {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		name: category.seoTitle || category.name,
		description: category.seoDescription || category.description || `Shop ${category.name} at Luxiorstore`,
		url: categoryUrl,
		mainEntity: {
			"@type": "ItemList",
			name: category.name,
			description: category.description,
			numberOfItems: category.products?.totalCount || 0,
		},
		breadcrumb: {
			"@type": "BreadcrumbList",
			itemListElement: [
				{
					"@type": "ListItem",
					position: 1,
					name: "Home",
					item: baseUrl,
				},
				{
					"@type": "ListItem",
					position: 2,
					name: "Categories",
					item: `${baseUrl}/categories`,
				},
				...(category.parent
					? [
							{
								"@type": "ListItem",
								position: 3,
								name: category.parent.name,
								item: `${baseUrl}/categories/${category.parent.slug}`,
							},
						]
					: []),
				{
					"@type": "ListItem",
					position: category.parent ? 4 : 3,
					name: category.name,
					item: categoryUrl,
				},
			],
		},
		publisher: {
			"@type": "Organization",
			name: "Luxiorstore",
			url: baseUrl,
			logo: {
				"@type": "ImageObject",
				url: `${baseUrl}/logo.png`,
			},
		},
	};

	// Add image if available
	if (category.backgroundImage?.url) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const mainEntity = structuredData.mainEntity as any;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const backgroundImage = category.backgroundImage as any;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
		mainEntity.image = {
			"@type": "ImageObject",
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
			url: backgroundImage.url,
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
			description: backgroundImage.alt || category.name,
		};
	}

	return (
		<>
			{/* Structured Data */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
			/>

			{/* Additional Meta Tags */}
			<meta name="robots" content="index, follow" />
			<meta name="googlebot" content="index, follow" />

			{/* Open Graph Tags */}
			<meta property="og:type" content="website" />
			<meta property="og:site_name" content="Luxiorstore" />
			<meta property="og:locale" content="en_KE" />

			{/* Twitter Card Tags */}
			<meta name="twitter:site" content="@luxiorstore" />
			<meta name="twitter:creator" content="@luxiorstore" />

			{/* Category-specific meta tags */}
			<meta name="product-category" content={category.name} />
			<meta name="product-count" content={String(category.products?.totalCount || 0)} />

			{/* Canonical URL */}
			<link rel="canonical" href={categoryUrl} />

			{/* Alternate language versions (if applicable) */}
			<link rel="alternate" hrefLang="en-ke" href={categoryUrl} />
			<link rel="alternate" hrefLang="sw-ke" href={`${categoryUrl}?lang=sw`} />
		</>
	);
}

// Component for category-specific meta tags in the head
export function CategoryMetaTags({ category }: { category: CategorySEOProps["category"] }) {
	const title = category.seoTitle || `${category.name} - Luxury Collection | Luxiorstore`;
	const description =
		category.seoDescription ||
		category.description ||
		`Discover our premium ${category.name.toLowerCase()} collection at Luxiorstore. Shop authentic luxury products with exceptional quality and service in Kenya.`;

	return (
		<>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />

			{category.backgroundImage?.url && (
				<>
					<meta property="og:image" content={category.backgroundImage.url} />
					<meta property="og:image:alt" content={category.backgroundImage.alt || category.name} />
					<meta name="twitter:image" content={category.backgroundImage.url} />
					<meta name="twitter:image:alt" content={category.backgroundImage.alt || category.name} />
				</>
			)}
		</>
	);
}
