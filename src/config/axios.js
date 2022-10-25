import Axios from "axios";
import { ElNotification } from "element-plus";

const axiosInstance = Axios.create({
  baseURL: "https://aspirasi-backend.4gotten.site/api/v1",
});

axiosInstance.interceptors.request.use(async (config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      ...(user?.token && {
        //@ts-ignore
        Authorization: "Bearer " + user?.token,
      }),
      ...config.headers,
    },
  };
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      ElNotification({
        title: error?.response?.statusText,
        message: error?.response?.data?.meta?.error,
        type: "error",
      });
      return;
    }

    if (error.response?.status === 403) {
      ElNotification({
        title: error?.response?.statusText,
        message: error?.response?.data?.meta?.error,
        type: "error",
      });
      localStorage.clear();
      window.location.href = "/login";
      return;
    }
    if (error.response?.status === 502) {
      ElNotification({
        title: error?.response?.statusText,
        message: error?.response?.data?.meta?.error,
        type: "error",
      });
      return;
    }
    if (error.response?.status === 500) {
      ElNotification({
        title: error?.response?.statusText,
        message: error?.response?.data?.meta?.error,
        type: "error",
      });
      return;
    }
    if (error.response?.status === 404) {
      ElNotification({
        title: error?.response?.statusText,
        message: error?.response?.data?.meta?.error,
        type: "error",
      });
      return;
    }
    if (error.response?.status === 400) {
      ElNotification({
        title: error?.response?.statusText,
        message: error?.response?.data?.meta?.error,
        type: "error",
      });
      return;
    }
    if (error.response?.status === 422) {
      ElNotification({
        title: error?.response?.statusText,
        message: error?.response?.data?.meta?.error,
        type: "error",
      });
      return;
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
