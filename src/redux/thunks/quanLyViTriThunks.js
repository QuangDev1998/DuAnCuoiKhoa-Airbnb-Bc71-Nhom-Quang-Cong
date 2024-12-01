import { createAsyncThunk } from "@reduxjs/toolkit";
import { viTriServices } from "../../services/viTriServices";
export const fetchListViTriAction = createAsyncThunk(
  "quanLyViTriSlice/fetchListViTriAction",
  async (_, { rejectWithValue }) => {
    try {
      const result = await viTriServices.getListViTri();
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchViTriInfoAction = createAsyncThunk(
  "quanLyViTriSlice/fetchViTriInfoAction",
  async (id, { rejectWithValue }) => {
    try {
      const result = await viTriServices.getViTriInfo(id);
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
