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
  await expect(coin).toBeVisible();

  // Wait for button and ensure visibility
  const cashOut = page.getByRole('button', { name: /cash out/i });
  await expect(cashOut).toBeVisible();

  cashOut.click();

  await page.waitForLoadState();

  const coinButton100 = await page.locator('button', {hasText: '100\n COINS'});
  await expect(coinButton100).toBeVisible();

  const cashout = await page.locator('button', {hasText: /Cash Out/});
  await expect(cashout).toBeVisible();

  await coinButton100.click();

  await cashout.click();

  await page.waitForLoadState();

  await expect(cashOut).toBeVisible();

  const coin2 = await page.locator('h1');
  await coin2.waitFor({ state: 'visible' });
  await expect(coin2).toBeVisible();  // เปลี่ยนจาก coin เป็น coin2
});


/* test('withdraw money', async ({ page }) => {

  // กด Go To Wallet
  const goToWallet = page.locator('h1', { hasText: 'Go To Wallet' });
  await expect(goToWallet).toBeVisible();
  await goToWallet.click();

  // รอเปลี่ยนหน้าไป wallet
  await page.waitForURL('http://localhost:3000/wallet', { timeout: 10000 });
  await expect(page).toHaveURL('http://localhost:3000/wallet');

  // ดึง locator ของเหรียญ และรอให้โผล่
  const coin = page.locator('h1');
  await coin.waitFor({ state: 'visible' });
  await expect(coin).not.toHaveText('Loading...', { timeout: 10000 });

  // อ่านค่าเหรียญก่อนถอน
  const coinTextBefore = await coin.textContent();
  const beforeValue = parseInt(coinTextBefore?.replace(/,/g, '') ?? '0', 10);

  // หาและกดปุ่ม Cash Out
  const cashOut = page.getByRole('button', { name: /cash out/i });
  await expect(cashOut).toBeVisible();
  await cashOut.click();

  // รอปุ่มเลือกจำนวนเหรียญปรากฏ
  const coinButton100 = page.locator('button', { hasText: '100\n COINS' });
  await expect(coinButton100).toBeVisible();
  await coinButton100.click();

  // รอปุ่ม Cash Out จริงๆ แล้วกด
  const cashoutConfirm = page.locator('button', { hasText: /Cash Out/ });
  await expect(cashoutConfirm).toBeVisible();
  await cashoutConfirm.click();

  // รอโหลดหน้าใหม่ให้เสร็จ
  await page.waitForLoadState();

  // เช็กยอดเหรียญหลังถอน
  const coinAfter = page.locator('h1');
  await coinAfter.waitFor({ state: 'visible' });
  await expect(coinAfter).not.toHaveText('Loading...', { timeout: 10000 });

  const coinTextAfter = await coinAfter.textContent();
  const afterValue = parseInt(coinTextAfter?.replace(/,/g, '') ?? '0', 10);

  // เทียบว่ายอดลดลง 100 จริง
  const expectedWithdrawAmount = 100;
  expect(beforeValue - afterValue).toBe(expectedWithdrawAmount);
}); */