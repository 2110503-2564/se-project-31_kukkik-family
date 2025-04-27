import { test, expect } from '@playwright/test';

test('login', async ({ page }) => {
  await page.goto('http://localhost:3000/');

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



  

  const goToWallet = await page.locator('h1', {hasText: 'Go To Wallet'});
  await expect(goToWallet).toBeVisible();

  await goToWallet.click();

  await page.waitForURL('http://localhost:3000/wallet');

  console.log("*******************************", page.url());

  //await page.waitForSelector('p:has-text("CASH OUT")')
  await page.waitForTimeout(3000);
  const cashOut = await page.locator('p', {hasText: /CASH/});
  await expect(cashOut).toBeVisible();

  cashOut.click();

  await page.waitForLoadState();

  const coinButton = await page.locator('button', {hasText: /100/});
  await expect(coinButton).toBeVisible();

  const cashout = await page.locator('button', {hasText: /Cash Out/});
  await expect(cashout).toBeVisible();

  coinButton.click();

  cashOut.click();

  await page.waitForLoadState();

  await expect(cashOut).toBeVisible();

});

/* test('withdraw money', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  const goToWallet = await page.locator('h1', {hasText: 'Go To Wallet'});
  await expect(goToWallet).toBeVisible();

  await goToWallet.click();

  await page.waitForURL('http://localhost:3000/wallet');

  console.log("*******************************", page.url());

  //await page.waitForSelector('p:has-text("CASH OUT")')
  await page.waitForTimeout(3000);
  const cashOut = await page.locator('button', {hasText: /CASH OUT/});
  await expect(cashOut).toBeVisible();

  cashOut.click();

  await page.waitForLoadState();

  const coinButton = await page.locator('button', {hasText: /100/});
  await expect(coinButton).toBeVisible();

  const cashout = await page.locator('button', {hasText: /Cash Out/});
  await expect(cashout).toBeVisible();

  coinButton.click();

  cashOut.click();

  await page.waitForLoadState();

  await expect(cashOut).toBeVisible();
});
 */