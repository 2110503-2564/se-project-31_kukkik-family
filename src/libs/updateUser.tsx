export const updateUser = async (token: string, uid: string, updateData:any) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/v1/users/${uid}`, {
    //const response = await fetch(`http://localhost:5000/api/v1/users/${bid}`, { test
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,  // ส่ง Token ใน Header
            
        },
            body: JSON.stringify(updateData), 
        });

    if (!response.ok) {
        throw new Error(`Error update user ${uid}`);
    }

    return await response.json();
};
