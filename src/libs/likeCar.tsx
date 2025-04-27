export default async function likeCar(cid: string, token: string) {
    await new Promise(resolve => setTimeout(resolve, 300));

    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/v1/carProviders/${cid}/like`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const errorResponse = await response.json();
        if (errorResponse.error === "You have already liked this car") {
            throw new Error("You have already liked this car");
        } else {
            throw new Error("Failed to like the car");
        }
    }

    return await response.json();
}
