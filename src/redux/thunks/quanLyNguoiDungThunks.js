import { createAsyncThunk } from "@reduxjs/toolkit";
import { nguoiDungServices } from "../../services/nguoiDungServices";
export const fetchListUserAction = createAsyncThunk(
  "quanLyNguoiDungSlice/fetchListUserAction",
  async ({ currentPage, valueInput }, { rejectWithValue }) => {
    try {
      const result = await nguoiDungServices.findUser(
        currentPage,
        10,
        valueInput
      );
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const fetchUserInfoAction = createAsyncThunk(
  "quanLyNguoiDungSlice/fetchUserInfoAction",
  async (userId, { rejectWithValue }) => {
    try {
      const result = await nguoiDungServices.getUserInfo(userId);
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
