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
  totalRow: null,
  currentPage: 1,
  valueInput: "",
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
    setTotalRowAction: (state, action) => {
      state.totalRow = action.payload;
    },
    setCurrentPageAction: (state, action) => {
      state.currentPage = action.payload;
    },
    setValueInputAction: (state, action) => {
      state.valueInput = action.payload;
    },
  },
  extraReducers: (builder) => {
    // fetchListUserAction
    builder.addCase(fetchListUserAction.fulfilled, (state, action) => {
      state.listUser = action.payload.data;
      state.totalRow = action.payload.totalRow;
    });
    builder.addCase(fetchListUserAction.rejected, (state, action) => {
      console.error(action.payload);
    });
    // fetchUserInfoAction
    builder.addCase(fetchUserInfoAction.fulfilled, (state, action) => {
      state.userInfo = action.payload;
    });
    builder.addCase(fetchUserInfoAction.rejected, (state, action) => {
      console.error(action.payload);
    });
  },
});

export const {
  setListUserAction,
  setIsModalOpenAction,
  setIsModalEditOpenAction,
  setTotalRowAction,
  setCurrentPageAction,
  setValueInputAction,
} = quanLyNguoiDungSlice.actions;

export default quanLyNguoiDungSlice.reducer;
