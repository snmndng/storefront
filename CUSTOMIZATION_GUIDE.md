# Storefront Customization Guide

## 🚀 Quick Setup

### 1. Configure Your API Connection

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

3. Test your API connection:
   ```bash
   node scripts/test-api.js
   ```

### 2. Brand Customization

#### Update Your Brand Name
- Edit `src/ui/components/Logo.tsx` and change `"Your Brand"` to your actual brand name
- Update metadata in `src/app/[channel]/(main)/layout.tsx` and `src/app/[channel]/(main)/page.tsx`

#### Customize Logo
Replace the gradient circle in `Logo.tsx` with your actual logo:
```tsx
// Replace this div with your logo image
<div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
  <span className="text-white font-bold text-sm">{companyName.charAt(0)}</span>
</div>

// With something like:
<Image src="/your-logo.png" alt="Your Brand" width={32} height={32} />
```

#### Color Scheme
The design uses a blue-to-purple gradient theme. To customize:

1. **Primary Colors**: Update the gradient classes in:
   - `src/ui/components/Logo.tsx` (logo gradient)
   - `src/app/[channel]/(main)/page.tsx` (hero section)
   - `src/app/globals.css` (button styles)

2. **Common Color Replacements**:
   - `from-blue-600 to-purple-600` → `from-your-color-600 to-your-color-600`
   - `text-blue-600` → `text-your-color-600`
   - `hover:text-blue-600` → `hover:text-your-color-600`

### 3. Content Customization

#### Hero Section
Edit `src/app/[channel]/(main)/page.tsx` to customize:
- Main headline
- Subtitle text
- Call-to-action content

#### Footer
Update `src/ui/components/Footer.tsx`:
- Copyright text
- Company name
- Social links (add your own)

## 🎨 Design System

### CSS Classes Available
- `.btn-primary` - Primary button style
- `.btn-secondary` - Secondary button style  
- `.card` - Card container style
- `.input-field` - Form input style

### Component Structure
```
src/ui/components/
├── Header.tsx          # Top navigation
├── Footer.tsx          # Footer with links
├── Logo.tsx           # Brand logo component
├── ProductList.tsx    # Product grid
├── ProductElement.tsx # Individual product card
└── nav/              # Navigation components
```

## 🔧 Common Issues & Solutions

### API Connection Issues
1. **"No featured products found"** - Check your Saleor backend has a collection named "featured-products"
2. **GraphQL errors** - Verify your API URL is correct and accessible
3. **CORS issues** - Make sure your Saleor instance allows requests from your domain

### Styling Issues
1. **Styles not applying** - Run `pnpm run build` to regenerate Tailwind classes
2. **Images not loading** - Check your product images are properly uploaded to Saleor
3. **Layout breaks** - Verify all Tailwind classes are valid

### Performance
1. **Slow loading** - Enable image optimization in `next.config.js`
2. **Large bundle** - Use dynamic imports for heavy components
3. **SEO issues** - Update metadata in layout files

## 🚀 Deployment Checklist

Before deploying:
- [ ] Update `NEXT_PUBLIC_STOREFRONT_URL` in `.env`
- [ ] Test API connection with production URL
- [ ] Update brand name and metadata
- [ ] Add your logo and favicon
- [ ] Test checkout flow
- [ ] Configure payment providers (Stripe/Adyen)
- [ ] Set up proper error monitoring

## 📱 Mobile Optimization

The design is mobile-first and responsive. Key breakpoints:
- `sm:` - 640px and up
- `md:` - 768px and up  
- `lg:` - 1024px and up
- `xl:` - 1280px and up

## 🛍️ E-commerce Features

### Supported Features
- ✅ Product catalog with categories
- ✅ Product variants and attributes
- ✅ Shopping cart
- ✅ User authentication
- ✅ Order management
- ✅ Payment integration (Stripe/Adyen)
- ✅ Multi-channel support
- ✅ SEO optimization

### To Add Custom Features
1. Create GraphQL queries in `src/gql/`
2. Run `pnpm run generate` to generate types
3. Add components in `src/ui/components/`
4. Update routing in `src/app/`

## 🎯 Next Steps

1. **Set up your Saleor backend** with products and collections
2. **Customize the brand** elements (logo, colors, text)
3. **Test the checkout flow** with your payment provider
4. **Add custom pages** for about, contact, etc.
5. **Configure SEO** metadata and structured data
6. **Set up analytics** (Google Analytics, etc.)

Need help? Check the [Saleor documentation](https://docs.saleor.io/) or join their [Discord community](https://saleor.io/discord).