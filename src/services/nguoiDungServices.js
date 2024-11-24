import { http } from "./config";

export let nguoiDungServices = {
  getListUser: () => http.get(`/api/users`),
  searchUser: (keyword) => http.get(`/api/users/search/${keyword}`),
  deleteUser: (id) => http.delete(`/api/users?id=${id}`),
  getUserInfo: (id) => http.get(`/api/users/${id}`),
  createUser: (user) => http.post(`/api/users`, user),
  findUser: (keyword) =>
    http.get(
      `/api/users/phan-trang-tim-kiem?pageIndex=1&pageSize=10&keyword=${keyword}`
    ),
  editUser: (id, userInfo) => http.put(`/api/users/${id}`, userInfo),
};
