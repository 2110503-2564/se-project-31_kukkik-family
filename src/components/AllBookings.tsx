"use client"
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getBookings } from "@/libs/getBookings";
import { deleteBookings } from "@/libs/deleteBooking";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { updateBooking } from "@/libs/updateBooking";
import updateStatus from "@/libs/updateStatus";
import { now } from "next-auth/client/_utils";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs"; // Import dayjs for formatting
import Image from "next/image";

const AllBookings = () => {
  const { data: session } = useSession();
  const token = session?.user?.token;

  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<BookingData | null>(null); // Selected for editing

  // Form state
  const [updatedStartDate, setUpdatedStartDate] = useState<string>("");
  const [updatedEndDate, setUpdatedEndDate] = useState<string>("");

  useEffect(() => {
    if (session) {
      console.log("SESSION DATA:", session);
    }
  }, [session]);
  

  useEffect(() => {
    const fetchBookings = async () => {
      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      try {
        
        const data = await getBookings(token); // Fetch bookings with token
        console.log("Fetched Bookings:", data.data);
        setBookings(data.data);
        setLoading(false);
        // Debugging the booking status after fetching the bookings
        data.data.forEach((booking: BookingData) => {
        console.log("Booking Status:", booking.status);
      });

      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Failed to fetch bookings");
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!token) {
    return <div>No Token</div>;
  }

  const handleUpdate = async () => {
    if (!selectedBooking || !updatedStartDate || !updatedEndDate) return;

    try {
      await updateBooking(token, selectedBooking._id, {
        startDate: updatedStartDate,
        endDate: updatedEndDate,
        createAt: new Date(now()), // Add creation time as a new date
      });

      setBookings(bookings.map((b) =>
        b._id === selectedBooking._id
          ? {
              ...b,
              startDate: updatedStartDate,
              endDate: updatedEndDate,
              createdAt: new Date(now()).toISOString(),
            }
          : b
      ));

      setSelectedBooking(null); // Close modal after update

    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const handleStatusChange = async (booking: BookingData, newStatus: "received" | "returned") => {
    try {
      console.log(booking.status)
      await updateStatus(booking._id, token, newStatus);

      if (newStatus === "returned") {
        //await returnBooking(booking._id, token);
        setBookings(bookings.filter((b) => b._id !== booking._id)); // Remove from UI after "return"
        console.log(booking.status)
      } else {
        //await updateStatus(booking.carProvider._id, token, newStatus);
        // If status is "received", update the booking status in UI
        setBookings(bookings.map((b) =>
          b._id === booking._id ? { ...b, status: newStatus } : b
        ));
        console.log(booking.status)
      }
    } catch (error) {
      console.error("Error changing status:", error);
    }
  };

  //console.log(bookings);


  return (
    <div className="p-6 bg-[#FFD8A3] min-h-screen">

      <h1 className="text-3xl font-semibold text-center mb-6">All Bookings</h1>
      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings available.</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking._id} className="bg-white p-6 mb-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <table>
              <tr>
                <td>
                  <div className="mx-5">
                    <Image src={booking.carProvider.picture} alt={booking.carProvider.name}
                    width={200}  // Set a fixed width
                    height={200}/>
                  </div>
                </td>
                <td>
                  <div className="mx-5">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">{booking.carProvider.name}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <p className="text-gray-700"><strong>Book by:</strong> {booking.user}</p>
                      <p className="text-gray-700"><strong>Start Date:</strong> {new Date(booking.startDate).toLocaleDateString()}</p>
                      <p className="text-gray-700"><strong>End Date:</strong> {new Date(booking.endDate).toLocaleDateString()}</p>
                      <p className="text-gray-700"><strong>Car Provider:</strong> {booking.carProvider.name}</p>
                      <p className="text-gray-700"><strong>Phone:</strong> {booking.carProvider.tel}</p>
                      <p className="text-gray-700"><strong>Created At:</strong> {new Date(booking.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                </td>
              </tr>
            </table>
            
            <p className="text-gray-700">Booking Status: {booking.status}</p>

            <button className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 hover:shadow-lg transition duration-300 ease-in-out my-3 mx-1"
              onClick={async () => {
                await deleteBookings(token, booking._id); // Call API
                setBookings(bookings.filter((b) => b._id !== booking._id)); // Remove from UI
              }}>
              Remove
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg focus:ring-2 focus:ring-blue-300 transition duration-300 ease-in-out my-3 mx-1"
              onClick={() => {
                setSelectedBooking(booking);
                setUpdatedStartDate(booking.startDate);
                setUpdatedEndDate(booking.endDate);
              }}>
              Edit
            </button>
            {/* Add received and return buttons */}
            { booking.status === "rented" && booking.user === session?.user.user_id && (
              <button className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg focus:ring-2 focus:ring-green-300 transition duration-300 ease-in-out my-3 mx-1"
                onClick={() => handleStatusChange(booking, "received")}>
                Received
              </button>
            )}

            {booking.status === "received" && booking.user === session?.user.user_id && (
              <button className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 hover:shadow-lg focus:ring-2 focus:ring-yellow-300 transition duration-300 ease-in-out my-3 mx-1"
                onClick={() => handleStatusChange(booking, "returned")}>
                Return
              </button>
            )}
          </div>
        ))
      )}

      {selectedBooking && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 m-3">
            <h2 className="text-2xl font-semibold mb-4 text-black">Edit Booking</h2>
  
            <div className="my-4">
              {/* Start Date */}
              <label className="block mb-2 text-black">New Start Date:</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                  className="bg-white m-4" 
                  label="Start Date"
                  value={dayjs(updatedStartDate)} // Convert string date to Dayjs
                  onChange={(value) => {
                    setUpdatedStartDate(value?.toISOString() || ""); // Convert to ISO string
                  }}
                />
              </LocalizationProvider>
            </div>
            

            {/* End Date */}
            <div className="my-4">
              <label className="block mb-2 text-black">New End Date:</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                  className="bg-white" 
                  label="End Date"
                  value={dayjs(updatedEndDate)} // Convert string date to Dayjs
                  onChange={(value) => {
                    setUpdatedEndDate(value?.toISOString() || ""); // Convert to ISO string
                  }}
                />
              </LocalizationProvider>
            </div>
            

            <div className="flex justify-end mt-4">
              <button 
                className="px-4 py-2 bg-green-500 text-white rounded-lg mr-2"
                onClick={handleUpdate}
              >
                Save
              </button>
              <button 
                className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                onClick={() => setSelectedBooking(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBookings;
