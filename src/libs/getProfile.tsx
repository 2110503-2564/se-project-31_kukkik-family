export default async function getProfile(rid:string){
    await new Promise(resolve => setTimeout(resolve, 300));
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/v1/carProviders/renter/${rid}`)
    if(!response.ok){
        throw new Error("Failed to fetch renter profile")
    }
    return await response.json()
}