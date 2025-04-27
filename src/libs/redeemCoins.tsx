export const redeemCoins = async (code: string) => {
    // const response = await fetch(`http://fe-project-2024-2-rest-in-api.vercel.app/api/v1/coins/redeem/${code}`, {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/v1/coins/redeem/${code}`, {
    // const response = await fetch(`http://localhost:5000/api/v1/coins/redeem/${code}`, {
      method: 'GET',
    });
  
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error redeeming coins');
    }
  
    const data = await response.json();
    return data; // may contain message / status, check backend return
  };
  