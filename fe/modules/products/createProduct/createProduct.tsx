"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  useAddProductPostApi,
  useDeleteProductPostApi,
  useEditProductPostApi,
} from "./helper";
import { createProductSchema } from "./validation-schema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product } from "../types";
interface CreateProductModalProps {
  product: Product | null;
  setProduct: Dispatch<SetStateAction<Product | null>>;
}
const CreateProductModal = ({
  product,
  setProduct,
}: CreateProductModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { isLoading, addProductApi } = useAddProductPostApi();
  const { isLoading: EditProductLoading, editProductApi } =
    useEditProductPostApi();
  const { isLoading: DeleteProductLoading, deleteProductApi } =
    useDeleteProductPostApi();

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    reValidateMode: "onChange",

    defaultValues: {
      description: "",
      name: "",
      price: 0,
      stock: 0,
    },
  });

  useEffect(() => {
    if (product) {
      form.reset(product);
      setIsModalOpen(true);
    }
  }, [product]);

  const onSubmit = async (values: z.infer<typeof createProductSchema>) => {
    if (product) {
      await editProductApi(values, product.id);
    } else {
      await addProductApi(values);
    }
  };

  const handleDelete = async () => {
    if (product) {
      const res = await deleteProductApi(product.id);
      if (res?.data?.success) {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        form.reset();
        setProduct(null);
        setIsModalOpen(false);
      }
    }
  };
  const mutation = useMutation({
    mutationFn: onSubmit,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["products"] });
      form.reset();
      setProduct(null);
      setIsModalOpen(false);
    },
  });

  return (
    <div className="w-full flex justify-end">
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button variant="default">
            {product ? "Edit" : "Create"} Product
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle> {product ? "Edit" : "Create"} Product</DialogTitle>
            {!product && (
              <DialogDescription>
                Create a new product with details including name, description,
                price, stock availability, and category to add it to the
                inventory.
              </DialogDescription>
            )}
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(
                (data) => mutation.mutate(data),
                (e) => console.log("error", e)
              )}
              className="space-y-5  "
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your product name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter product description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter product price"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product stock</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter product stock as per availability"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={
                    isLoading || !!Object.keys(form.formState.errors)?.length
                  }
                  loading={isLoading || EditProductLoading}
                >
                  {product ? "Edit" : "Create"}
                </Button>
                <Button
                  onClick={handleDelete}
                  type="button"
                  className="w-full"
                  disabled={
                    DeleteProductLoading ||
                    !!Object.keys(form.formState.errors)?.length
                  }
                  loading={isLoading}
                  variant={"destructive"}
                >
                  Delete
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateProductModal;
