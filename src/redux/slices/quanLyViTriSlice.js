import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { viTriServices } from "../../services/viTriServices";

const initialState = {
  listViTri: [],
};

export let fetchListViTriAction = createAsyncThunk(
  "quanLyViTriSlice/fetchListViTriAction",
  async () => {
    let result = await viTriServices.getListViTri();
    return result.data.content;
  }
);

const quanLyViTriSlice = createSlice({
  name: "quanLyViTriSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchListViTriAction
    builder.addCase(fetchListViTriAction.fulfilled, (state, action) => {
      state.listViTri = action.payload;
    });
    builder.addCase(fetchListViTriAction.rejected, () => {
      throw Error("Request listViTri fail ");
    });
  },
});

export const {} = quanLyViTriSlice.actions;

export default quanLyViTriSlice.reducer;
