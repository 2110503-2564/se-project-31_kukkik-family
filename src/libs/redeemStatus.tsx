export const redeemStatus = async (code: string) => {
    //const response = await fetch(`http://fe-project-2024-2-rest-in-api.vercel.app/api/v1/coins/redeem/${code}/status`, {
    const response = await fetch(`https://se-project-backend-31-kukkik-family.vercel.app/api/v1/coins/redeem/${code}/status`, {
    //const response = await fetch(`http://localhost:5000/api/v1/coins/redeem/${code}/status`, {
      method: 'GET',
    });
  
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error redeeming Status');
    }
  
    const data = await response.json();
    return data; // may contain message / status, check backend return
  };
  