import { http } from "./config";

export const bookingServices = {
  getListBooking: () => http.get(`/api/dat-phong`),
  searchBooking: (maNguoiDung) =>
    http.get(`/api/dat-phong/lay-theo-nguoi-dung/${maNguoiDung}`),
  deleteBooking: (id) => http.delete(`/api/dat-phong/${id}`),
  getBookingInfo: (id) => http.get(`/api/dat-phong/${id}`),
  createBooking: (booking) => http.post(`/api/dat-phong`, booking),
  editBooking: (id, bookingInfo) =>
    http.put(`/api/dat-phong/${id}`, bookingInfo),
};
