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
    builder.addCase(fetchListViTriAction.rejected, (state, action) => {
      console.log(action.payload);
    });
    // fetchViTriInfoAction
    builder.addCase(fetchViTriInfoAction.fulfilled, (state, action) => {
      state.viTriInfo = action.payload;
    });
    builder.addCase(fetchViTriInfoAction.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const {
  setListViTriAction,
  setIsModalOpenAction,
  setIsModalEditOpenAction,
} = quanLyViTriSlice.actions;

export default quanLyViTriSlice.reducer;
