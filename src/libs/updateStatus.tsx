export default async function updateStatus(
    cid: string, 
    token: string,
    newStatus: "available" | "rented" | "received" | "returned"
) {
    try {
        await new Promise(resolve => setTimeout(resolve, 300));  // Delay to simulate async behavior

        // const response = await fetch(`https://fe-project-2024-2-rest-in-api.vercel.app/api/v1/carProviders/${cid}/status`, {
            const response = await fetch(`http://localhost:5000/api/v1/carProviders/${cid}/status`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ status: newStatus }),
        });
        
        console.log("Updating car status to:", newStatus);

        if (!response.ok) {
            const errorData = await response.json(); 
            throw new Error(errorData.message || "Failed to update car provider status");
        }

        const data = await response.json();
        return data.data; 
    } catch (error) {
        console.error("Error updating car provider status:", error);
        throw error; 
    }
}
