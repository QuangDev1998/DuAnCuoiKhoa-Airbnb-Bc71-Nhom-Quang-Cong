import { createAsyncThunk } from "@reduxjs/toolkit";
import { viTriServices } from "../../services/viTriServices";
export const fetchListViTriAction = createAsyncThunk(
  "quanLyViTriSlice/fetchListViTriAction",
  async () => {
    try {
      const result = await viTriServices.getListViTri();
      return result.data.content;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchViTriInfoAction = createAsyncThunk(
  "quanLyViTriSlice/fetchViTriInfoAction",
  async (id) => {
    try {
      const result = await viTriServices.getViTriInfo(id);
      return result.data.content;
    } catch (error) {
      console.log(error);
    }
  }
);
