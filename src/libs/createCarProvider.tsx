export const createCarProvider = async (token: string, carProviderData: any) => {
    // const response = await fetch('http://fe-project-2024-2-rest-in-api.vercel.app/api/v1/carProviders', {
    // const response = await fetch('https://api-coin-kukkik.vercel.app/api/v1/carProviders', {
    const response = await fetch('http://localhost:5000/api/v1/carProviders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(carProviderData)
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 401) {
        console.log('Unauthorized, clearing token');
        sessionStorage.removeItem('token');
        localStorage.removeItem('token');
        return;
      }
  
      if (errorData.message) {
        throw new Error(errorData.message);
      }
  
      throw new Error('Error creating car provider');
    }
  
    const data = await response.json();
    return data.data; // Return the newly created car provider
  };
  