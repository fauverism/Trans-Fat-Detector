import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
  test('should display correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Check that main elements are visible
    await expect(page.getByRole('heading', { name: /Trans Fat Detector/i })).toBeVisible();
    await expect(page.getByText(/Is your snack hiding something/i)).toBeVisible();

    // Check tabs are present (they may have hidden text on mobile)
    const tabs = page.getByRole('tablist');
    await expect(tabs).toBeVisible();

    // Check that the search input is visible
    await expect(page.getByPlaceholder(/Try 'Oreos' or 'Doritos'/i)).toBeVisible();
  });

  test('should display correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    await expect(page.getByRole('heading', { name: /Trans Fat Detector/i })).toBeVisible();
    await expect(page.getByPlaceholder(/Try 'Oreos' or 'Doritos'/i)).toBeVisible();
  });

  test('should display correctly on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');

    await expect(page.getByRole('heading', { name: /Trans Fat Detector/i })).toBeVisible();
    await expect(page.getByPlaceholder(/Try 'Oreos' or 'Doritos'/i)).toBeVisible();

    // Full tab text should be visible on desktop
    const searchTab = page.getByRole('tab', { name: /Search/i });
    await expect(searchTab).toContainText('Search');
  });

  test('should be functional on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const searchInput = page.getByPlaceholder(/Try 'Oreos' or 'Doritos'/i);
    await searchInput.fill('Test Product');

    const searchButton = page.getByRole('button').filter({ hasText: '' }).first();
    await searchButton.click();

    await expect(page.getByText(/Trans Fats Detected|No Trans Fats Found/i)).toBeVisible({ timeout: 3000 });
  });
});
