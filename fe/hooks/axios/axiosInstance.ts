import axios, { AxiosInstance } from "axios";
import { toast } from "react-toastify";

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage?.getItem("authToken")
      ? localStorage?.getItem("authToken")
      : null;
  }
};
export const getAuthorizationHeader = () => `${getToken()}`;
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: getAuthorizationHeader(),
  },
});
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data?.toast) {
      toast.success(response?.data?.message);
    }
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage?.clear();
      toast.error(
        error.response?.data?.message || "Unauthorized, Please login again"
      );
      if (error.response?.data?.message?.includes("verified")) {
        window.location.href = "/login?notVerified=true";
      } else {
        window.location.href = "/login?notAuthorized=true";
      }
    }
    if (error.response?.data?.toast) {
      console.log(error.response?.data?.toast);
      toast.error(error.response?.data?.message || "Something went wrong");
    }

    return error;
  }
);
export default axiosInstance;
