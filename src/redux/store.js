import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import quanLyNguoiDungSlice from "./slices/quanLyNguoiDungSlice";

export const store = configureStore({
  reducer: {
    userSlice,
    quanLyNguoiDungSlice,
  },
});
