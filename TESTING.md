# Testing Documentation

This project includes comprehensive test coverage with both unit tests and end-to-end (E2E) tests.

## Test Suite Overview

- **Unit Tests**: 22 tests across 3 test files
- **E2E Tests**: 21 tests across 4 test files
- **Total**: 43 tests ensuring app reliability

## Test Stack

- **Vitest**: Fast unit testing framework
- **Playwright**: Modern E2E testing tool
- **Testing Library**: React component testing utilities

## Running Tests

### Unit Tests

Run all unit tests:
```bash
npm run test
```

Run tests in watch mode:
```bash
npm run test -- --watch
```

Run tests with UI:
```bash
npm run test:ui
```

Run tests with coverage:
```bash
npm run test:coverage
```

### E2E Tests

Run all E2E tests:
```bash
npm run test:e2e
```

Run E2E tests with UI:
```bash
npm run test:e2e:ui
```

Run E2E tests in debug mode:
```bash
npm run test:e2e:debug
```

### Run All Tests

Run both unit and E2E tests:
```bash
npm run test:all
```

## Test Coverage

### Unit Tests

#### TextSearchTab Component
- ✅ Renders search input and button
- ✅ Disables button when input is empty
- ✅ Enables button when input has text
- ✅ Calls setResult when search is performed
- ✅ Calls search on Enter key press
- ✅ Shows searching state during search
- ✅ Displays tip message

#### ImageUploadTab Component
- ✅ Renders upload area
- ✅ Displays tip message
- ✅ Handles file selection
- ✅ Shows file input element
- ✅ Displays heading and description

#### ResultsDisplay Component
- ✅ Displays warning message when trans fat is detected
- ✅ Displays success message when no trans fat is detected
- ✅ Displays product name
- ✅ Displays total trans fat amount when present
- ✅ Displays trans fat types when present
- ✅ Displays all ingredients
- ✅ Displays health warnings when present
- ✅ Displays educational information
- ✅ Does not display trans fat types section when none present
- ✅ Does not display warnings section when none present

### E2E Tests

#### Text Search Flow
- ✅ Should display the main page with title
- ✅ Should have search tab as default
- ✅ Should enable search button when text is entered
- ✅ Should perform search and display results
- ✅ Should search on Enter key press
- ✅ Should display ingredients and warnings in results
- ✅ Should show tip message

#### Tab Navigation
- ✅ Should navigate to barcode scanner tab
- ✅ Should navigate to image upload tab
- ✅ Should navigate back to search tab
- ✅ Should maintain only one active tab at a time

#### Image Upload & Barcode Scanner
- ✅ Should display upload interface
- ✅ Should show tip for image upload
- ✅ Should display upload area with proper styling
- ✅ Should display barcode scanner interface
- ✅ Should show tip for barcode scanning
- ✅ Should have start camera button

#### Responsive Design
- ✅ Should display correctly on mobile viewport (375x667)
- ✅ Should display correctly on tablet viewport (768x1024)
- ✅ Should display correctly on desktop viewport (1920x1080)
- ✅ Should be functional on mobile

## Test Files Structure

```
transfat-detector/
├── __tests__/              # Unit tests
│   ├── TextSearchTab.test.tsx
│   ├── ImageUploadTab.test.tsx
│   └── ResultsDisplay.test.tsx
├── e2e/                    # E2E tests
│   ├── text-search.spec.ts
│   ├── navigation.spec.ts
│   ├── image-upload.spec.ts
│   └── responsive.spec.ts
├── vitest.config.ts        # Vitest configuration
├── vitest.setup.ts         # Test setup file
└── playwright.config.ts    # Playwright configuration
```

## CI/CD Integration

The tests are configured to run in CI environments:

- Playwright automatically starts the dev server before running E2E tests
- Tests run in headless mode in CI
- Screenshots and videos are captured on failures
- Test retries are enabled in CI (2 retries)

## Writing New Tests

### Unit Test Example

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyComponent from '@/components/MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### E2E Test Example

```typescript
import { test, expect } from '@playwright/test';

test('should perform user action', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Click Me/i }).click();
  await expect(page.getByText(/Success/i)).toBeVisible();
});
```

## Best Practices

1. **Unit Tests**: Test component behavior and logic in isolation
2. **E2E Tests**: Test complete user flows and interactions
3. **Use descriptive test names**: Clearly describe what is being tested
4. **Arrange, Act, Assert**: Structure tests clearly
5. **Mock external dependencies**: Keep tests fast and reliable
6. **Test accessibility**: Use semantic queries (getByRole, getByLabel)

## Troubleshooting

### Tests failing locally but passing in CI
- Ensure you have the latest dependencies installed
- Clear the test cache: `npm run test -- --clearCache`
- Check for timezone or environment-specific issues

### Playwright tests timing out
- Increase timeout in playwright.config.ts
- Check if the dev server is starting correctly
- Ensure port 3000 is available

### Vitest not finding tests
- Check that test files match the pattern `**/*.test.{ts,tsx}`
- Ensure vitest.config.ts is properly configured
- Verify exclude patterns aren't too broad

## Test Results

Current status: ✅ **All 43 tests passing**

- Unit Tests: 22/22 ✅
- E2E Tests: 21/21 ✅

Last updated: January 2026
