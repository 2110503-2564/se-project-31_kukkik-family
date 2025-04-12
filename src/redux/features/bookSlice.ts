import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BookState = {
    bookItems: BookingData[];
}

const initialState: BookState = { bookItems: [] }

export const bookSlice = createSlice ({
    name: "book",
    initialState,
    reducers: {
        addBooking: (state, action: PayloadAction<BookingData>) => {
            const index = state.bookItems.findIndex(
                (item) =>
                    item.carProvider === action.payload.carProvider &&
                    item.startDate === action.payload.startDate
            );
            if (index !== -1) {
                // if booking in same place and date, use current booking
                state.bookItems[index] = action.payload;
            } else {
                // if do not have booking, add new booking
                state.bookItems.push(action.payload);
            }
        },
        removeBooking: (state, action:PayloadAction<BookingData>)=>{
            const remainItems = state.bookItems.filter(obj => {
                return ((obj.carProvider !== action.payload.carProvider)
                || (obj.startDate !== action.payload.startDate)
                || (obj.user !== action.payload.user)
                || (obj.endDate !== action.payload.endDate))
            })
            state.bookItems = remainItems
        }

    }

});

export const {addBooking, removeBooking} = bookSlice.actions;
export default bookSlice.reducer;