import { createAsyncThunk } from "@reduxjs/toolkit";
import { phongServices } from "../../services/phongServices";

export const fetchListPhongAction = createAsyncThunk(
  "quanLyPhongSlice/fetchListPhongAction",
  async (_, { rejectWithValue }) => {
    try {
      const result = await phongServices.getListPhong();
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchPhongInfoAction = createAsyncThunk(
  "quanLyPhongSlice/fetchPhongInfoAction",
  async (id, { rejectWithValue }) => {
    try {
      const result = await phongServices.getPhongInfo(id);
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
