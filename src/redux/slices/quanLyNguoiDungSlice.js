import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nguoiDungServices } from "../../services/nguoiDungServices";

const initialState = {
  listUser: [],
};

export let fetchListUserAction = createAsyncThunk(
  "quanLyNguoiDungSlice/fetchListUserAction",
  async () => {
    let result = await nguoiDungServices.getListUser();
    return result.data.content;
  }
);
const quanLyNguoiDungSlice = createSlice({
  name: "quanLyNguoiDungSlice",
  initialState,
  reducers: {
    setListUserAction: (state, action) => {
      state.listUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    // fetchListUserAction
    builder.addCase(fetchListUserAction.fulfilled, (state, action) => {
      state.listUser = action.payload;
    });
    builder.addCase(fetchListUserAction.rejected, () => {
      throw Error("request listUser fail");
    });
  },
});

export const { setListUserAction } = quanLyNguoiDungSlice.actions;

export default quanLyNguoiDungSlice.reducer;
