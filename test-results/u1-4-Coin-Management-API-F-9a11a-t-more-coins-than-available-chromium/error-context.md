# Test info

- Name: Coin Management API >> Fail to deduct more coins than available
- Location: /Users/puckanut/Desktop/kukkik/se-project-31_kukkik-family/tests/u1-4.spec.ts:96:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 400
Received: 200
    at /Users/puckanut/Desktop/kukkik/se-project-31_kukkik-family/tests/u1-4.spec.ts:106:31
```

# Test source

```ts
   6 | let token;
   7 |
   8 | // login 
   9 | test.beforeEach(async ({ request }) => {
   10 |   const loginResponse = await request.post(`${baseURL}/api/v1/auth/login`, {
   11 |     data: {
   12 |       email: 'tung@gmail.com',  
   13 |       password: '12345678',    
   14 |     },
   15 |   });
   16 |
   17 |   expect(loginResponse.ok()).toBeTruthy(); 
   18 |
   19 |   const loginBody = await loginResponse.json();
   20 |   token = loginBody.token; 
   21 | });
   22 |
   23 | test.describe('Coin Management API', () => {
   24 |
   25 |
   26 |   test('Add coins to borrower wallet', async ({ request }) => {
   27 |     const response = await request.put(`${baseURL}/api/v1/coins/add`, {
   28 |       data: {
   29 |         coin: 50,
   30 |       },
   31 |       headers: {
   32 |         Authorization: `Bearer ${token}`,
   33 |       },
   34 |     });
   35 |
   36 |     expect(response.ok()).toBeTruthy();
   37 |     const body = await response.json();
   38 |     expect(body.success).toBe(true);
   39 |     expect(body.message).toBe('Coin added successfully');
   40 |     expect(typeof body.coin).toBe('number');
   41 |     expect(body.coin).toBeGreaterThanOrEqual(0);
   42 |   });
   43 |
   44 |
   45 |   test('Deduct coins from borrower wallet', async ({ request }) => {
   46 |     const response = await request.put(`${baseURL}/api/v1/coins/deduct`, {
   47 |       data: {
   48 |         coin: 30,
   49 |       },
   50 |       headers: {
   51 |         Authorization: `Bearer ${token}`,
   52 |       },
   53 |     });
   54 |
   55 |     expect(response.ok()).toBeTruthy();
   56 |     const body = await response.json();
   57 |     expect(body.success).toBe(true);
   58 |     expect(body.message).toBe('Coin deducted successfully');
   59 |     expect(typeof body.coin).toBe('number');
   60 |     expect(body.coin).toBeGreaterThanOrEqual(0);
   61 |   });
   62 |
   63 |
   64 |   test('Fail to add negative coins', async ({ request }) => {
   65 |     const response = await request.put(`${baseURL}/api/v1/coins/add`, {
   66 |       data: {
   67 |         coin: -50,
   68 |       },
   69 |       headers: {
   70 |         Authorization: `Bearer ${token}`,
   71 |       },
   72 |     });
   73 |
   74 |     expect(response.status()).toBe(400);
   75 |     const body = await response.json();
   76 |     expect(body.success).toBe(false);
   77 |     expect(body.message).toBe('Coin value must be a non-negative number');
   78 |   });
   79 |
   80 |   test('Fail to deduct negative coins', async ({ request }) => {
   81 |     const response = await request.put(`${baseURL}/api/v1/coins/deduct`, {
   82 |       data: {
   83 |         coin: -10,
   84 |       },
   85 |       headers: {
   86 |         Authorization: `Bearer ${token}`,
   87 |       },
   88 |     });
   89 |
   90 |     expect(response.status()).toBe(400);
   91 |     const body = await response.json();
   92 |     expect(body.success).toBe(false);
   93 |     expect(body.message).toBe('Coin value must be a non-negative number');
   94 |   });
   95 |
   96 |   test('Fail to deduct more coins than available', async ({ request }) => {
   97 |     const response = await request.put(`${baseURL}/api/v1/coins/deduct`, {
   98 |       data: {
   99 |         coin: 100000, 
  100 |       },
  101 |       headers: {
  102 |         Authorization: `Bearer ${token}`,
  103 |       },
  104 |     });
  105 |
> 106 |     expect(response.status()).toBe(400);
      |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  107 |     const body = await response.json();
  108 |     expect(body.success).toBe(false);
  109 |     expect(body.message).toBe('Not enough coins to deduct');
  110 |   });
  111 |
  112 |   test('Fail to add coins without specifying amount', async ({ request }) => {
  113 |     const response = await request.put(`${baseURL}/api/v1/coins/add`, {
  114 |       data: {},
  115 |       headers: {
  116 |         Authorization: `Bearer ${token}`,
  117 |       },
  118 |     });
  119 |
  120 |     expect(response.status()).toBe(400);
  121 |     const body = await response.json();
  122 |     expect(body.success).toBe(false);
  123 |     expect(body.message).toBe('Coin value must be specified');
  124 |   });
  125 |
  126 |   test('Fail to deduct coins without specifying amount', async ({ request }) => {
  127 |     const response = await request.put(`${baseURL}/api/v1/coins/deduct`, {
  128 |       data: {},
  129 |       headers: {
  130 |         Authorization: `Bearer ${token}`,
  131 |       },
  132 |     });
  133 |
  134 |     expect(response.status()).toBe(400);
  135 |     const body = await response.json();
  136 |     expect(body.success).toBe(false);
  137 |     expect(body.message).toBe('Coin value must be specified');
  138 |   });
  139 |
  140 | });
```