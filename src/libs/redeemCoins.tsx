export const redeemCoins = async (code: string) => {
    const response = await fetch(`http://localhost:5000/api/v1/coins/redeem/${code}`, {
      method: 'GET',
    });
  
    if (!response.ok) {
      throw new Error('Error redeeming coins');
    }
  
    const data = await response.json();
    return data; // may contain message / status, check backend return
  };
  