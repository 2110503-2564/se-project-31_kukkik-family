import Slider from "@mui/material/Slider";

export default function PriceAndSeat({minimum, maximumSeat, maximumPrice, minSeat, maxSeat, minPrice, maxPrice, seatRange, priceRange, setterSeatRange, setterPriceRange, setterMinSeat, setterMaxSeat, setterMinPrice, setterMaxPrice}: {minimum: number, maximumSeat: number, maximumPrice: number, minSeat: number, maxSeat: number, minPrice: number, maxPrice: number, seatRange: number[], priceRange: number[], setterSeatRange: (seat: number[]) => void, setterPriceRange: (price: number[]) => void, setterMinSeat: (seat: number) => void, setterMaxSeat: (seat: number) => void, setterMinPrice: (price: number) => void, setterMaxPrice: (price: number) => void}) {

  return (
        <div>
            <div>
          <div className="flex justify-between">
            <label htmlFor="minSeat" className="text-gray-500 text-sm font-medium">
              Min Seats
            </label>
            <label htmlFor="maxSeat" className="text-gray-500 text-sm font-medium">
              Max Seats
            </label>
          </div>
            <Slider
              value={seatRange}
              onChange={(e, newValue) => setterSeatRange(newValue as number[])}
              valueLabelDisplay="auto"
              min={minimum}
              max={maximumSeat}
              step={1}
              sx={{
                color: "orange",
                "& .MuiSlider-thumb": {
                  backgroundColor: "orange",
                },
                "& .MuiSlider-track": {
                  backgroundColor: "orange",
                },
                "& .MuiSlider-rail": {
                  backgroundColor: "#FFD580",
                },
              }}
            />
          <div className="flex justify-between">
            <input
              id="minSeat"
              type="number"
              value={minSeat}
              min={minimum}     
              max={maximumSeat}
              onChange={(e) => setterMinSeat(Number(e.target.value))}
              className="w-1/2 p-2 rounded-md border border-gray-400"
            />
            <input
              id="maxSeat"
              type="number"
              value={maxSeat}
              min={minimum}
              max={maximumSeat}
              onChange={(e) => setterMaxSeat(Number(e.target.value))}
              className="w-1/2 p-2 rounded-md border border-gray-400"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mt-2">
            <label htmlFor="minPrice" className="text-gray-500 text-sm font-medium">
              Min Price
            </label>
            <label htmlFor="maxPrice" className="text-gray-500 text-sm font-medium">
              Max Price
            </label>
          </div>
          <Slider
              value={priceRange}
              onChange={(e, newValue) => setterPriceRange(newValue as number[])}
              valueLabelDisplay="auto"
              min={0}
              max={maximumPrice}
              step={1}
              sx={{
                color: "orange",
                "& .MuiSlider-thumb": {
                  backgroundColor: "orange",
                },
                "& .MuiSlider-track": {
                  backgroundColor: "orange",
                },
                "& .MuiSlider-rail": {
                  backgroundColor: "#FFD580",
                },
              }}
            />
          <div className="flex justify-between">
            <input
              id="minPrice"
              type="number"
              value={minPrice}
              min={minimum}
              max={maximumPrice}
              onChange={(e) => setterMinPrice(Number(e.target.value))}
              className="w-1/2 p-2 rounded-md border border-gray-400"
            />
            <input
              id="maxPrice"
              type="number"
              value={maxPrice}
              min={minimum}
              max={maximumPrice}
              onChange={(e) => setterMaxPrice(Number(e.target.value))}
              className="w-1/2 p-2 rounded-md border border-gray-400"
            />
          </div>
        </div>  
        </div>
  );
}