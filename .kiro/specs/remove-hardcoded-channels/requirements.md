# Requirements Document

## Introduction

This feature removes all hardcoded channel references (like "luxior-main" and "default-channel") from the codebase and ensures the application uses dynamic channel routing based on the environment variable `NEXT_PUBLIC_CHANNEL`. This will make the application more flexible and prevent routing issues when the channel configuration changes.

## Glossary

- **Channel**: A Saleor concept representing a sales channel (e.g., different stores, regions, or brands)
- **Dynamic Routing**: Using the channel from environment variables or URL parameters instead of hardcoded values
- **Storefront**: The Next.js application that customers interact with
- **Redirect Component**: A Next.js page component that redirects users to the correct channel-prefixed URL

## Requirements

### Requirement 1

**User Story:** As a developer, I want all redirect components to use the dynamic channel from environment variables, so that the application works correctly regardless of which channel is configured.

#### Acceptance Criteria

1. WHEN a user accesses a non-channel-prefixed URL, THE Storefront SHALL redirect to the URL prefixed with the channel from NEXT_PUBLIC_CHANNEL environment variable
2. THE Storefront SHALL NOT contain any hardcoded channel values like "luxior-main" or "default-channel" in redirect components
3. WHERE a redirect component exists, THE Storefront SHALL use `process.env.NEXT_PUBLIC_CHANNEL` or a fallback value
4. THE Storefront SHALL apply this pattern consistently across all redirect pages including contact, warranty, products, about, login, and register pages

### Requirement 2

**User Story:** As a developer, I want the debug page to use dynamic channel values, so that testing works with any configured channel.

#### Acceptance Criteria

1. WHEN the debug page performs test operations, THE Storefront SHALL use the channel parameter from the URL or environment variable
2. THE Storefront SHALL NOT hardcode "default-channel" or "luxior-main" in test login functions
3. THE Storefront SHALL NOT hardcode "luxior-main" in the list products function
4. WHEN listing products for debugging, THE Storefront SHALL use the current channel from the page context

### Requirement 3

**User Story:** As a developer, I want authentication functions to use dynamic channel values, so that login and registration work correctly for any channel.

#### Acceptance Criteria

1. WHEN a user logs in, THE Storefront SHALL use the channel from the current URL context or environment variable
2. WHEN a user registers, THE Storefront SHALL redirect to the account page using the channel from the registration form context
3. THE Storefront SHALL NOT use hardcoded fallback values like "default-channel" in login or register functions
4. THE Storefront SHALL pass the channel parameter consistently through all authentication flows

### Requirement 4

**User Story:** As a developer, I want the channel layout to handle missing channels gracefully, so that the application doesn't break when channel data is unavailable.

#### Acceptance Criteria

1. WHEN generating static params fails, THE Storefront SHALL use the channel from NEXT_PUBLIC_CHANNEL environment variable as fallback
2. THE Storefront SHALL NOT hardcode "default-channel" as the fallback value
3. WHEN the channels list is empty, THE Storefront SHALL return the environment-configured channel
4. THE Storefront SHALL log warnings when falling back to the environment channel

### Requirement 5

**User Story:** As a developer, I want consistent channel handling across the entire application, so that there are no routing inconsistencies.

#### Acceptance Criteria

1. THE Storefront SHALL use a consistent pattern for retrieving the default channel value
2. THE Storefront SHALL define the default channel pattern as `process.env.NEXT_PUBLIC_CHANNEL || "default-channel"`
3. WHERE channel values are needed, THE Storefront SHALL use the environment variable first
4. THE Storefront SHALL document the channel configuration in environment files
