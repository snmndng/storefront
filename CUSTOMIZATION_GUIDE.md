# LuxiorMall Customization Guide

This comprehensive guide will help you customize your LuxiorMall storefront to match your brand and create a unique shopping experience.

## 🚀 Quick Start

### 1. Environment Setup

1. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Update your `.env` file with your Saleor backend URL:

   ```env
   NEXT_PUBLIC_SALEOR_API_URL=https://your-saleor-instance.saleor.cloud/graphql/
   NEXT_PUBLIC_STOREFRONT_URL=http://localhost:3000
   SALEOR_APP_TOKEN=your-app-token-here
   ```

3. **Install Dependencies**: Run `pnpm install` to install all required packages.

4. **Test API Connection**: Run `node scripts/test-api.js` to verify your connection.

5. **Start Development**: Run `pnpm dev` to start the development server.

## 🎨 Brand Configuration System

### Central Brand Configuration

- **File Location**: `src/config/branding.ts`
- **Features**: Centralized configuration for all branding elements
- **Includes**: Colors, typography, layout settings, feature flags, and more

### Key Configuration Sections:

#### Company Information

```typescript
company: {
  name: "LuxiorMall",
  tagline: "Premium Shopping Experience",
  description: "Discover premium products...",
  contact: { email, phone }
}
```

#### Visual Branding

```typescript
branding: {
  colors: { primary, secondary, accent, success, warning, error },
  typography: { fontFamily, fontSize },
  borderRadius: { sm, md, lg, xl },
  shadows: { sm, md, lg, xl }
}
```

#### Layout Configuration

```typescript
layout: {
  header: { height, sticky, showSearch, showUserMenu },
  navigation: { style, showIcons, showDropdowns },
  footer: { style, showSocial, showNewsletter }
}
```

## 🎯 Enhanced Component System

### Advanced Button Component

- **File Location**: `src/ui/components/Button.tsx`
- **Variants**: primary, secondary, accent, outline, ghost, link
- **Sizes**: sm, md, lg, xl
- **Features**: Loading states, icons, full width, rounded corners
- **Components**: Button, ButtonGroup, IconButton

```tsx
<Button variant="primary" size="lg" icon={<ShoppingCart />} loading={isLoading}>
	Add to Cart
</Button>
```

### Enhanced Header Component

- **File Location**: `src/ui/components/Header.tsx`
- **Features**:
  - Promotional banner
  - Advanced search with autocomplete
  - Dropdown navigation menus
  - Notification system
  - Wishlist integration
  - Mobile-responsive design
  - Customizable layout options

### Enhanced Product Cards

- **File Location**: `src/ui/components/ProductElement.tsx`
- **Features**:
  - Product badges (New, Sale, Best Seller)
  - Star ratings and reviews
  - Quick view functionality
  - Wishlist integration
  - Stock indicators
  - Hover effects (zoom, lift, overlay)
  - Multiple image aspect ratios

## 🎨 Advanced Styling System

### CSS Custom Properties

- **File Location**: `src/app/globals.css`
- **Features**: CSS variables for easy theme switching
- **Variables**: Brand colors, gradients, typography, spacing, shadows

```css
:root {
	--brand-primary: #3b82f6;
	--brand-secondary: #8b5cf6;
	--gradient-primary: linear-gradient(135deg, var(--brand-primary), var(--brand-secondary));
}
```

### Enhanced CSS Classes

- **Button Styles**: .btn-primary, .btn-secondary, .btn-accent, .btn-outline, .btn-ghost
- **Card Styles**: .card, .card-featured, .card-product
- **Input Styles**: .input-field, .input-search
- **Brand Elements**: .brand-gradient, .brand-text
- **Navigation**: .nav-link with hover effects
- **Badges**: .badge with variants
- **Animations**: .animate-fade-in, .animate-slide-up, .animate-bounce-in

### Theme Variants

- **Default**: Blue and purple gradient theme
- **Dark**: Dark mode with adjusted colors
- **Minimal**: Clean black and white theme
- **Vibrant**: Colorful pink and purple theme

## 🛠️ Interactive Theme Customizer

### Theme Customizer Component

- **File Location**: `src/ui/components/ThemeCustomizer.tsx`
- **Features**:
  - Live theme preview
  - Color picker for custom colors
  - Theme preset selection
  - Layout option controls
  - Real-time component previews
  - Save/reset functionality

