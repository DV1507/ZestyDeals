"use client";
import { useState } from "react";
import CreateProductModal from "./createProduct/createProduct";
import ProductListing from "./productListing";
import { Product } from "./types";

const AddProductForm = () => {
  const [product, setProduct] = useState<Product | null>(null);
  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="flex  justify-between w-full items-center my-5">
        <section className="w-full text-2xl font-bold text-pretty">
          Product Listing
        </section>
        <CreateProductModal product={product} setProduct={setProduct} />
      </div>
      <ProductListing setProduct={setProduct} />
    </div>
  );
};

export default AddProductForm;
