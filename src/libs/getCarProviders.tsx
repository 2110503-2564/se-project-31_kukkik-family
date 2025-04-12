export default async function getCarProviders(
    url: string,
    // {relevance, minPrice, maxPrice, minseat, maxseat, province, toplike, seat, page, limit, price}: 
    // {relevance?: number, minPrice?: number, maxPrice?: number, minseat?: number, maxseat?: number, province?: string, toplike?: number, seat?: number, page?: number, limit?: number, price?: number}
){

    // const carProviders = await getCarProviders()
    await new Promise(resolve => setTimeout(resolve, 300));
    let newUrl = "https://fe-project-2024-2-rest-in-api.vercel.app/api/v1/carProviders?" + url
    console.log(newUrl)
    const response = await fetch(newUrl)
    if(!response.ok){
        throw new Error("Failed to fetch car providers")
    }
    
    return await response.json()
}