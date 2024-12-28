import { createSlice } from "@reduxjs/toolkit";
import { addDays } from "date-fns";

const initialState = {
  totalDay: 7,
  ngayDen: new Date(),
  ngayDi: addDays(new Date(), 7),
  soLuongKhach: 1,
  tienTruocThue: null,
  isModalCalendarOpen: false,
  isModalPaymentOpen: false,
  isModalReBookingOpen: false,
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
    setTienTruocThue: (state, action) => {
      state.tienTruocThue = action.payload;
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
    setIsModalPaymentOpen: (state, action) => {
      state.isModalPaymentOpen = action.payload;
    },
    setIsModalReBookingOpen: (state, action) => {
      state.isModalReBookingOpen = action.payload;
    },
  },
});

export const {
  setIsModalCalendarOpen,
  setTotalDay,
  setTienTruocThue,
  setSoLuongKhach,
  setNgayDen,
  setNgayDi,
  setIsModalPaymentOpen,
  setIsModalReBookingOpen,
} = bookingSlice.actions;

export default bookingSlice.reducer;
