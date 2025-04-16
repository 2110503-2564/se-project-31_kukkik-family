export const getCoins = async (token: string) => {
  // Call the backend API to fetch user's coin balance
  // const response = await fetch('http://fe-project-2024-2-rest-in-api.vercel.app/api/v1/coins', {
  const response = await fetch('http://localhost:5000/api/v1/coins', {
    method: 'GET',
    headers: {
      // Pass the token for authentication
      'Authorization': `Bearer ${token}`,
    },
  });

  // Check if the response is successful
  if (!response.ok) {
    // Handle unauthorized access
    if (response.status === 401) {
      console.log('Unauthorized, clearing token');

      // Remove token from storage
      sessionStorage.removeItem('token');
      localStorage.removeItem('token');

      return;
    }

    // Throw error for other issues
    throw new Error('Error fetching coins');
  }

  // Parse and return the response data
  const data = await response.json();
  return data; // Expected: { success: true, coin: <number> }
};
