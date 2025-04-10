import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'https://dev-cxr-dtp-test.pantheonsite.io';

test.describe('Pantheon post-deploy sanity checks', () => {
  test('Homepage renders without error', async ({ page }) => {
    const res = await page.goto(BASE_URL);
    expect(res?.status()).toBe(200);
    const content = await page.content();
	expect(content).not.toMatch(/Fatal error|Warning:|Notice:/i);
    await expect(page.locator('body')).toBeVisible();
  });

  test('"Hello world!" post exists', async ({ page }) => {
    const res = await page.goto(`${BASE_URL}/hello-world/`);
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toContainText(/Hello world!/i);
    await expect(page).not.toHaveText(/Fatal error|Warning:|Notice:/i);
  });

  test('"Sample Page" loads', async ({ page }) => {
    const res = await page.goto(`${BASE_URL}/sample-page/`);
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toContainText(/Sample Page/i);
    await expect(page).not.toHaveText(/Fatal error|Warning:|Notice:/i);
  });

  test('Headers expected', async ({ page }) => {
	const res = await page.goto(BASE_URL);
	const headers = res?.headers();
	expect(headers?.['x-pantheon-styx-hostname']).toBeDefined();
	expect(headers?.['content-type']).toMatch(/text\/html/);
  });  

});
