import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  booking: [],
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    addBooking: (state, action) => {
      state.booking.push(action.payload);
    },
    clearBooking: (state) => {
      state.booking = initialState.booking;
    },
  },
});

export const { addBooking, clearBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
