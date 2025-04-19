export const getQR = async (token: string, coin: number) => {
    // const response = await fetch('http://fe-project-2024-2-rest-in-api.vercel.app/api/v1/coins/getQR', {
    //const response = await fetch('https://api-coin-kukkik.vercel.app/api/v1/coins/getQR', {
     const response = await fetch('http://localhost:5000/api/v1/coins/getQR', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ coin })
    });
  
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error generating QR code');
    }
  
    const data = await response.json();
    const fullURL = `https://api-coin-kukkik.vercel.app/api/v1/coins/redeem/${data.qrCode}`;
    return fullURL;
  };
  