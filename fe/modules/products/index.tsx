import CreateProductModal from "./createProduct/createProduct";
import ProductListing from "./productListing";

const AddProductForm = () => {
  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="flex  justify-between w-full items-center my-5">
        <section className="w-full text-2xl font-bold text-pretty">
          Product Listing
        </section>
        <CreateProductModal />
      </div>
      <ProductListing />
    </div>
  );
};

export default AddProductForm;
