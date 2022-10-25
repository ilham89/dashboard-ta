import axiosInstance from "../config/axios";

export const aspirationService = {
  getAspirations: async (page) => {
    const response = await axiosInstance({
      url: `/dashboard/aspiration?page=${page || 1}`,
      method: "get",
    });
    return response.data;
  },
  getAspiration: async (id) => {
    const response = await axiosInstance({
      url: `/dashboard/aspiration/${id}`,
      method: "get",
    });
    return response.data;
  },
  approveAspiration: async (id) => {
    const response = await axiosInstance({
      url: `/dashboard/aspiration/${id}/approve`,
      method: "put",
    });
    return response.data;
  },
  rejectAspiration: async (id, data) => {
    const response = await axiosInstance({
      url: `/dashboard/aspiration/${id}/reject`,
      method: "put",
      data,
    });
    return response.data;
  },
};
