// libs/getBookings.js
export const getBookings = async (token:string) => {
    //const response = await fetch('http://localhost:5000/api/v1/bookings', {
    const response = await fetch('https://se-project-backend-31-kukkik-family.vercel.app/api/v1/bookings', {
    //const response = await fetch('https://fe-project-2024-2-rest-in-api.vercel.app/api/v1/bookings', {
        
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,  // ส่ง Token ใน Header
        }
    });

    if (!response.ok) {
        if (response.status === 401) {
            console.log('Unauthorized, clearing token');
            sessionStorage.removeItem('token');  // ลบ token
            localStorage.removeItem('token');  // ลบ token จาก localStorage
            return; // อาจให้ผู้ใช้ล็อกอินใหม่
        }
        throw new Error('Error fetching bookings');
    }

    const data = await response.json();
    return data;
};