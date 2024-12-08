import { http } from "./config";

export const binhLuanServices = {
  getListCommentByIdRoom: (maPhong) =>
    http.get(`/api/binh-luan/lay-binh-luan-theo-phong/${maPhong}`),
  addComment: (token, form) =>
    http.post(`/api/binh-luan`, form, { headers: { token } }),
};
