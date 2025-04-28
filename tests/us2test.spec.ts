/* import { test, expect } from '@playwright/test';

test.beforeEach('login', async ({ page }) => {
  await page.goto('https://se-project-31-kukkik-family.vercel.app/');

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
  await page.waitForURL('https://se-project-31-kukkik-family.vercel.app/wallet', { timeout: 10000 });
  await expect(page).toHaveURL('https://se-project-31-kukkik-family.vercel.app/wallet');

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
}); */


/* test('withdraw money', async ({ page }) => {

  // กด Go To Wallet
  const goToWallet = page.locator('h1', { hasText: 'Go To Wallet' });
  await expect(goToWallet).toBeVisible();
  await goToWallet.click();

  // รอเปลี่ยนหน้าไป wallet
  await page.waitForURL('https://se-project-31-kukkik-family.vercel.app/wallet', { timeout: 10000 });
  await expect(page).toHaveURL('https://se-project-31-kukkik-family.vercel.app/wallet');

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











import { test, expect } from '@playwright/test';
import dayjs from 'dayjs';

test.beforeEach('login', async ({ page }) => {
  await page.goto('https://se-project-31-kukkik-family.vercel.app/');

  await expect(page).toHaveTitle(/Create Next App/);












  await page.goto('https://se-project-31-kukkik-family.vercel.app/login');
  // กรอก email
  await page.getByPlaceholder('Email').fill('eiei@gmail.com');
  // กรอก password
  await page.getByPlaceholder('Password').fill('12345678');
  // กดปุ่ม Sign In
  await page.getByRole('button', { name: /sign in/i }).click();












  await page.goto('https://se-project-31-kukkik-family.vercel.app/booking');

  // เลือก Car Provider จาก pop-up หรือ dropdown
  const carProviderDropdown = page.locator('[role="combobox"]');
  // const carProviderDropdown = page.locator('select[name="carProviderId"]'); // หา element ของ Car Provider
  //console.log(await carProviderDropdown.isVisible()); 
  await carProviderDropdown.click();

  // สมมติว่ามีรายการ Car Providers อยู่ใน popup
  const firstCarProvider = page.locator('li[role="option"]:first-child');// เลือก car provider ตัวแรก
  await firstCarProvider.click();

  const today = dayjs();
  const pickupDate = today.add(1, 'day');
  const returnDate = today.add(3, 'day');
  
  // เลือกวันที่ Pick-up และ Return Date (สมมติว่าใช้ DatePicker หรือ Input ที่สามารถกรอกวันได้)
  // เลือกวันที่ Pick-up
  const pickupDateField = page.locator('div.MuiFormControl-root:has-text("Pickup Date") input');
  await pickupDateField.fill(pickupDate.format('MM/DD/YYYY'));
  //await pickupDateField.click();

  // เลือกวันที่ Return
  const returnDateField = page.locator('div.MuiFormControl-root:has-text("Return Date") input');
  await returnDateField.fill(returnDate.format('MM/DD/YYYY'));
  //await returnDateField.click();

  // กดปุ่ม Book Car
  await page.getByRole('button', { name: /book car/i }).click();

  // รอการจองสำเร็จ (อาจจะต้องรอ element บางอย่างปรากฏขึ้น)
  // await page.waitForSelector(...)

  // Step 2: ไปหน้า mybooking
  await page.goto('https://se-project-31-kukkik-family.vercel.app/mybooking');

  // Step 3: หา Receive button แล้วคลิก
  const receiveButton = page.locator('button', { hasText: 'Receive' });
  await expect(receiveButton).toBeVisible();
  await receiveButton.click();




  await page.goto('https://se-project-31-kukkik-family.vercel.app/logout');





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
  await page.waitForURL('https://se-project-31-kukkik-family.vercel.app/wallet', { timeout: 10000 });
  await expect(page).toHaveURL('https://se-project-31-kukkik-family.vercel.app/wallet');

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