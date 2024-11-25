import { createAsyncThunk } from "@reduxjs/toolkit";
import { nguoiDungServices } from "../../services/nguoiDungServices";
export let fetchListUserAction = createAsyncThunk(
  "quanLyNguoiDungSlice/fetchListUserAction",
  async () => {
    try {
      const result = await nguoiDungServices.getListUser();
      return result.data.content;
    } catch (error) {
      console.log(error);
    }
  }
);
export let fetchUserInfoAction = createAsyncThunk(
  "quanLyNguoiDungSlice/fetchUserInfoAction",
  async (userId, thunkAPI) => {
    try {
      const result = await nguoiDungServices.getUserInfo(userId);
      return result.data.content;
    } catch (error) {
      console.log(error);
    }
  }
);
