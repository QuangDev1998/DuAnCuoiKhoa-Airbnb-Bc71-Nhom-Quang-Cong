import { createSlice } from "@reduxjs/toolkit";
import {
  fetchDetailRoomAction,
  fetchListCommentByIdRoomAction,
} from "../thunks/detailRoomThunks";

const initialState = {
  infoRoom: {},
  listComment: [],
};

const detailRoomSlice = createSlice({
  name: "detailRoomSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchDetailRoomAction
    builder.addCase(fetchDetailRoomAction.fulfilled, (state, action) => {
      state.infoRoom = action.payload;
    });
    builder.addCase(fetchDetailRoomAction.rejected, (state, action) => {
      console.log(action.payload);
    });
    // fetchListCommentByIdRoomAction
    builder.addCase(
      fetchListCommentByIdRoomAction.fulfilled,
      (state, action) => {
        state.listComment = action.payload;
      }
    );
    builder.addCase(
      fetchListCommentByIdRoomAction.rejected,
      (state, action) => {
        console.log(action.payload);
      }
    );
  },
});

export const {} = detailRoomSlice.actions;

export default detailRoomSlice.reducer;
