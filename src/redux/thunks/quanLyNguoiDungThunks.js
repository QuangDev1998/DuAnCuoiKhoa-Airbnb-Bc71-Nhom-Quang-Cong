import { createAsyncThunk } from "@reduxjs/toolkit";
import { nguoiDungServices } from "../../services/nguoiDungServices";
export const fetchListUserAction = createAsyncThunk(
  "quanLyNguoiDungSlice/fetchListUserAction",
  async ({ currentPage = 1, keyword = "" }) => {
    const result = await nguoiDungServices.findUser(currentPage, 10, keyword);
    return result.data.content;
  }
);
export const fetchUserInfoAction = createAsyncThunk(
  "quanLyNguoiDungSlice/fetchUserInfoAction",
  async (userId) => {
    const result = await nguoiDungServices.getUserInfo(userId);
    return result.data.content;
  }
);
