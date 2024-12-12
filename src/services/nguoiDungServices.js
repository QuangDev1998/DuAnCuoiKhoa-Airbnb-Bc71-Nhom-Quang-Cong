import { http } from "./config";

export const nguoiDungServices = {
  getListUser: () => http.get(`/api/users`),
  searchUser: (keyword) => http.get(`/api/users/search/${keyword}`),
  deleteUser: (id) => http.delete(`/api/users?id=${id}`),
  getUserInfo: (id) => http.get(`/api/users/${id}`),
  createUser: (user) => http.post(`/api/users`, user),
  findUser: (pageIndex, pageSize, keyword) =>
    http.get(
      `/api/users/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}&keyword=${keyword}`
    ),
  editUser: (id, userInfo) => http.put(`/api/users/${id}`, userInfo),
  uploadHinhUser: (formFile, tokenBearer) =>
    http.post(`/api/users/upload-avatar`, formFile, {
      headers: { token: tokenBearer },
    }),
};