### Usage

```tsx
import { ThemeCustomizer } from "@/ui/components/ThemeCustomizer";

// Add to your layout or page
<ThemeCustomizer />;
```

## 🚀 Feature Configuration

### Feature Flags System

Control which features are enabled/disabled:

```typescript
features: {
  // E-commerce Features
  wishlist: true,
  compare: false,
  quickView: true,
  productReviews: true,

  // Search & Filter
  searchAutocomplete: true,
  advancedFilters: true,

  // Marketing
  promotionalBanners: true,
  discountBadges: true,
  countdownTimers: false,

  // Performance
  lazyLoading: true,
  imageOptimization: true
}
```

## 📱 Layout Customization

### Header Configuration

```typescript
header: {
  height: "4rem",
  sticky: true,
  showSearch: true,
  showUserMenu: true,
  showCart: true,
  showWishlist: true,
  backgroundColor: "white",
  borderBottom: true
}
```

### Navigation Styles

- **Horizontal**: Traditional horizontal navigation
- **Vertical**: Sidebar navigation
- **Mega**: Large dropdown menus with categories

### Footer Styles

- **Minimal**: Simple footer with basic links
- **Detailed**: Comprehensive footer with multiple sections
- **Newsletter**: Focus on newsletter signup

## 🎨 Component Styling Options

### Button Customization

```typescript
buttons: {
  defaultStyle: "rounded", // rounded, square, pill
  defaultSize: "md", // sm, md, lg
  showIcons: true,
  animateOnHover: true
}
```

### Card Customization

```typescript
cards: {
  style: "elevated", // flat, elevated, outlined
  borderRadius: "lg",
  showShadow: true,
  hoverEffect: "lift" // none, lift, glow, scale
}
```

### Product Card Options

```typescript
productCards: {
  showQuickView: true,
  showWishlist: true,
  showRating: true,
  showBadges: true,
  imageAspectRatio: "square", // square, portrait, landscape
  hoverEffect: "zoom" // none, zoom, overlay, lift
}
```

## 🔧 Utility Functions

### Enhanced Utils

- **File Location**: `src/lib/utils.ts`
- **Functions**:
  - `cn()`: Class name utility with clsx and tailwind-merge
  - `formatCurrency()`: Currency formatting
  - `formatDate()`: Date formatting
  - `truncateText()`: Text truncation
  - `debounce()` & `throttle()`: Performance utilities

## 📊 SEO & Analytics Configuration

### SEO Settings

```typescript
seo: {
  defaultTitle: "LuxiorMall - Premium Shopping Experience",
  titleTemplate: "%s | LuxiorMall",
  defaultDescription: "Discover premium products...",
  keywords: ["premium shopping", "luxury products"],
  ogImage: "/images/og-image.jpg"
}
```

### Analytics Integration

```typescript
analytics: {
  googleAnalytics: "",
  facebookPixel: "",
  hotjar: "",
  mixpanel: ""
}
```

## 🚀 Performance Optimization

### Image Optimization

```typescript
performance: {
  imageFormats: ["webp", "avif", "jpg"],
  imageSizes: [320, 640, 768, 1024, 1280, 1920],
  lazyLoadOffset: 100,
  cacheTimeout: 3600
}
```

## 🎯 Advanced Customization

### Creating Custom Themes

1. Define theme in `src/config/branding.ts`
2. Add to `themeVariants` object
3. Implement theme switching logic
4. Test across all components

### Adding New Components

1. Create component in `src/ui/components/`
2. Follow existing patterns and styling
3. Add to component exports
4. Document usage and props

### Custom Animations

Add custom animations to `src/app/globals.css`:

```css
@keyframes customAnimation {
	from {
		/* start state */
	}
	to {
		/* end state */
	}
}

.animate-custom {
	animation: customAnimation 0.5s ease-in-out;
}
```

## 🧪 Testing Your Customizations

### Development Testing

1. **Development Server**: `pnpm dev`
2. **Type Checking**: `pnpm type-check`
3. **Linting**: `pnpm lint`
4. **Build Test**: `pnpm build`

### Visual Testing

1. Test all theme variants
2. Check responsive design on different screen sizes
3. Verify accessibility with screen readers
4. Test performance with Lighthouse

### Browser Testing

