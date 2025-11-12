# Design Document

## Overview

This design removes all hardcoded channel references from the codebase and implements a consistent pattern for dynamic channel routing. The solution ensures that all redirects, authentication flows, and debug functions use the channel from environment variables or URL context, making the application flexible and maintainable.

## Architecture

### Current State

- Multiple files contain hardcoded "luxior-main" redirects
- Authentication functions default to "default-channel"
- Debug page uses hardcoded channel values
- Inconsistent fallback patterns across the codebase

### Target State

- All redirect components use `process.env.NEXT_PUBLIC_CHANNEL` with consistent fallback
- Authentication functions receive channel from context
- Debug page uses channel from URL parameters
- Single source of truth for channel configuration

## Components and Interfaces

### 1. Redirect Components Pattern

**Location:** `src/app/*/page.tsx`

**Current Pattern:**

```typescript
redirect("/luxior-main/products");
```

**New Pattern:**

```typescript
const defaultChannel = process.env.NEXT_PUBLIC_CHANNEL || "default-channel";
redirect(`/${defaultChannel}/products`);
```

**Files to Update:**

- `src/app/products/page.tsx`
- `src/app/about/page.tsx`
- `src/app/login/page.tsx`
- `src/app/register/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/contact/warranty/page.tsx`

### 2. Authentication Functions

**Location:** `src/app/actions.ts`

**Changes:**

1. **Login Function:**
   - Remove hardcoded "default-channel" default parameter
   - Make channel parameter required or use environment variable as default
2. **Register Function:**

   - Update redirect to use channel from form data or environment variable
   - Remove hardcoded "default-channel" fallback

3. **Test Functions:**
   - Update `testLogin` to use environment variable
   - Update `listProducts` to accept channel parameter without hardcoded default

**Pattern:**

```typescript
const defaultChannel = process.env.NEXT_PUBLIC_CHANNEL || "default-channel";
```

### 3. Form Components

**Location:** `src/ui/components/`

**Files to Update:**

- `src/ui/components/LoginForm.tsx`
- `src/ui/components/RegisterForm.tsx`

**Changes:**

- Update fallback from hardcoded "default-channel" to use environment variable
- Ensure channel prop is properly passed from parent components

**Pattern:**

```typescript
const defaultChannel = process.env.NEXT_PUBLIC_CHANNEL || "default-channel";
const currentChannel = (channel as string) || defaultChannel;
```

### 4. Debug Page

**Location:** `src/app/[channel]/(main)/debug-auth/page.tsx`

**Changes:**

- Extract channel from URL params
- Pass channel to test functions instead of hardcoded values
- Update both test login and list products calls

**Pattern:**

```typescript
// In component
const params = await props.params;
const channel = params.channel;

// In handlers
await login("test@luxiorstore.com", "testpassword123", channel);
await listProducts(channel);
```

### 5. Channel Layout

**Location:** `src/app/[channel]/layout.tsx`

**Changes:**

- Update fallback in `generateStaticParams` to use environment variable
- Ensure consistent error handling

**Pattern:**

```typescript
const defaultChannel = process.env.NEXT_PUBLIC_CHANNEL || "default-channel";
return [{ channel: defaultChannel }];
```

## Data Models

No data model changes required. This is purely a routing and configuration update.

## Error Handling

### Fallback Strategy

1. **Primary:** Use channel from URL parameters (for dynamic routes)
2. **Secondary:** Use `process.env.NEXT_PUBLIC_CHANNEL`
3. **Tertiary:** Use "default-channel" as last resort

### Logging

- Log warnings when falling back to environment variable
- Log errors when channel configuration is missing
- Maintain existing error handling in authentication flows

## Testing Strategy

### Manual Testing

1. Test all redirect pages with different `NEXT_PUBLIC_CHANNEL` values
2. Verify authentication flows work with dynamic channels
3. Test debug page functionality with URL channel parameter
4. Verify middleware redirects work correctly

### Verification Points

- All redirects use environment variable
- No hardcoded "luxior-main" references remain
- Authentication works with any channel
- Debug page uses channel from URL

### Test Cases

1. **Redirect Components:**

   - Access `/products` → Should redirect to `/{NEXT_PUBLIC_CHANNEL}/products`
   - Access `/about` → Should redirect to `/{NEXT_PUBLIC_CHANNEL}/about`
   - Repeat for all redirect pages

2. **Authentication:**

   - Login from `/{channel}/login` → Should use that channel
   - Register from `/{channel}/register` → Should redirect to `/{channel}/account`

3. **Debug Page:**
   - Access `/{channel}/debug-auth` → Test functions should use that channel
   - Verify product listing uses correct channel

## Implementation Notes

### Environment Variable Access

- `process.env.NEXT_PUBLIC_CHANNEL` is available at build time and runtime
- Safe to use in both server and client components
- Middleware already uses this pattern correctly

### Backward Compatibility

- Keep "default-channel" as ultimate fallback for safety
- Existing middleware handles old channel redirects
- No breaking changes to URL structure

### Configuration Files

- `.env` contains development channel
- `.env.production` contains production channel
- Both should be documented and consistent

## Migration Path

1. Update all redirect components (low risk)
2. Update authentication functions (medium risk - test thoroughly)
3. Update form components (low risk)
4. Update debug page (low risk)
5. Update channel layout fallback (low risk)
6. Test all flows end-to-end
7. Deploy with monitoring
