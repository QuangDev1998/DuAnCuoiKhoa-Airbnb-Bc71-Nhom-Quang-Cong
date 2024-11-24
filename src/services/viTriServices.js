import { http } from "./config";

export let viTriServices = {
  getListViTri: () => http.get(`/api/vi-tri`),
  deleteViTri: () => http.delete(``),
};
