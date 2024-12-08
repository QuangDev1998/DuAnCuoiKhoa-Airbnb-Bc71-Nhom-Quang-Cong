import { createAsyncThunk } from "@reduxjs/toolkit";
import { phongServices } from "../../services/phongServices";
import { binhLuanServices } from "../../services/binhLuanServices";

export const fetchDetailRoomAction = createAsyncThunk(
  "detailRoomSlice/fetchDetailRoomAction",
  async (id, { rejectWithValue }) => {
    try {
      const result = await phongServices.getPhongInfo(id);
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchListCommentByIdRoomAction = createAsyncThunk(
  "detailRoomSlice/fetchListCommentAction",
  async (id, { rejectWithValue }) => {
    try {
      const result = await binhLuanServices.getListCommentByIdRoom(id);
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
