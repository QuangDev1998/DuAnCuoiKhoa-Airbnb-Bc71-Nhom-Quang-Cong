import { createSlice } from "@reduxjs/toolkit";
import { addDays } from "date-fns";

const initialState = {
  totalDay: 7,
  ngayDen: new Date(),
  ngayDi: addDays(new Date(), 7),
  soLuongKhach: 1,
  isModalCalendarOpen: false,
};

const bookingSlice = createSlice({
  name: "bookingSlice",
  initialState,
  reducers: {
    setIsModalCalendarOpen: (state, action) => {
      state.isModalCalendarOpen = action.payload;
    },
    setTotalDay: (state, action) => {
      state.totalDay = action.payload;
    },
    setSoLuongKhach: (state, action) => {
      state.soLuongKhach = action.payload;
    },
    setNgayDen: (state, action) => {
      state.ngayDen = action.payload;
    },
    setNgayDi: (state, action) => {
      state.ngayDi = action.payload;
    },
  },
});

export const {
  setIsModalCalendarOpen,
  setTotalDay,
  setSoLuongKhach,
  setNgayDen,
  setNgayDi,
} = bookingSlice.actions;

export default bookingSlice.reducer;
