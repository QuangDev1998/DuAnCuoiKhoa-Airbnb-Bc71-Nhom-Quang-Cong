import { http } from "./config";

export let viTriServices = {
  getListViTri: () => http.get(`/api/vi-tri`),
  uploadHinhViTri: (formData, id, tokenBearer) =>
    http.post(`/api/vi-tri/upload-hinh-vitri?maViTri=${id}`, formData, {
      headers: { token: tokenBearer },
    }),
  addVitri: (viTriData, tokenBearer) =>
    http.post(`/api/vi-tri`, viTriData, { headers: { token: tokenBearer } }),
  deleteViTri: (id, tokenBearer) =>
    http.delete(`/api/vi-tri/${id}`, { headers: { token: tokenBearer } }),
  findViTri: (tinhThanh, pageIndex = 1, pageSize = 8) =>
    http.get(
      `/api/vi-tri/phan-trang-tim-kiem?pageIndex=1&pageSize=8&keyword=${tinhThanh}`
    ),
  findViTri2: (pageIndex, pageSize, keyword) =>
    http.get(
      `/api/vi-tri/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}&keyword=${keyword}`
    ),
  getViTriInfo: (id) => http.get(`/api/vi-tri/${id}`),
  editViTri: (id, viTriData, tokenBearer) =>
    http.put(`/api/vi-tri/${id}`, viTriData, {
      headers: { token: tokenBearer },
    }),
};
