// libs/getPendingRenters.ts
export default async function getPendingRenters(token:string) {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/renter-requests`, {
        const res = await fetch(`http://localhost:5000/api/v1/users/renter-requests`, {
      cache: 'no-store',
      headers: {
        'Authorization': `Bearer ${token}`, // ถ้ามีการยืนยันตัวตน
      },
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch pending renters");
    }
  
    return res.json();
  }