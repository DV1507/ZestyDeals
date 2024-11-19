/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axiosInstance from "./axiosInstance";

interface UsePostResult<T, R> {
  data: any;
  isLoading: boolean;
  isError: string | null;
  post: (payload: T) => Promise<any>;
}

const useAxiosPost = <T, R>(url: string): UsePostResult<T, R> => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  const post = async (payload: T): Promise<any> => {
    setIsLoading(true);
    setIsError(null); // Reset error state before the request
    try {
      const response = await axiosInstance.post<R>(url, payload);
      setData(response.data);
      return response.data; // Return the server response
    } catch (error) {
      const axiosError = error as {
        response?: {
          data?: { message?: string; success?: boolean };
        };
      };
      const errorMessage =
        axiosError?.response?.data?.message || "Something went wrong";
      setIsError(errorMessage); // Set error message
      return null; // Return null in case of error
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, isError, post };
};

export default useAxiosPost;
