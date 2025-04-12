"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import PriceAndSeat from "./PriceAndSeat";
// import { Search } from "@mui/icons-material";

export default function Filter() {

  let searchParams = useSearchParams();
  let iniminprice: number = searchParams.get('minprice') ? Number(searchParams.get('minprice')) : 0;
  let inimaxprice: number = searchParams.get('maxprice') ? Number(searchParams.get('maxprice')) : 50000;
  let iniminseat: number = searchParams.get('minseat') ? Number(searchParams.get('minseat')) : 1;
  let inimaxseat: number = searchParams.get('maxseat') ? Number(searchParams.get('maxseat')) : 300;
  let inirelevance = searchParams.get('relevance');
  let iniprovince = searchParams.get('province');
  
  const maximumPrice = 50000;
  const maximumSeat = 300;
  const minimum = 1;
  
  const [priceRange, setPriceRange] = useState([iniminprice ? iniminprice : 0, inimaxprice ? inimaxprice : 50000]);
  const [seatRange, setSeatRange] = useState([iniminseat ? iniminseat : 1, inimaxseat ? inimaxseat :  300]);

  const [minPrice, setMinPrice] = useState(iniminprice ? iniminprice : 0);
  const [maxPrice, setMaxPrice] = useState(inimaxprice ? inimaxprice : 50000);
  const [minSeat, setMinSeat] = useState(iniminseat ? iniminseat : 1);
  const [maxSeat, setMaxSeat] = useState(inimaxseat ? inimaxseat :  300);

  const setterPriceRange = (price: number[]) => {
    setPriceRange(price);
    setMinPrice(price[0]);
    setMaxPrice(price[1]);
  }

  const setterSeatRange = (seat: number[]) => {
    setSeatRange(seat);
    setMinSeat(seat[0]);
    setMaxSeat(seat[1]);
  }

  const setterMinPrice = (price: number) => {
    let newMinPrice;

    if (price > maximumPrice ) {
      newMinPrice = maximumPrice;
    } else if (price < minimum) {
      newMinPrice = minimum;
    } else if (price > maxPrice) {
      newMinPrice = maxPrice;
    } else {
      newMinPrice = price;
    }

    setMinPrice(newMinPrice);
    setPriceRange([newMinPrice, priceRange[1]]);
  }

  const setterMaxPrice = (price: number) => {
    let newMaxPrice;

    if (price > maximumPrice) {
      newMaxPrice = maximumPrice;
    } else if (price < minimum) {
      newMaxPrice = minimum;
    } else if (price < minPrice) {
      newMaxPrice = minPrice;
    } else {
      newMaxPrice = price;
    }

    setMaxPrice(newMaxPrice);
    setPriceRange([priceRange[0], newMaxPrice]);
  }

  const setterMinSeat = (seat: number) => {
    let newMinSeat;

    if (seat > maximumSeat) {
      newMinSeat = maximumSeat;
    } else if (seat < minimum) {
      newMinSeat = minimum;
    } else if (seat > maxSeat) {
      newMinSeat = maxSeat;
    } else {
      newMinSeat = seat;
    }

    setMinSeat(newMinSeat);
    setSeatRange([newMinSeat, seatRange[1]]);
  }

  const setterMaxSeat = (seat: number)=>{
    if(seat > maximumSeat){
      setMaxSeat(maximumSeat);
    }
    else if(seat < minimum){
      setMaxSeat(minimum);
    } else if (seat < minSeat) {
      setMaxSeat(minSeat);
    } else{
      setMaxSeat(seat);
    }
    setSeatRange([seatRange[0], maxSeat]);
  }
  
  const router = useRouter();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => { 
    let url = `/cars?minprice=${priceRange[0]}&maxprice=${priceRange[1]}&minseat=${seatRange[0]}&maxseat=${seatRange[1]}&relevance=${searchQuery}&province=${province}&`;
    let toplike = searchParams.get('toplike');
    let seat = searchParams.get('seat');
    let page = searchParams.get('page');
    let limit = searchParams.get('limit');
    let price = searchParams.get('price');
    
    if(toplike != "" && toplike != null){
        url += `toplike=${toplike}&`;
    }
    if(seat != "" && seat != null){
        url += `seat=${seat}&`;
    }
    if(page != "" && page != null){
        url += `page=${page}&`;
    }
    if(limit != "" && limit != null){
        url += `limit=${limit}&`;
    }
    if(price != "" && price != null){
        url += `price=${price}&`;
    }
  router.push(url);

  };
  
  const [searchQuery, setSearchQuery] = useState(inirelevance ? inirelevance : "");
  const [province, setProvince] = useState(iniprovince ? iniprovince : "");

  return (
    <div className="h-full w-full px-5 py-5">
      <h2 className="text-xl font-semibold mt-5 mb-2">Filters</h2>
      
      <div className="space-y-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search cars..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {/* <Search className="absolute left-3 top-2.5 text-gray-400" /> */}
        </div>
        <PriceAndSeat
          minimum={minimum}
          maximumSeat={maximumSeat}
          maximumPrice={maximumPrice}
          minSeat={minSeat}
          maxSeat={maxSeat}
          minPrice={minPrice}
          maxPrice={maxPrice}
          seatRange={seatRange}
          priceRange={priceRange}
          setterSeatRange={setterSeatRange}
          setterPriceRange={setterPriceRange}
          setterMinSeat={setterMinSeat}
          setterMaxSeat={setterMaxSeat}
          setterMinPrice={setterMinPrice}
          setterMaxPrice={setterMaxPrice}
        />  
        <div>
          <h3 className="text-sm font-medium mb-2">Province</h3>
          <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            onChange={(e) => setProvince(e.target.value)}
          >
            <option value="">All</option>
            <option value="Bangkok">Bangkok</option>
            <option value="Chiang Mai">Chiang Mai</option>
            <option value="Phuket">Phuket</option>
            <option value="Pattaya">Pattaya</option>
          </select>
        </div>
      </div>

        <button className="bg-[#FE7F3F] text-white border-none 
        font-bold py-3 px-5 rounded-md shadow-lg transition-transform duration-300 hover:scale-105 w-full text-center mt-5"
        onClick={handleClick}>
          Search
        </button>
    </div>
  );
};

