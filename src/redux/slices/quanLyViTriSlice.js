import { createSlice } from "@reduxjs/toolkit";
import {
  fetchListViTriAction,
  fetchViTriInfoAction,
} from "../thunks/quanLyViTriThunks";

const initialState = {
  listViTri: [],
  viTriInfo: null,
  isModalOpen: false,
  isModalEditOpen: false,
};

const quanLyViTriSlice = createSlice({
  name: "quanLyViTriSlice",
  initialState,
  reducers: {
    setListViTriAction: (state, action) => {
      state.listViTri = action.payload;
    },
    setIsModalOpenAction: (state, action) => {
      state.isModalOpen = action.payload;
    },
    setIsModalEditOpenAction: (state, action) => {
      state.isModalEditOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    // fetchListViTriAction
    builder.addCase(fetchListViTriAction.fulfilled, (state, action) => {
      state.listViTri = action.payload;
    });
    builder.addCase(fetchListViTriAction.rejected, () => {
      throw Error("Request listViTri fail ");
    });
    // fetchViTriInfoAction
    builder.addCase(fetchViTriInfoAction.fulfilled, (state, action) => {
      state.viTriInfo = action.payload;
    });
    builder.addCase(fetchViTriInfoAction.rejected, () => {
      throw Error("Request viTriInfo fail ");
    });
  },
});

export const {
  setListViTriAction,
  setIsModalOpenAction,
  setIsModalEditOpenAction,
} = quanLyViTriSlice.actions;

export default quanLyViTriSlice.reducer;
