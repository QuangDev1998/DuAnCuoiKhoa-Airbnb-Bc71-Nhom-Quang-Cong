import { createAsyncThunk } from "@reduxjs/toolkit";
import { bookingServices } from "../../services/bookingServices";

export const fetchListBookingAction = createAsyncThunk(
  "quanLyBookingSlice/fetchListBookingAction",
  async (_, { rejectWithValue }) => {
    try {
      const result = await bookingServices.getListBooking();
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchBookingInfoAction = createAsyncThunk(
  "quanLyBookingSlice/fetchBookingInfoAction",
  async (bookingId, { rejectWithValue }) => {
    try {
      const result = await bookingServices.getBookingInfo(bookingId);
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
