import { test } from '@playwright/test';
import path from 'path';

test('Login and save session for next-auth', async ({ page }) => {
  await page.goto('https://se-project-31-kukkik-family.vercel.app/login');

  // กรอก email
  await page.getByPlaceholder('Email').fill('tung@gmail.com');
  // กรอก password
  await page.getByPlaceholder('Password').fill('12345678');
  // กดปุ่ม Sign In
  await page.getByRole('button', { name: /sign in/i }).click();

  // รอจนเข้าสู่หน้า Home หรือ Dashboard
  await page.waitForURL('https://se-project-31-kukkik-family.vercel.app');

  // Save cookies + localStorage
  await page.context().storageState({ path: path.resolve(__dirname, '../storageState.json') });
});
