export default async function getStatus(bid: string, token: string) {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/bookings/${bid}/status`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to get booking status");
      }
  
      const data = await response.json();
      console.log("Fetched booking status response:", data);
      return data.status;
    } catch (error) {
      console.error("Error fetching booking status:", error);
      throw error;
    }
  }
  