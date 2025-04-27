export default async function getCarProvider(cid:string){
    await new Promise(resolve => setTimeout(resolve, 300));
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/v1/carProviders/${cid}`)
    if(!response.ok){
        throw new Error("Failed to fetch venues")
    }
    return await response.json()
}