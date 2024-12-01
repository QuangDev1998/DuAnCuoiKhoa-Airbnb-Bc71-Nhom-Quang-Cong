import { createSlice } from "@reduxjs/toolkit";
import {
  fetchListPhongAction,
  fetchPhongInfoAction,
} from "../thunks/quanLyPhongThunks";

const initialState = {
  listPhong: [],
  phongInfo: null,
  isModalOpen: false,
  isModalEditOpen: false,
};

const quanLyPhongSlice = createSlice({
  name: "quanLyPhongSlice",
  initialState,
  reducers: {
    setListPhongAction: (state, action) => {
      state.listPhong = action.payload;
    },
    setIsModalOpenAction: (state, action) => {
      state.isModalOpen = action.payload;
    },
    setIsModalEditOpenAction: (state, action) => {
      state.isModalEditOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    // fetchListPhongAction
    builder.addCase(fetchListPhongAction.fulfilled, (state, action) => {
      state.listPhong = action.payload;
    });
    builder.addCase(fetchListPhongAction.rejected, (state, action) => {
      console.log(action.payload);
    });
    // fetchPhongInfoAction
    builder.addCase(fetchPhongInfoAction.fulfilled, (state, action) => {
      state.phongInfo = action.payload;
    });
    builder.addCase(fetchPhongInfoAction.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const {
  setListPhongAction,
  setIsModalOpenAction,
  setIsModalEditOpenAction,
} = quanLyPhongSlice.actions;

export default quanLyPhongSlice.reducer;
