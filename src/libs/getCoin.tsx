export const getCoin = async (token: string, userId: string): Promise<number> => {
    const url = `https://fe-project-2024-2-rest-in-api.vercel.app/api/v1/coins?userId=${userId}`
  
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
  
    if (!response.ok) {
      if (response.status === 401) {
        console.log('Unauthorized, clearing token')
        sessionStorage.removeItem('token')
        localStorage.removeItem('token')
        return 0
      }
      throw new Error('Failed to fetch coins')
    }
  
    const data = await response.json()
    return data.coins
  }
  