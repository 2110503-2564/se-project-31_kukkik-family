/* import { test, expect } from '@playwright/test';

test.beforeEach('login', async ({ page }) => {
  await page.goto('http://localhost:3000/');

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

test('withdraw money', async ({ page }) => {
  const goToWallet = await page.locator('h1', {hasText: 'Go To Wallet'});
  await expect(goToWallet).toBeVisible();

  await goToWallet.click();
  await page.waitForURL('http://localhost:3000/wallet', { timeout: 10000 });
  await expect(page).toHaveURL('http://localhost:3000/wallet');

  const coin = await page.locator('h1', {hasText: '8800'});
  await expect(coin).toHaveText('8800');

  // รอ button พร้อม p CASH OUT
  const cashOut = page.getByRole('button', { name: /cash out/i });
  await expect(cashOut).toBeVisible();

  cashOut.click();

  await page.waitForLoadState();

  const coinButton = await page.locator('button', {hasText: /100/});
  await expect(coinButton).toBeVisible();

  const cashout = await page.locator('button', {hasText: /Cash Out/});
  await expect(cashout).toBeVisible();

  await coinButton.click();

  await cashout.click();

  await page.waitForLoadState();

  await expect(cashOut).toBeVisible();
});
 */








import { test, expect } from '@playwright/test';

test.beforeEach('login', async ({ page }) => {
  await page.goto('http://localhost:3000/');

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

test('withdraw money', async ({ page }) => {
  const goToWallet = await page.locator('h1', {hasText: 'Go To Wallet'});
  await expect(goToWallet).toBeVisible();

  await goToWallet.click();
  await page.waitForURL('http://localhost:3000/wallet', { timeout: 10000 });
  await expect(page).toHaveURL('http://localhost:3000/wallet');

  // Ensure coin element is visible before checking text
  const coin = await page.locator('h1');
  await coin.waitFor({ state: 'visible' });
  await expect(coin).toHaveText('7,580');

  // Wait for button and ensure visibility
  const cashOut = page.getByRole('button', { name: /cash out/i });
  await expect(cashOut).toBeVisible();

  cashOut.click();

  await page.waitForLoadState();

  const coinButton = await page.locator('button', {hasText: '100\n COINS'});
  await expect(coinButton).toBeVisible();

  await coinButton.click();

  const cashout = await page.locator('button', {hasText: /Cash Out/});
  await expect(cashout).toBeVisible();

  await cashout.click();

  await page.waitForLoadState();

  await expect(cashOut).toBeVisible();

  const coin2 = await page.locator('h1');
  await coin2.waitFor({ state: 'visible' });
  await expect(coin2).toHaveText('7,480');  // เปลี่ยนจาก coin เป็น coin2
});
