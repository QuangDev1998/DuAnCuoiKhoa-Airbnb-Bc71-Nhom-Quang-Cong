import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nguoiDungServices } from "../../services/nguoiDungServices";

const initialState = {
  listUser: [],
  userInfo: null,
  isModalOpen: false,
  isModalEditOpen: false,
};

export let fetchListUserAction = createAsyncThunk(
  "quanLyNguoiDungSlice/fetchListUserAction",
  async () => {
    let result = await nguoiDungServices.getListUser();
    return result.data.content;
  }
);
export let fetchUserInfoAction = createAsyncThunk(
  "quanLyNguoiDungSlice/fetchUserInfoAction",
  async (userId) => {
    let result = await nguoiDungServices.getUserInfo(userId);
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
