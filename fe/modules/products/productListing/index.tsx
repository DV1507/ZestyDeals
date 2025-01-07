"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetProductPostApi } from "./components/helper";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Product } from "../types";
import SkeletonLoader from "./components/productSkeleton";
import { format } from "date-fns";
import { Dispatch, SetStateAction } from "react";

interface ProductListingProps {
  setProduct: Dispatch<SetStateAction<Product | null>>;
}
const ProductListing = ({ setProduct }: ProductListingProps) => {
  const { getProductsApi } = useGetProductPostApi();

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProductsApi,
  });

  return (
    <div className="w-full ">
      <div className="w-full grid grid-cols-1 sm:grid-cols-1  xl:grid-cols-3 2xl:grid-cols-4 mx-auto justify-items-center gap-4">
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          data?.products?.map((product: Product) => (
            <Card
              className="w-[350px] hover:shadow-lg hover:shadow-primary/30  transition-all duration-500 border border-primary/20"
              key={product.id}
              onClick={() => setProduct(product)}
            >
              <CardHeader className="flex flex-row justify-between">
                <div>
                  <CardTitle className="text-xl text-pretty ">
                    {product?.name || "No Name Available"}
                  </CardTitle>
                  <CardDescription>
                    {product?.description || "No Description Available"}
                  </CardDescription>
                </div>

                <span>ID: {product?.id}</span>
              </CardHeader>
              <section className="w-full flex justify-center">
                <Image
                  src={
                    product?.image && product?.image.startsWith("http")
                      ? product.image
                      : "/common/default_image.png"
                  }
                  alt={product?.name || "Default Image"}
                  width={200}
                  height={200}
                />
              </section>
              <div className="flex flex-col p-7 space-y-5">
                <section className="flex flex-row justify-between">
                  <section>
                    Price: ${product?.price || "No Price Available"}
                  </section>
                  <section>
                    Stock: {product?.stock || "No Price Available"}
                  </section>
                </section>

                <section>
                  Added on:{" "}
                  {format(new Date(product?.createdAt), "dd MMMM yyyy") ||
                    "No Price Available"}
                </section>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductListing;
