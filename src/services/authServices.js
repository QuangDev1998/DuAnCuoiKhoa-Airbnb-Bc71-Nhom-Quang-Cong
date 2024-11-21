import { http } from "./config";

export let authServices = {
  login: (user) => http.post("/api/auth/signin", user),
};
