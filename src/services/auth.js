import axiosInstance from "../config/axios";

export const authService = {
  logout: async () => {
    const response = await axiosInstance({
      url: `/dashboard/authentication/logout`,
      method: "get",
    });
    return response.data;
  },
  login: async (data) => {
    const response = await axiosInstance({
      url: `/dashboard/authentication/login`,
      method: "post",
      data,
    });
    return response.data;
  },
};
