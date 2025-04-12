"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";  

export default function SortButtons() {
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [showSeatDropdown, setShowSeatDropdown] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState("Price: Low to High");
  const [selectedSeat, setSelectedSeat] = useState("Seat: Low to High");
  const [activeButton, setActiveButton] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize button states from URL parameters
    const toplike = searchParams.get('toplike');
    const seat = searchParams.get('seat');
    const price = searchParams.get('price');

    if (toplike === "true") {
      setActiveButton("Most Popular");
    } else if (seat === "low") {
      setSelectedSeat("Seat: Low to High");
      setActiveButton("Seat: Low to High");
    } else if (seat === "high") {
      setSelectedSeat("Seat: High to Low");
      setActiveButton("Seat: High to Low");
    } else if (price === "low") {
      setSelectedPrice("Price: Low to High");
      setActiveButton("Price: Low to High");
    } else if (price === "high") {
      setSelectedPrice("Price: High to Low");
      setActiveButton("Price: High to Low");
    }
  }, [searchParams]);

  const updateUrl = (newActiveButton: any) => {
    const params = new URLSearchParams();
    
    // Clear previous sort parameters
    params.delete('toplike');
    params.delete('seat');
    params.delete('price');
    
    // Set new sort parameter based on active button
    if (newActiveButton) {
      if (newActiveButton === "Most Popular") {
        params.set('toplike', 'true');
      } else if (newActiveButton === "Seat: Low to High") {
        params.set('seat', 'low');
      } else if (newActiveButton === "Seat: High to Low") {
        params.set('seat', 'high');
      } else if (newActiveButton === "Price: Low to High") {
        params.set('price', 'low');
      } else if (newActiveButton === "Price: High to Low") {
        params.set('price', 'high');
      }
    }
    
    // Preserve other filter parameters
    const preserveParams = ['minprice', 'maxprice', 'minseat', 'maxseat', 'relevance', 'province'];
    preserveParams.forEach(param => {
      const value = searchParams.get(param);
      if (value) params.set(param, value);
    });

    router.push(`/cars?${params.toString()}`);
  };

  const handleButtonClick = (buttonType: any) => {
    const newActiveButton = activeButton === buttonType ? "" : buttonType;
    setActiveButton(newActiveButton);
    updateUrl(newActiveButton);
    setShowSeatDropdown(false);
    setShowPriceDropdown(false);
  };

  const handleDropdownSelect = (type: any, value: any, displayText: any) => {
    if (type === 'seat') {
      setSelectedSeat(displayText);
      setActiveButton(displayText);
    } else {
      setSelectedPrice(displayText);
      setActiveButton(displayText);
    }
    updateUrl(displayText);
    setShowSeatDropdown(false);
    setShowPriceDropdown(false);
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-600">Sort by</span>
      <div className="flex gap-2">
        <button 
          className={`px-3 py-1.5 text-sm rounded-full ${
            activeButton === "Most Popular" 
              ? "bg-orange-500 text-white" 
              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
          }`}
          onClick={() => handleButtonClick("Most Popular")}
        >
          Most Popular
        </button>
        
        {/* Seat Sort Button */}
        <div className="relative">
          <div className={`flex items-center px-3 py-1.5 text-sm rounded-full ${
            activeButton.startsWith("Seat:") 
              ? "bg-orange-500 text-white" 
              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
          }`}>
            <button 
              className="flex-1 text-left"
              onClick={() => handleButtonClick(selectedSeat)}
            >
              {selectedSeat}
            </button>
            <button 
              className="ml-1 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                setShowSeatDropdown(!showSeatDropdown);
                setShowPriceDropdown(false);
              }}
            >
              ▼
            </button>
          </div>
          {showSeatDropdown && (
            <div className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10 min-w-full">
              <button 
                className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 whitespace-nowrap"
                onClick={() => handleDropdownSelect('seat', 'low', 'Seat: Low to High')}
              >
                Seat: Low to High 
              </button>
              <button 
                className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 whitespace-nowrap"
                onClick={() => handleDropdownSelect('seat', 'high', 'Seat: High to Low')}
              >
                Seat: High to Low
              </button>
            </div>
          )}
        </div>
        
        {/* Price Sort Button */}
        <div className="relative">
          <div className={`flex items-center px-3 py-1.5 text-sm rounded-full ${
            activeButton.startsWith("Price:") 
              ? "bg-orange-500 text-white" 
              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
          }`}>
            <button 
              className="flex-1 text-left"
              onClick={() => handleButtonClick(selectedPrice)}
            >
              {selectedPrice}
            </button>
            <button 
              className="ml-1 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                setShowPriceDropdown(!showPriceDropdown);
                setShowSeatDropdown(false);
              }}
            >
              ▼
            </button>
          </div>
          {showPriceDropdown && (
            <div className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10 min-w-full">
              <button 
                className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 whitespace-nowrap"
                onClick={() => handleDropdownSelect('price', 'low', 'Price: Low to High')}
              >
                Price: Low to High
              </button>
              <button 
                className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 whitespace-nowrap"
                onClick={() => handleDropdownSelect('price', 'high', 'Price: High to Low')}
              >
                Price: High to Low
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}