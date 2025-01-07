"use client";
import { useGetProductPostApi } from "./components/helper";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Product } from "../types";
import { format } from "date-fns";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

interface ProductListingProps {
  setProduct: Dispatch<SetStateAction<Product | null>>;
}
const ProductListing = ({ setProduct }: ProductListingProps) => {
  const { getProductsApi } = useGetProductPostApi();

  const {
    status,
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: (ctx) => getProductsApi(10, ctx.pageParam),
    getNextPageParam: (lastGroup) => {
      if (!lastGroup || lastGroup.nextOffset === null) {
        return undefined;
      }
      return lastGroup.nextOffset;
    },
    initialPageParam: 0,
  });

  const allRows = data ? data.pages.flatMap((d) => d.rows) : [];

  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 300,
    gap: 10,
    overscan: 1,
  });

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) return;

    if (
      lastItem.index >= allRows.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allRows.length,
    isFetchingNextPage,
    rowVirtualizer.getVirtualItems(),
  ]);

  if (status === "error") {
    return (
      <div className="text-red-500">
        Failed to load products. Please try again later.
      </div>
    );
  }

  if (isFetching && allRows.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div
      ref={parentRef}
      className="List"
      style={{
        height: `900px`,
        width: `100%`,
        overflow: "auto",
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems()?.map((virtualRow) => {
          const isLoaderRow = virtualRow.index > allRows.length - 1;
          const product = allRows[virtualRow.index];

          if (isLoaderRow) {
            return (
              <div
                key={virtualRow.index}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                className="flex items-center justify-center text-neutral-500"
              >
                {isFetchingNextPage
                  ? "Loading more products..."
                  : "No more products available"}
              </div>
            );
          }

          return (
            <div
              key={virtualRow.index}
              onClick={() => setProduct(product)}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
              className="w-full flex gap-5 hover:shadow-lg hover:shadow-primary/30 transition-all duration-500 border border-primary/20 p-5 bg-neutral-950 rounded-lg"
            >
              <section>
                <Image
                  src={
                    product?.image && product?.image.startsWith("http")
                      ? product.image
                      : "/common/default_image.png"
                  }
                  alt={product?.name || "Default Image"}
                  width={250}
                  height={250}
                />
              </section>
              <div className="flex flex-col space-y-5 justify-center">
                <div className="text-xl text-pretty">
                  Name: {product?.name || "No Name Available"}
                </div>
                <div>
                  Description:{" "}
                  {product?.description || "No Description Available"}
                </div>
                <div className="flex flex-col space-y-5">
                  <section>
                    Price: ${product?.price || "No Price Available"}
                  </section>
                  <section>
                    Stock: {product?.stock || "No Stock Available"}
                  </section>
                </div>
                <section>
                  Added on:{" "}
                  {product?.createdAt
                    ? format(new Date(product?.createdAt), "dd MMMM yyyy")
                    : "No Date Available"}
                </section>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductListing;
