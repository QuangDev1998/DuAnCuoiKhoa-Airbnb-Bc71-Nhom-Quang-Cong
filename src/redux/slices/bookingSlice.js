import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalCalendarOpen: false,
};

const bookingSlice = createSlice({
  name: "bookingSlice",
  initialState,
  reducers: {
    setIsModalCalendarOpen: (state, action) => {
      state.isModalCalendarOpen = action.payload;
    },
  },
});

export const { setIsModalCalendarOpen } = bookingSlice.actions;

export default bookingSlice.reducer;
