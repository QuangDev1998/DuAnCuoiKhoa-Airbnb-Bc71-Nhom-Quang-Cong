import { createAsyncThunk } from "@reduxjs/toolkit";
import { phongServices } from "../../services/phongServices";

export const fetchListPhongAction = createAsyncThunk(
  "quanLyPhongSlice/fetchListPhongAction",
  async ({ currentPage, valueInput }) => {
    const result = await phongServices.findPhong(currentPage, 10, valueInput);
    return result.data.content;
  }
);

export const fetchPhongInfoAction = createAsyncThunk(
  "quanLyPhongSlice/fetchPhongInfoAction",
  async (id) => {
    const result = await phongServices.getPhongInfo(id);
    return result.data.content;
  }
);
