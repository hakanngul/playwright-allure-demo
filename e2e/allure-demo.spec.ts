import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';

test.describe('Allure Report Demo', () => {
  test.beforeEach(async ({ page }) => {
    // Add step to allure report
    await allure.step('Navigate to Playwright website', async () => {
      await page.goto('https://playwright.dev/');
    });
  });

  test('Page title verification @smoke', async ({ page }) => {
    // Add test description and severity
    allure.description('This test verifies the page title contains Playwright');
    allure.severity('critical');
    
    // Add step with screenshot
    await allure.step('Verify page title', async () => {
      await expect(page).toHaveTitle(/Playwright/);
      
      // Attach screenshot to the report
      const screenshot = await page.screenshot();
      await allure.attachment('screenshot', screenshot, 'image/png');
    });
  });

  test('Navigation menu verification @regression', async ({ page }) => {
    // Add test description and severity
    allure.description('This test verifies the navigation menu items');
    allure.severity('normal');
    
    await allure.step('Check Docs link is visible', async () => {
      await expect(page.getByRole('link', { name: 'Docs' })).toBeVisible();
    });
    
    await allure.step('Check API link is visible', async () => {
      await expect(page.getByRole('link', { name: 'API' })).toBeVisible();
    });
  });
});
