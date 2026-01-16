import { test, expect } from '@playwright/test';

test.describe('Text Search Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the main page with title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Trans Fat Detector/i })).toBeVisible();
    await expect(page.getByText(/Is your snack hiding something/i)).toBeVisible();
  });

  test('should have search tab as default', async ({ page }) => {
    const searchTab = page.getByRole('tab', { name: /Search/i });
    await expect(searchTab).toHaveAttribute('data-state', 'active');
  });

  test('should enable search button when text is entered', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/Try 'Oreos' or 'Doritos'/i);
    const searchButton = page.getByRole('button').filter({ hasText: '' }).first();

    // Button should be disabled initially
    await expect(searchButton).toBeDisabled();

    // Type in the search box
    await searchInput.fill('Oreos');

    // Button should now be enabled
    await expect(searchButton).toBeEnabled();
  });

  test('should perform search and display results', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/Try 'Oreos' or 'Doritos'/i);
    const searchButton = page.getByRole('button').filter({ hasText: '' }).first();

    await searchInput.fill('Doritos');
    await searchButton.click();

    // Wait for results to appear
    await expect(page.getByText(/Trans Fats Detected|No Trans Fats Found/i)).toBeVisible({ timeout: 3000 });

    // Check that results display has content
    await expect(page.getByText(/Doritos/i)).toBeVisible();
  });

  test('should search on Enter key press', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/Try 'Oreos' or 'Doritos'/i);

    await searchInput.fill('Cheetos');
    await searchInput.press('Enter');

    // Wait for results
    await expect(page.getByText(/Trans Fats Detected|No Trans Fats Found/i)).toBeVisible({ timeout: 3000 });
  });

  test('should display ingredients and warnings in results', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/Try 'Oreos' or 'Doritos'/i);
    const searchButton = page.getByRole('button').filter({ hasText: '' }).first();

    await searchInput.fill('Test Product');
    await searchButton.click();

    // Wait for results
    await page.waitForSelector('text=/Trans Fats Detected|No Trans Fats Found/i', { timeout: 3000 });

    // Check for ingredients section
    await expect(page.getByText(/Ingredients/i)).toBeVisible();

    // Check for educational info
    await expect(page.getByText(/Did You Know/i)).toBeVisible();
  });

  test('should show tip message', async ({ page }) => {
    await expect(page.getByText(/Try searching for popular snack brands/i)).toBeVisible();
  });
});
