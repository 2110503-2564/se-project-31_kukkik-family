export default async function getCarProviders(
    url: string,
    // {relevance, minPrice, maxPrice, minseat, maxseat, province, toplike, seat, page, limit, price}: 
    // {relevance?: number, minPrice?: number, maxPrice?: number, minseat?: number, maxseat?: number, province?: string, toplike?: number, seat?: number, page?: number, limit?: number, price?: number}
){

    // const carProviders = await getCarProviders()
    await new Promise(resolve => setTimeout(resolve, 300));
    let newUrl = `${process.env.NEXT_PUBLIC_API}/api/v1/carProviders?` + url
    // let newUrl = "https://localhost:5000/api/v1/carProviders?" + url
    console.log(newUrl)
    const response = await fetch(newUrl)
    if(!response.ok){
        throw new Error("Failed to fetch car providers")
    }
    
    return await response.json()
}