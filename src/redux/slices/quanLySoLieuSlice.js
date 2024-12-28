import { createSlice } from "@reduxjs/toolkit";
import {
  fetchListPhongAction,
  fetchListBinhLuanAction,
  fetchListDatPhongAction,
} from "../thunks/quanLySoLieuThunks";

const initialState = {
  listPhong: [],
  listGiaTien: [],
  listRating: [],
  listDatPhong: [],
  oneStar: [],
  twoStar: [],
  threeStar: [],
  fourStar: [],
  fiveStar: [],
};

const quanLySoLieuSlice = createSlice({
  name: "quanLySoLieuSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchListPhongAction
    builder.addCase(fetchListPhongAction.fulfilled, (state, action) => {
      const { listPhong, listGiaTien } = action.payload;
      state.listPhong = listPhong;
      state.listGiaTien = listGiaTien;
    });
    builder.addCase(fetchListPhongAction.rejected, (state, action) => {
      console.error(action.error);
    });
    // fetchListBinhLuanAction
    builder.addCase(fetchListBinhLuanAction.fulfilled, (state, action) => {
      const { listRating, oneStar, twoStar, threeStar, fourStar, fiveStar } =
        action.payload;
      state.listRating = listRating;
      state.oneStar = oneStar;
      state.twoStar = twoStar;
      state.threeStar = threeStar;
      state.fourStar = fourStar;
      state.fiveStar = fiveStar;
    });
    builder.addCase(fetchListBinhLuanAction.rejected, (state, action) => {
      console.error(action.error);
    });
    // fetchListDatPhongAction
    builder.addCase(fetchListDatPhongAction.fulfilled, (state, action) => {
      state.listDatPhong = action.payload;
    });
    builder.addCase(fetchListDatPhongAction.rejected, (state, action) => {
      console.error(action.error);
    });
  },
});

export const {} = quanLySoLieuSlice.actions;

export default quanLySoLieuSlice.reducer;
