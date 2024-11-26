import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import quanLyNguoiDungSlice from "./slices/quanLyNguoiDungSlice";
import quanLyViTriSlice from "./slices/quanLyViTriSlice";
import quanLyPhongSlice from "./slices/quanLyPhongSlice";

export const store = configureStore({
  reducer: {
    userSlice,
    quanLyNguoiDungSlice,
    quanLyViTriSlice,
    quanLyPhongSlice,
  },
});
