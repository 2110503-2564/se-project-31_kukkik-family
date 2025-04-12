"use client";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { Dayjs } from "dayjs";

export default function DateReserve({
  onDateChange,
  onReturnDateChange,
}: {
  onDateChange: Function;
  onReturnDateChange: Function;
}) {
  const [pickupDate, setPickupDate] = useState<Dayjs | null>(null);
  const [returnDate, setReturnDate] = useState<Dayjs | null>(null);

  return (
    <div className="bg-slate-100 rounded-lg space-x-5 w-fit px-10 py-5 flex flex-row justify-center items-center">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          className="bg-white"
          label="Pickup Date"
          value={pickupDate}
          onChange={(value) => {
            setPickupDate(value);
            onDateChange(value); // ส่งวันที่รับรถ
          }}
        />
        <DatePicker
          className="bg-white"
          label="Return Date"
          value={returnDate}
          onChange={(value) => {
            setReturnDate(value);
            onReturnDateChange(value); // ส่งวันที่คืนรถ
          }}
        />
      </LocalizationProvider>
    </div>
  );
}
