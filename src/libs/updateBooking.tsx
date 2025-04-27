export const updateBooking = async (token: string, bid: string, updateData:any) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/v1/bookings/${bid}`, {
    //const response = await fetch(`http://localhost:5000/api/v1/bookings/${bid}`, { test
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,  // ส่ง Token ใน Header
            'Content-Type': 'application/json',
        },
            body: JSON.stringify(updateData), 
        });

    if (!response.ok) {
        throw new Error(`Error updating booking ${bid}`);
    }

    return await response.json();
};
