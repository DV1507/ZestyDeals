"use client";
import { z } from "zod";
import { useAddProductPostApi } from "./helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createProductSchema } from "./validation-schema";

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

const AddProductForm = () => {
  const { isLoading, addProductApi } = useAddProductPostApi();

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

  const onSubmit = async (values: z.infer<typeof createProductSchema>) => {
    const res = await addProductApi(values);
    if (res?.data?.success) {
      console.log(res);
      form.reset();
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (e) => console.log("error", e))}
          className="space-y-5 w-[500px] "
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
                  <Input placeholder="Enter product description" {...field} />
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
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !!Object.keys(form.formState.errors)?.length}
            loading={isLoading}
          >
            Create Product
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddProductForm;
