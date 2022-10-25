import axiosInstance from "../config/axios";

export const aspirationCategoriesService = {
  getAspirationCategories: async () => {
    const response = await axiosInstance({
      url: `/dashboard/aspiration-category`,
      method: "get",
    });
    return response.data;
  },
  createAspirationCategories: async (data) => {
    const response = await axiosInstance({
      url: `/dashboard/aspiration-category`,
      method: "post",
      data,
    });
    return response.data;
  },
  deleteAspirationCategories: async (id) => {
    const response = await axiosInstance({
      url: `/dashboard/aspiration-category/${id}`,
      method: "delete",
    });
    return response.data;
  },
};
