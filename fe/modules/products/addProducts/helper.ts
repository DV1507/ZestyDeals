import useAxiosPost from "@/hooks/axios/useAxiosPost";
import { z } from "zod";
import { createProductSchema } from "./validation-schema";

const basePath = "/products";

export const useAddProductPostApi = () => {
  const { isLoading, post, isError } = useAxiosPost(`${basePath}/create`);
  const addProductApi = async (
    payload: z.infer<typeof createProductSchema>
  ) => {
    const res = await post(payload);
    return res;
  };
  return { isLoading, addProductApi, isError };
};
