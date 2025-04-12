// libs/getStatus.ts

export default async function getStatus(cid: string, token: string) {
    try {
        // Fetch car provider status
        const response = await fetch(`http://localhost:5000/api/v1/carProviders/${cid}/status`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to get car provider status");
        }

        const data = await response.json();
        console.log("Fetched car provider status response:", data); 
        return data.data.status; // Assuming the response contains the status directly
    } catch (error) {
        console.error("Error fetching car provider status:", error);
        throw error;
    }
}
