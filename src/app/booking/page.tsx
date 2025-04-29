"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addBooking } from "@/redux/features/bookSlice";
import { Button, Snackbar, Alert, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import DateReserve from "@/components/DateReserve";
import { Dayjs } from "dayjs";
import { createBooking } from "@/libs/createBooking";
import { useSession } from "next-auth/react";
import getCarProviders from "@/libs/getCarProviders";
import getCarProvider from "@/libs/getCarProvider";
import { deductCoins } from "@/libs/deductCoins";

// booking page
export default function Booking() {
  const searchParams = useSearchParams();
  const initialCarId = searchParams.get("carProviderId");

  console.log("Car ID:", initialCarId);

  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession(); // Move useSession here

  const [carId, setCarId] = useState<string | null>(initialCarId);
  const [dailyRate, setDailyRate] = useState<number | null>(null);
  const [carProviders, setCarProviders] = useState<any[]>([]);
  const [name, setName] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [pickupDate, setPickupDate] = useState<Dayjs | null>(null);
  const [returnDate, setReturnDate] = useState<Dayjs | null>(null);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  // ดึงข้อมูล car providers จาก API
useEffect(() => {
  const fetchCarProviders = async () => {
    try {
      const providers = await getCarProviders("");  // เรียกใช้งาน getCarProviders
      if (providers && providers.data) {  // ตรวจสอบว่า providers มี field 'data' หรือไม่
        setCarProviders(providers.data);  // เก็บข้อมูล car providers ที่ได้จาก API
      } else {
        console.error("Failed to load car providers, no data found");
        setSnackbarMessage("No car providers found.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error fetching car providers:", error);
      setSnackbarMessage("Failed to load car providers");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  fetchCarProviders();
}, []);  // ทำแค่ครั้งแรกเมื่อ component โหลด

useEffect(() => {
  const fetchCarDetails = async () => {
    if (carId) {
      try {
        const result = await getCarProvider(carId);
        console.log("Car provider result:", result);

        const rate = result?.data?.dailyrate;
        console.log("Daily rate:", rate);
        if (typeof rate === "number") {
          setDailyRate(rate);
        } else {
          setDailyRate(null);
          console.warn("Invalid daily rate:", rate);
        }
      } catch (error) {
        console.error("Error fetching car provider details:", error);
        setDailyRate(null);
      }
    }
  };

  fetchCarDetails(); 
}, [carId]); 

const makeBooking = async (): Promise<boolean> => {
  if (pickupDate && returnDate && carId) {
    const bookingData = {
      startDate: pickupDate.format("YYYY-MM-DD"),
      endDate: returnDate.format("YYYY-MM-DD"),
    };

    const token = session?.user?.token;

    if (!token) {
      setSnackbarMessage("Please login first.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return false;
    }

    try {
      const response = await createBooking(token, carId, bookingData);

      if (response.success) {
        dispatch(addBooking(response));
        setSnackbarMessage("Booking successful!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        return true;
      } else {
        setSnackbarMessage("Booking failed. Please try again.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
        return false;
      }
    } catch (error: any) {
      console.error("Error booking car:", error);

      if (error.message.includes("has already booked 3 cars")) {
        setSnackbarMessage("You have already booked 3 cars.");
      } else {
        setSnackbarMessage(error.message || "Booking failed. Please try again.");
      }

      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return false;
    }
  } else {
    setSnackbarMessage("Please fill in all the fields.");
    setSnackbarSeverity("error");
    setOpenSnackbar(true);
    return false;
  }
};

  return (
    <main className="flex flex-col items-center space-y-4 py-20 bg-[#FFD8A3] min-h-[90vh]">
      <div className="bg-gray-50 shadow-lg rounded-lg p-6 w-full max-w-lg">
        <div className="text-xl font-medium text-center text-gray-700 mb-4 bg-gray-20">Car Booking</div>
{/* 
        Dropdown for car provider selection */}
        <FormControl fullWidth variant="outlined" className="mb-4">
          <InputLabel>Car Provider</InputLabel>
          <Select
            value={carId || ""}
            onChange={(e) => setCarId(e.target.value)}
            label="Car Provider"
          >
            {carProviders?.map((provider) => (
              <MenuItem key={provider._id} value={provider._id}>
                {provider.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

   

        <Button
          type="submit"
          name="Book Car"
          className="w-full rounded-md bg-sky-600 text-white py-2 mt-4 hover:bg-sky-700 transition"
          onClick={async () => {
            const bookingSuccess = await makeBooking();
          
            const token = session?.user?.token;
            
            //หักเงิน
            if (bookingSuccess && token && dailyRate !== null) {
              try {
                await deductCoins(token, dailyRate);
                console.log("Coins deducted:", dailyRate);
              } catch (error) {
                console.error("Error during coin deduction:", error);
              }
            }
          }}          
        >
          Book Car
        </Button>
      </div>

      {/* Snackbar for friendly alert messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </main>
  );
}
