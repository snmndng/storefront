# Implementation Plan

- [x] 1. Update redirect components to use dynamic channel

  - Replace all hardcoded "luxior-main" redirects with environment variable pattern
  - Apply consistent pattern: `const defaultChannel = process.env.NEXT_PUBLIC_CHANNEL || "default-channel"`
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 1.1 Update products redirect page

  - Modify `src/app/products/page.tsx` to use dynamic channel from environment variable
  - _Requirements: 1.1, 1.2_

- [x] 1.2 Update about redirect page

  - Modify `src/app/about/page.tsx` to use dynamic channel from environment variable
  - _Requirements: 1.1, 1.2_

- [x] 1.3 Update login redirect page

  - Modify `src/app/login/page.tsx` to use dynamic channel from environment variable
  - _Requirements: 1.1, 1.2_

- [x] 1.4 Update register redirect page

  - Modify `src/app/register/page.tsx` to use dynamic channel from environment variable
  - _Requirements: 1.1, 1.2_

- [x] 1.5 Update contact redirect page

  - Modify `src/app/contact/page.tsx` to use dynamic channel from environment variable
  - _Requirements: 1.1, 1.2_

- [x] 1.6 Update warranty redirect page

  - Modify `src/app/contact/warranty/page.tsx` to use dynamic channel from environment variable
  - _Requirements: 1.1, 1.2_

- [x] 2. Update authentication functions in actions.ts

  - Remove hardcoded "default-channel" defaults
  - Use environment variable for default channel value
  - Update redirect URLs to use dynamic channel
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [x] 2.1 Update login function default parameter

  - Change default parameter from hardcoded "default-channel" to use environment variable pattern
  - _Requirements: 3.1, 3.3_

- [x] 2.2 Update register function channel handling

  - Update channel fallback from hardcoded "default-channel" to use environment variable
  - Update redirect URL to use environment variable fallback
  - _Requirements: 3.2, 3.3_

- [x] 2.3 Update createTestUser function

  - Replace hardcoded "default-channel" with environment variable pattern
  - _Requirements: 2.1, 2.2_

- [x] 2.4 Update listProducts function default parameter

  - Change default parameter to use environment variable instead of hardcoded "default-channel"
  - _Requirements: 2.3, 2.4_

- [x] 3. Update form components to use dynamic channel

  - Update LoginForm and RegisterForm fallback patterns
  - Ensure consistent use of environment variable
  - _Requirements: 3.1, 3.2, 5.1, 5.2_

- [x] 3.1 Update LoginForm component

  - Replace hardcoded "default-channel" fallback with environment variable pattern
  - _Requirements: 3.1, 5.1, 5.2_

- [x] 3.2 Update RegisterForm component

  - Replace hardcoded "default-channel" fallback with environment variable pattern
  - _Requirements: 3.2, 5.1, 5.2_

- [x] 4. Update debug page to use channel from URL

  - Extract channel from URL params
  - Pass channel to test functions
  - Remove all hardcoded channel values
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [x] 4.1 Update debug page component

  - Extract channel from params using async props pattern
  - Update test login call to use channel from URL params
  - Update list products call to use channel from URL params
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [x] 5. Update channel layout fallback

  - Replace hardcoded "default-channel" with environment variable in generateStaticParams
  - Ensure consistent error handling
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [x] 5.1 Update generateStaticParams fallback

  - Replace hardcoded "default-channel" with environment variable pattern
  - Update both fallback locations in the function (lines 24 and 29)
  - _Requirements: 4.1, 4.2, 4.3_

- [ ]\* 6. Verify all hardcoded channels are removed
  - Search codebase for remaining "luxior-main" references
  - Search codebase for hardcoded "default-channel" (excluding final fallback pattern)
  - Verify all components use consistent pattern
  - _Requirements: 1.2, 5.1, 5.2, 5.3_
