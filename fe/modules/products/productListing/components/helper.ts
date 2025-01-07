import useAxiosPost from "@/hooks/axios/useAxiosPost";
const basePath = "/products";

export const useGetProductPostApi = () => {
  const { isLoading, post, isError } = useAxiosPost(`${basePath}/get-all`);

  const getProductsApi = async (limit: number, offset = 0) => {
    try {
      const res = await post({
        limit,
        offset,
      });

      return {
        rows: res?.data?.products || [],
        nextOffset: res?.data?.products?.length ? offset + 1 : null,
      };
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error; // Let the caller handle this
    }
  };

  return { isLoading, getProductsApi, isError };
};
