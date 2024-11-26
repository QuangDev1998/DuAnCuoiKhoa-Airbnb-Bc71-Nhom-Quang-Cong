import { createAsyncThunk } from "@reduxjs/toolkit";
import { phongServices } from "../../services/phongServices";

export const fetchListPhongAction = createAsyncThunk(
  "quanLyPhongSlice/fetchListPhongAction",
  async () => {
    try {
      const result = await phongServices.getListPhong();
      return result.data.content;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchPhongInfoAction = createAsyncThunk(
  "quanLyPhongSlice/fetchPhongInfoAction",
  async (id) => {
    try {
      const result = await phongServices.getPhongInfo(id);
      return result.data.content;
    } catch (error) {
      console.log(error);
    }
  }
);
