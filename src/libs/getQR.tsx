export const getQR = async (token: string, coin: number) => {
    const response = await fetch('http://localhost:5000/api/v1/coins/getQR', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ coin })
    });
  
    if (!response.ok) {
      throw new Error('Error generating QR code');
    }
  
    const data = await response.json();
    return data.qrCode; // return only the QR code string
  };
  