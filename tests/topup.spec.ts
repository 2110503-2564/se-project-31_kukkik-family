import { test, expect } from '@playwright/test';

const apiURL = 'https://se-project-backend-31-kukkik-family.vercel.app';
const webURL = 'https://se-project-31-kukkik-family.vercel.app'; 
//const webURL = 'http://localhost:3000' 

let token: string;

// login 
test.beforeEach(async ({ request, page }) => {
    await page.goto(`${webURL}/login`);

    // กรอก email
    await page.getByPlaceholder('Email').fill('Toya@gmail.com');
    // กรอก password
    await page.getByPlaceholder('Password').fill('12345678');
    // กดปุ่ม Sign In
    await page.getByRole('button', { name: /sign in/i }).click();
    const loginResponse = await request.post(`${apiURL}/api/v1/auth/login`, {
        data: {
        email: 'Toya@gmail.com',  
        password: '12345678',    
        },
    });

    expect(loginResponse.ok()).toBeTruthy(); 

    const loginBody = await loginResponse.json();
    token = loginBody.token; 

    // รอจนเข้าสู่หน้า Home หรือ Dashboard
    await page.waitForURL(`${webURL}`);
    
});

test('check user coin and topup', async ({ page, request }) => {
    await page.goto(`${webURL}/wallet`);
    const coinResponse = await request.get(`${apiURL}/api/v1/coins`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const res = await coinResponse.json();
    const coin = res.coin;
    console.log(coin);

    // Wait until the coins are displayed (and not "Loading...")
    await page.waitForFunction(() => {
        const el = document.getElementById('userCoin');
        return el && el.textContent !== 'Loading...';
    });

    // Then continue normally
    await page.getByRole('button', { name: /ADD COINS/i }).click();

    await page.getByRole('button', { name: /custom/i }).click();
    await page.getByPlaceholder('Enter Amount').fill('500');
    await page.getByRole('button', { name: /confirm/i }).click();
    await page.getByRole('button', { name: /add coins/i }).click();

    // 1. Wait until the #qr-id element appears
    const qrIdElement = await page.waitForSelector('#qr-id', { timeout: 60000 }); // wait up to 60 sec

    // 2. Get the 'data-qrid' attribute
    const qrId = await qrIdElement.getAttribute('data-qrid');

    if (!qrId) {
    throw new Error('QR ID not found');
    }

    console.log('QR ID:', qrId);
    // Now you can use `qrId` in your test, for example:
    const redeemResponse = await page.request.get(`${apiURL}/api/v1/coins/redeem/${qrId}`);
    console.log(redeemResponse.json());
    await page.waitForTimeout(5000); // or use waitForNavigation() if you expect page redirect
    await page.waitForURL(`${webURL}/wallet`);

    const coinResponseEnd = await request.get(`${apiURL}/api/v1/coins`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const resEnd = await coinResponseEnd.json();
    const coinEnd = resEnd.coin;

    expect(coinEnd).toEqual(coin + 500);
    
    

})


