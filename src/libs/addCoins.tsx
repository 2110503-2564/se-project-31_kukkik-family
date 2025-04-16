export const addCoins = async (token: string, coin: number) => {
    const response = await fetch('http://localhost:5000/api/v1/coins/add', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ coin })
    });
  
    if (!response.ok) {
      throw new Error('Error adding coins');
    }
  
    const data = await response.json();
    return data.coin; // return updated coin amount
  };
  