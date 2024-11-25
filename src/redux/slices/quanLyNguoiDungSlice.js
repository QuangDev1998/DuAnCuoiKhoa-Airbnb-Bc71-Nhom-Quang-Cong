import { createSlice } from "@reduxjs/toolkit";
import {
  fetchListUserAction,
  fetchUserInfoAction,
} from "../thunks/quanLyNguoiDungThunks";

const initialState = {
  listUser: [],
  userInfo: null,
  isModalOpen: false,
  isModalEditOpen: false,
};

const quanLyNguoiDungSlice = createSlice({
  name: "quanLyNguoiDungSlice",
  initialState,
  reducers: {
    setListUserAction: (state, action) => {
      state.listUser = action.payload;
    },
    setIsModalOpenAction: (state, action) => {
      state.isModalOpen = action.payload;
    },
    setIsModalEditOpenAction: (state, action) => {
      state.isModalEditOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    // fetchListUserAction
    builder.addCase(fetchListUserAction.fulfilled, (state, action) => {
      state.listUser = action.payload;
    });
    builder.addCase(fetchListUserAction.rejected, () => {
      throw Error("Request listUser fail");
    });
    // fetchUserInfoAction
    builder.addCase(fetchUserInfoAction.fulfilled, (state, action) => {
      state.userInfo = action.payload;
    });
    builder.addCase(fetchUserInfoAction.rejected, () => {
      throw Error("Request userInfo fail");
    });
  },
});

export const {
  setListUserAction,
  setIsModalOpenAction,
  setIsModalEditOpenAction,
} = quanLyNguoiDungSlice.actions;

export default quanLyNguoiDungSlice.reducer;
