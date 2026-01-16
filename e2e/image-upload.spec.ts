import { test, expect } from '@playwright/test';

test.describe('Image Upload Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('tab', { name: /Upload/i }).click();
  });

  test('should display upload interface', async ({ page }) => {
    await expect(page.getByText(/Upload Image/i)).toBeVisible();
    await expect(page.getByText(/Drag & drop an image here/i)).toBeVisible();
    await expect(page.getByText(/Browse Files/i)).toBeVisible();
  });

  test('should show tip for image upload', async ({ page }) => {
    await expect(page.getByText(/Make sure the ingredients list is clear and well-lit/i)).toBeVisible();
  });

  test('should display upload area with proper styling', async ({ page }) => {
    const uploadArea = page.locator('div').filter({ hasText: /Drag & drop an image here/i }).first();
    await expect(uploadArea).toBeVisible();
  });
});

test.describe('Barcode Scanner Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('tab', { name: /Scan/i }).click();
  });

  test('should display barcode scanner interface', async ({ page }) => {
    await expect(page.getByText(/Scan Barcode/i)).toBeVisible();
    await expect(page.getByText(/Use your camera to scan a product barcode/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /Start Camera/i })).toBeVisible();
  });

  test('should show tip for barcode scanning', async ({ page }) => {
    await expect(page.getByText(/Hold the barcode steady in front of your camera/i)).toBeVisible();
  });

  test('should have start camera button', async ({ page }) => {
    const startButton = page.getByRole('button', { name: /Start Camera/i });
    await expect(startButton).toBeVisible();
    await expect(startButton).toBeEnabled();
  });
});
