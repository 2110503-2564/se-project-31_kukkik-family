import { test, expect } from '@playwright/test';
import dayjs from 'dayjs';

test.describe('Booking Flow + MyBooking - Receive and Return buttons', () => {

  test.beforeEach(async ({ page }) => {
    // Login ก่อน
    await page.goto('https://se-project-31-kukkik-family.vercel.app/login');
    // กรอก email
    await page.getByPlaceholder('Email').fill('tung@gmail.com');
    // กรอก password
    await page.getByPlaceholder('Password').fill('12345678');
    // กดปุ่ม Sign In
    await page.getByRole('button', { name: /sign in/i }).click();
  });

  test('should complete booking and test Receive/Return flow', async ({ page }) => {
    // Step 1: ไปหน้า booking และจองรถ
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
    // await page.getByRole('alert', { name: /จองรถสำเร็จ/i }).waitFor();

    // Step 2: ไปหน้า mybooking
    await page.goto('https://se-project-31-kukkik-family.vercel.app/mybooking');

    // Step 3: หา Receive button แล้วคลิก
    const receiveButton = page.locator('button', { hasText: 'Receive' }).first();
    await expect(receiveButton).toBeVisible();
    await receiveButton.click();

    // รอให้มีปุ่ม Return แสดงขึ้น
    const returnButton = page.locator('button', { hasText: 'Return' }).first();
    await expect(returnButton).toBeVisible();

    // Step 4: คลิก Return button
    await returnButton.click();

    // หลังจากคืนรถแล้ว ปุ่ม Return ต้องหายไป
    await expect(returnButton).toBeHidden();
  });

});
