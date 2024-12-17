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
  reducers: {
    setInfoRoomAction: (state, action) => {
      state.infoRoom = action.payload;
    },
    setListCommentAction: (state, action) => {
      state.listComment = action.payload;
    },
  },
  extraReducers: (builder) => {
    // fetchDetailRoomAction
    builder.addCase(fetchDetailRoomAction.fulfilled, (state, action) => {
      state.infoRoom = action.payload;
    });
    builder.addCase(fetchDetailRoomAction.rejected, (state, action) => {
      console.error(action.error);
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
        console.error(action.error);
      }
    );
  },
});

export const { setInfoRoomAction, setListCommentAction } =
  detailRoomSlice.actions;

export default detailRoomSlice.reducer;
