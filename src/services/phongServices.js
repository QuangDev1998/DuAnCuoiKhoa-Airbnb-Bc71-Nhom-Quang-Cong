import { http } from "./config";

export const phongServices = {
  getListPhong: () => http.get(`/api/phong-thue`),
  findPhong: (keyword) =>
    http.get(
      `/api/phong-thue/phan-trang-tim-kiem?pageIndex=1&pageSize=10&keyword=${keyword}`
    ),
  locationPhong: (id) => {
    http.get(`api/phong-thue/lay-phong-theo-vi-tri?maViTri=${id}`);
  },
  deletePhong: (id, tokenBearer) =>
    http.delete(`/api/phong-thue/${id}`, {
      headers: { token: tokenBearer },
    }),
  getPhongInfo: (id) => http.get(`/api/phong-thue/${id}`),
  createPhong: (phongData, tokenBearer) =>
    http.post(`/api/phong-thue`, phongData, {
      headers: { token: tokenBearer },
    }),
  uploadHinhPhong: (formData, maPhong, tokenBearer) =>
    http.post(
      `/api/phong-thue/upload-hinh-phong?maPhong=${maPhong}`,
      formData,
      {
        headers: { token: tokenBearer },
      }
    ),
  editPhong: (id, phongData, tokenBearer) =>
    http.put(`/api/phong-thue/${id}`, phongData, {
      headers: { token: tokenBearer },
    }),
};
