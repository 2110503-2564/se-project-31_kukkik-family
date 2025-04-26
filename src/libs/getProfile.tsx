export default async function getProfile(rid:string){
    await new Promise(resolve => setTimeout(resolve, 300));
    const response = await fetch(`https://se-project-backend-31-kukkik-family.vercel.app/api/v1/carProviders/renter/${rid}`)
    if(!response.ok){
        throw new Error("Failed to fetch renter profile")
    }
    return await response.json()
}