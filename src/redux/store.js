import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import quanLyNguoiDungSlice from "./slices/quanLyNguoiDungSlice";
import quanLyViTriSlice from "./slices/quanLyViTriSlice";
import quanLyPhongSlice from "./slices/quanLyPhongSlice";
import quanLyBookingSlice from "./slices/quanLyBookingSlice";
import infoUserSlice from "./slices/infoUserSlice";
import detailRoomSlice from "./slices/detailRoomSlice";
import bookingSlice from "./slices/bookingSlice";

export const store = configureStore({
  reducer: {
    userSlice,
    quanLyNguoiDungSlice,
    quanLyViTriSlice,
    quanLyPhongSlice,
    quanLyBookingSlice,
    infoUserSlice,
    detailRoomSlice,
    bookingSlice,
  },
});
