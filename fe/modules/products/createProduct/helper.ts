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

export const useEditProductPostApi = () => {
  const { isLoading, post, isError } = useAxiosPost(`${basePath}/edit`);
  const editProductApi = async (
    payload: z.infer<typeof createProductSchema>,
    id: number
  ) => {
    const res = await post({ ...payload, id });
    return res;
  };
  return { isLoading, editProductApi, isError };
};

export const useDeleteProductPostApi = () => {
  const { isLoading, post, isError } = useAxiosPost(`${basePath}/delete`);
  const deleteProductApi = async (id: number) => {
    const res = await post({ id });
    return res;
  };
  return { isLoading, deleteProductApi, isError };
};
