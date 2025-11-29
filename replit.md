# Saleor Next.js Storefront

## Project Overview
This is a Saleor Next.js e-commerce storefront application imported from GitHub. It's a full-featured e-commerce frontend that connects to a Saleor GraphQL backend API to provide a complete shopping experience.

**Technology Stack:**
- Next.js 15 with App Router
- React 19
- TypeScript
- TailwindCSS for styling
- GraphQL with urql client
- Saleor e-commerce platform integration
- Payment integrations: Stripe & Adyen

**Current State:** Fully configured and running in the Replit environment.

## Recent Changes (November 29, 2025)

### Initial Replit Setup
- Installed all dependencies using pnpm
- Configured Next.js to run on port 5000 with host 0.0.0.0 for Replit compatibility
- Set up environment variables for Saleor API connection
- Added `allowedDevOrigins` configuration to prevent cross-origin warnings
- Generated GraphQL types from Saleor API schema
- Configured deployment settings for autoscale deployment
- Created workflow for Next.js dev server

### Configuration Changes
- **next.config.js**: Added `allowedDevOrigins` to support Replit's proxy setup
- **Workflow**: Configured to run on port 5000 with proper hostname binding
- **Environment Variables**: Set up NEXT_PUBLIC_SALEOR_API_URL and related config

## Project Architecture

### Directory Structure
- `/src/app/`: Next.js App Router pages and layouts
- `/src/checkout/`: Checkout flow components and logic
- `/src/graphql/`: GraphQL query and mutation definitions
- `/src/hooks/`: React custom hooks
- `/src/lib/`: Utility functions and helpers
- `/src/ui/`: Reusable UI components
- `/public/`: Static assets

### Key Features
- Dynamic product catalog with categories
- Product variant selection
- Shopping cart functionality
- Single-page checkout process
- User authentication and account management
- Order management
- Payment processing (Stripe/Adyen)
- SEO optimization
- Responsive design

## Environment Variables

The following environment variables are required:

- `NEXT_PUBLIC_SALEOR_API_URL`: Full Saleor GraphQL endpoint URL (e.g., https://storefront1.saleor.cloud/graphql/)
- `NEXT_PUBLIC_STOREFRONT_URL`: Public URL of the storefront (set to http://localhost:3000 for development)
- `NEXT_PUBLIC_DEFAULT_CHANNEL`: Default Saleor channel slug (e.g., "default-channel")
- `SALEOR_APP_TOKEN`: Optional token for fetching channels

**Note:** Currently using the demo Saleor backend (https://storefront1.saleor.cloud/graphql/). To connect to your own Saleor instance, update the `NEXT_PUBLIC_SALEOR_API_URL` environment variable.

## Development

### Running the Application
The Next.js dev server is configured to run automatically via the workflow:
- Command: `pnpm dev -H 0.0.0.0 -p 5000`
- Port: 5000
- The application will be available through the Replit webview

### GraphQL Code Generation
After modifying GraphQL queries in `/src/graphql/`, regenerate types:
```bash
pnpm run generate
```

This runs automatically before `pnpm dev` via the `predev` script.

### Build & Production
To build for production:
```bash
pnpm build
```

To start the production server:
```bash
pnpm start -H 0.0.0.0 -p 5000
```

## Deployment

The deployment is configured for autoscale (serverless) deployment:
- Build command: `pnpm build`
- Run command: `pnpm start -H 0.0.0.0 -p 5000`
- The application will automatically scale based on traffic

## Connecting to Your Own Saleor Backend

To use your own Saleor instance:

1. Create a Saleor backend instance at [Saleor Cloud](https://cloud.saleor.io/) or run locally
2. Update the `NEXT_PUBLIC_SALEOR_API_URL` environment variable with your GraphQL endpoint
3. If using authentication, configure the `SALEOR_APP_TOKEN` as well
4. Restart the workflow to apply changes

## Payment Setup

The storefront supports payments via:
- **Stripe**: Configure using the Saleor Stripe App
- **Adyen**: Configure using the Saleor Adyen App

Install these apps in your Saleor Dashboard under the Apps section.

## User Preferences

None configured yet.

## Notes

- The project uses pnpm as the package manager (version 9.6.0+)
- GraphQL types are auto-generated - don't manually edit files in `/src/gql/`
- The application uses React Server Components for improved performance
- Next.js image optimization is configured to allow all remote patterns