- Chrome, Firefox, Safari, Edge
- Mobile browsers (iOS Safari, Chrome Mobile)
- Different viewport sizes

## 🚀 Deployment

### Production Build

```bash
pnpm build
pnpm start
```

### Environment Variables

Ensure all production environment variables are set:

- `NEXT_PUBLIC_SALEOR_API_URL`
- `NEXT_PUBLIC_STOREFRONT_URL`
- `SALEOR_APP_TOKEN`
- Analytics tokens (if used)

### Performance Monitoring

- Monitor Core Web Vitals
- Track conversion rates
- Monitor error rates
- Analyze user behavior

## 📚 Best Practices

### Design System

1. **Consistency**: Use the centralized branding configuration
2. **Accessibility**: Follow WCAG guidelines
3. **Performance**: Optimize images and lazy load content
4. **Mobile-First**: Design for mobile, enhance for desktop
5. **Progressive Enhancement**: Ensure basic functionality without JavaScript

### Code Organization

1. **Component Structure**: Keep components focused and reusable
2. **Styling**: Use the utility classes and CSS variables
3. **Configuration**: Centralize settings in the branding config
4. **Type Safety**: Use TypeScript for better development experience

### SEO Optimization

1. **Meta Tags**: Use proper title and description tags
2. **Structured Data**: Implement product schema markup
3. **Image Alt Text**: Provide descriptive alt text for images
4. **Page Speed**: Optimize for fast loading times

## 🆘 Troubleshooting

### Common Issues

1. **Styles Not Applying**: Check CSS variable names and Tailwind classes
2. **Components Not Rendering**: Verify imports and component structure
3. **Theme Not Switching**: Ensure CSS variables are properly updated
4. **Build Errors**: Check TypeScript types and imports

### Debug Tools

1. **React Developer Tools**: Inspect component state and props
2. **Browser DevTools**: Debug CSS and JavaScript
3. **Lighthouse**: Analyze performance and accessibility
4. **Next.js DevTools**: Monitor build and runtime performance

## 🎉 Advanced Features

### Dynamic Theme Switching

Implement user preference storage:

```typescript
// Save theme preference
localStorage.setItem("theme", "dark");

// Apply theme on load
useEffect(() => {
	const savedTheme = localStorage.getItem("theme");
	if (savedTheme) {
		applyTheme(savedTheme);
	}
}, []);
```

### Custom Component Variants

Extend existing components with new variants:

```typescript
// Add new button variant
const buttonVariants = {
	...existingVariants,
	gradient: "bg-gradient-to-r from-pink-500 to-purple-500 text-white",
};
```

### Integration with External Services

- Payment gateways
- Analytics platforms
- Marketing tools
- Customer support systems

## 🛍️ E-commerce Features

### Supported Features

- ✅ Product catalog with categories
- ✅ Product variants and attributes
- ✅ Shopping cart with wishlist
- ✅ User authentication
- ✅ Order management
- ✅ Payment integration (Stripe/Adyen)
- ✅ Multi-channel support
- ✅ SEO optimization
- ✅ Product reviews and ratings
- ✅ Advanced search and filtering
- ✅ Promotional banners and badges
- ✅ Mobile-responsive design

### New Enhanced Features

- 🆕 Interactive theme customizer
- 🆕 Advanced button components
- 🆕 Enhanced product cards with badges
- 🆕 Wishlist integration
- 🆕 Quick view functionality
- 🆕 Stock indicators
- 🆕 Rating and review system
- 🆕 Notification system
- 🆕 Promotional banners

## 🎯 Next Steps

1. **Configure your brand** using `src/config/branding.ts`
2. **Test the theme customizer** to see live changes
3. **Customize components** using the enhanced styling system
4. **Set up your Saleor backend** with products and collections
5. **Test the checkout flow** with your payment provider
6. **Add custom pages** for about, contact, etc.
7. **Configure SEO** metadata and structured data
8. **Set up analytics** (Google Analytics, etc.)
9. **Deploy and monitor** performance

---

## 🎨 Ready to Customize?

Your LuxiorMall storefront is now equipped with a comprehensive customization system. Start by exploring the theme customizer, then dive into the configuration files to create your unique brand experience.

Need help? Check the [Saleor documentation](https://docs.saleor.io/) or join their [Discord community](https://saleor.io/discord).

Happy customizing! 🚀✨
