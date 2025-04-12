"use client";

import { useState } from "react";

type SortKey = "relevance" | "toplike" | "seat" | "price-low" | "price-high";

interface SortComponentProps {
  onSortChange: (sortKey: SortKey) => void;
}

export default function SortComponent({ onSortChange }: SortComponentProps) {
  const [selectedSort, setSelectedSort] = useState<SortKey>("relevance");

  const handleSortChange = (sortKey: SortKey) => {
    setSelectedSort(sortKey);
    onSortChange(sortKey);
  };

  return (
    <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg">
      <span className="text-gray-600">Sort by</span>
      <button 
        className={`px-3 py-1 rounded ${selectedSort === "relevance" ? "text-blue-500" : "text-gray-500"}`} 
        onClick={() => handleSortChange("relevance")}
      >
        Relevance
      </button>
      <button 
        className={`px-3 py-1 rounded ${selectedSort === "toplike" ? "text-blue-500" : "text-gray-500"}`} 
        onClick={() => handleSortChange("toplike")}
      >
        Toplike
      </button>
      <button 
        className={`px-3 py-1 rounded ${selectedSort === "seat" ? "text-blue-500" : "text-gray-500"}`} 
        onClick={() => handleSortChange("seat")}
      >
        Seat Low to High
      </button>
      <select 
        className="px-3 py-1 rounded text-gray-500"
        value={selectedSort}
        onChange={(e) => handleSortChange(e.target.value as SortKey)}
      >
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
      </select>
    </div>
  );
}