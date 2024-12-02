import { createSlice } from "@reduxjs/toolkit";
import {
  createListBookedRoomAction,
  createListIdBookingAction,
  fetchInfoUserAction,
} from "../thunks/infoUserThunks";

const initialState = {
  infoUser: {},
  listBooking: [],
  listBookedRoom: [],
  isModalUpHinhOpen: false,
  isModalEditOpen: false,
};

const infoUserSlice = createSlice({
  name: "infoUserSlice",
  initialState,
  reducers: {
    setInfoUserAction: (state, action) => {
      state.infoUser = action.payload;
    },
    setListBookingAction: (state, action) => {
      state.listBooking = action.payload;
    },
    setListBookedRoomAction: (state, action) => {
      state.listBooking = action.payload;
    },
    setIsModalUpHinhOpenAction: (state, action) => {
      state.isModalUpHinhOpen = action.payload;
    },
    setIsModalEditOpenAction: (state, action) => {
      state.isModalEditOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    // fetchInfoUserAction
    builder.addCase(fetchInfoUserAction.fulfilled, (state, action) => {
      state.infoUser = action.payload;
    });
    // createListIdBookingAction
    builder.addCase(createListIdBookingAction.fulfilled, (state, action) => {
      state.listBooking = action.payload;
    });
    // createListIdBookingAction
    builder.addCase(createListBookedRoomAction.fulfilled, (state, action) => {
      state.listBookedRoom = action.payload;
    });
  },
});

export const {
  setInfoUserAction,
  setListBookingAction,
  setListBookedRoomAction,
  setIsModalUpHinhOpenAction,
  setIsModalEditOpenAction,
} = infoUserSlice.actions;

export default infoUserSlice.reducer;
