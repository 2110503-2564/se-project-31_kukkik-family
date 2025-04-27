// libs/createBooking.js
export const createBooking = async (token: string, carId: string, bookingData: any) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/v1/carProviders/${carId}/bookings`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`, // ส่ง Token ใน Header
      'Content-Type': 'application/json',  // กำหนด Content-Type เป็น JSON
    },
    body: JSON.stringify(bookingData),  // ส่งข้อมูลการจองในรูปแบบ JSON
  });

  if (!response.ok) {
    const errorData = await response.json();
    if (response.status === 401) {
      console.log('Unauthorized, clearing token');
      sessionStorage.removeItem('token');
      localStorage.removeItem('token');
      return;
    }
    if (errorData.message) {
      throw new Error(errorData.message);  // ถ้ามีข้อความข้อผิดพลาดจาก backend ให้ throw ข้อความนั้น
    }

    throw new Error('Error creating booking');
  }

  const data = await response.json();
  return data;  // คืนค่าข้อมูลการจองที่สร้างขึ้นจาก API
};
