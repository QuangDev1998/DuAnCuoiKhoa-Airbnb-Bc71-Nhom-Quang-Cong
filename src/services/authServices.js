import { http } from "./config";

export const authServices = {
  login: (user) => http.post("/api/auth/signin", user),
  register: (user) => http.post("/api/auth/signup", user),
};
