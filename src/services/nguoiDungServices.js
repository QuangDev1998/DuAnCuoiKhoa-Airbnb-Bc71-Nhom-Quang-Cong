import { http } from "./config";

export let nguoiDungServices = {
  getListUser: () => http.get("/api/users"),
  searchUser: (ten) => http.get(`/api/users/search/${ten}`),
  deleteUser: (id) => http.delete(`/api/users?id=${id}`),
};
