import { test, expect } from '@playwright/test';

test('login', async ({ page }) => {
  await page.goto('https://se-project-31-kukkik-family.vercel.app/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Create Next App/);

  await page.locator('a', { hasText: 'Sign-In' }).click();

  await page.waitForLoadState();

  const h1 = await page.locator('h1', {hasText: 'Sign In'});

  await expect(h1).toBeVisible();

  const inputEmail = await page.locator('input[type="email"]');
  const inputPassword = await page.locator('input[type="password"]');
  const submit = await page.locator('button[type="submit"]');

  await inputEmail.fill('nutisarenter@gmail.com');
  await inputPassword.fill('12345678');
  await submit.click();

  await page.waitForLoadState();

  const h1Name = await page.locator('h1', {hasText: 'nutisarenter'});
  await expect(h1Name).toBeVisible();

});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
