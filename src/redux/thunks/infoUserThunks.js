import { createAsyncThunk } from "@reduxjs/toolkit";
import { bookingServices } from "../../services/bookingServices";
import { phongServices } from "../../services/phongServices";
import { nguoiDungServices } from "../../services/nguoiDungServices";

export const fetchInfoUserAction = createAsyncThunk(
  "infoUserSlice/fetchInfoUserAction",
  async (id) => {
    const result = await nguoiDungServices.getUserInfo(id);
    return result.data.content;
  }
);
export const createListIdBookingAction = createAsyncThunk(
  "infoUserSlice/createListIdBooking",
  async (idUser) => {
    const listIdBookingClone = [];
    const result = await bookingServices.searchBooking(idUser);
    const bookingArr = result.data.content;
    for (let i = 0; i < bookingArr.length; i++) {
      listIdBookingClone.push(bookingArr[i].maPhong);
    }
    return {
      listId: listIdBookingClone,
      listBooked: bookingArr,
    };
  }
);

export const createListBookedRoomAction = createAsyncThunk(
  "infoUserSlice/createListBookedRoom",
  async (listId) => {
    const listBookedRoomClone = [];
    const result = await phongServices.getListPhong();
    const listPhong = result.data.content;
    listId.map((id) => {
      const index = listPhong.findIndex((phong) => phong.id === id);
      if (index !== -1) {
        return listBookedRoomClone.push(listPhong[index]);
      }
    });
    return listBookedRoomClone;
  }
);
