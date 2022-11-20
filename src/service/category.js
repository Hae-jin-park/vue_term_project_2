import { callApi } from "@/plugins/axios";

export const getCat = () => {
  return callApi("/category/list", {
    method: "GET",
  });
};
