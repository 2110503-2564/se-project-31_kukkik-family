import { test, expect } from '@playwright/test';


const baseURL = 'http://localhost:5000'; 

let token;

// login 
test.beforeEach(async ({ request }) => {
  const loginResponse = await request.post(`${baseURL}/api/v1/auth/login`, {
    data: {
      email: 'tung@gmail.com',  
      password: '12345678',    
    },
  });

  expect(loginResponse.ok()).toBeTruthy(); 

  const loginBody = await loginResponse.json();
  token = loginBody.token; 
});

test.describe('Coin Management API', () => {


  test('Add coins to borrower wallet', async ({ request }) => {
    const response = await request.put(`${baseURL}/api/v1/coins/add`, {
      data: {
        coin: 50,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.message).toBe('Coin added successfully');
    expect(typeof body.coin).toBe('number');
    expect(body.coin).toBeGreaterThanOrEqual(0);
  });


  test('Deduct coins from borrower wallet', async ({ request }) => {
    const response = await request.put(`${baseURL}/api/v1/coins/deduct`, {
      data: {
        coin: 30,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.message).toBe('Coin deducted successfully');
    expect(typeof body.coin).toBe('number');
    expect(body.coin).toBeGreaterThanOrEqual(0);
  });


  test('Fail to add negative coins', async ({ request }) => {
    const response = await request.put(`${baseURL}/api/v1/coins/add`, {
      data: {
        coin: -50,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.success).toBe(false);
    expect(body.message).toBe('Coin value must be a non-negative number');
  });

  test('Fail to deduct negative coins', async ({ request }) => {
    const response = await request.put(`${baseURL}/api/v1/coins/deduct`, {
      data: {
        coin: -10,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.success).toBe(false);
    expect(body.message).toBe('Coin value must be a non-negative number');
  });

  test('Fail to deduct more coins than available', async ({ request }) => {
    const response = await request.put(`${baseURL}/api/v1/coins/deduct`, {
      data: {
        coin: 100000, 
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.success).toBe(false);
    expect(body.message).toBe('Not enough coins to deduct');
  });

  test('Fail to add coins without specifying amount', async ({ request }) => {
    const response = await request.put(`${baseURL}/api/v1/coins/add`, {
      data: {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.success).toBe(false);
    expect(body.message).toBe('Coin value must be specified');
  });

  test('Fail to deduct coins without specifying amount', async ({ request }) => {
    const response = await request.put(`${baseURL}/api/v1/coins/deduct`, {
      data: {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.success).toBe(false);
    expect(body.message).toBe('Coin value must be specified');
  });

});