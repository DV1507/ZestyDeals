import useAxiosPost from "@/hooks/axios/useAxiosPost";
const basePath = "/products";

export const useGetProductPostApi = () => {
  const { isLoading, post, isError } = useAxiosPost(`${basePath}/get-all`);
  const getProductsApi = async () => {
    const res = await post({});
    return res?.data;
  };
  return { isLoading, getProductsApi, isError };
};
