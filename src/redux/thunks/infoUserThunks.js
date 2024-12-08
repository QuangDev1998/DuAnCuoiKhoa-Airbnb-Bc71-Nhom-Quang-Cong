import { createAsyncThunk } from "@reduxjs/toolkit";
import { bookingServices } from "../../services/bookingServices";
import { phongServices } from "../../services/phongServices";
import { nguoiDungServices } from "../../services/nguoiDungServices";

export const fetchInfoUserAction = createAsyncThunk(
  "infoUserSlice/fetchInfoUserAction",
  async (id, { rejectWithValue }) => {
    try {
      const result = await nguoiDungServices.getUserInfo(id);
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const createListIdBookingAction = createAsyncThunk(
  "infoUserSlice/createListIdBooking",
  async (idUser, { rejectWithValue }) => {
    try {
      const listIdBookingClone = [];
      const result = await bookingServices.searchBooking(idUser);
      result.data.content.map((room) => {
        return listIdBookingClone.push(room.maPhong);
      });
      return listIdBookingClone;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createListBookedRoomAction = createAsyncThunk(
  "infoUserSlice/createListBookedRoom",
  async (listId, { rejectWithValue }) => {
    try {
      const listBookedRoomClone = [];
      const result = await phongServices.getListPhong();
      const listPhong = result.data.content;
      listId.map((id) => {
        const index = listPhong.findIndex((phong) => phong.id === id);
        if (index !== -1) {
          return listBookedRoomClone.push(listPhong[index]);
        }
      });
      console.log("listBookedRoomClone", listBookedRoomClone);
      return listBookedRoomClone;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
