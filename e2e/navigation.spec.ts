import { test, expect } from '@playwright/test';

test.describe('Tab Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to barcode scanner tab', async ({ page }) => {
    const barcodeTab = page.getByRole('tab', { name: /Scan/i });
    await barcodeTab.click();

    await expect(barcodeTab).toHaveAttribute('data-state', 'active');
    await expect(page.getByText(/Scan Barcode/i)).toBeVisible();
    await expect(page.getByText(/Use your camera to scan a product barcode/i)).toBeVisible();
  });

  test('should navigate to image upload tab', async ({ page }) => {
    const uploadTab = page.getByRole('tab', { name: /Upload/i });
    await uploadTab.click();

    await expect(uploadTab).toHaveAttribute('data-state', 'active');
    await expect(page.getByText(/Upload Image/i)).toBeVisible();
    await expect(page.getByText(/Take a photo of the ingredients label/i)).toBeVisible();
  });

  test('should navigate back to search tab', async ({ page }) => {
    // Go to upload tab
    await page.getByRole('tab', { name: /Upload/i }).click();

    // Go back to search tab
    const searchTab = page.getByRole('tab', { name: /Search/i });
    await searchTab.click();

    await expect(searchTab).toHaveAttribute('data-state', 'active');
    await expect(page.getByPlaceholder(/Try 'Oreos' or 'Doritos'/i)).toBeVisible();
  });

  test('should maintain only one active tab at a time', async ({ page }) => {
    const searchTab = page.getByRole('tab', { name: /Search/i });
    const barcodeTab = page.getByRole('tab', { name: /Scan/i });
    const uploadTab = page.getByRole('tab', { name: /Upload/i });

    // Click barcode tab
    await barcodeTab.click();
    await expect(barcodeTab).toHaveAttribute('data-state', 'active');
    await expect(searchTab).toHaveAttribute('data-state', 'inactive');
    await expect(uploadTab).toHaveAttribute('data-state', 'inactive');

    // Click upload tab
    await uploadTab.click();
    await expect(uploadTab).toHaveAttribute('data-state', 'active');
    await expect(searchTab).toHaveAttribute('data-state', 'inactive');
    await expect(barcodeTab).toHaveAttribute('data-state', 'inactive');
  });
});
