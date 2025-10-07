/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";

import GenericDialog from "../../re-usable/Dialog";
import { adminController } from "../../../controllers/admin.controller";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IProduct } from "../../../types/type";

type AddProductDialogProps={
    page:number
    limit:number
}

export const AddProductDialog = ({page,limit}:AddProductDialogProps) => {

const queryClient = useQueryClient();

const addProductMutation = useMutation({
  mutationFn: (newProduct: IProduct) => adminController.addProduct(newProduct),

  onMutate: async (newProduct) => {
    // Cancel any outgoing refetches
    await queryClient.cancelQueries({ queryKey: ["products", page, limit] });

    // Snapshot previous data
    const previousQueryData = queryClient.getQueryData<{ data: IProduct[] }>(["products", page, limit]);

    // Optimistically add new product to current page
    queryClient.setQueryData(["products", page, limit], {
      ...previousQueryData,
      data: previousQueryData ? [newProduct, ...previousQueryData.data] : [newProduct],
    });

    return { previousQueryData };
  },

  onError: (_err, _newProduct, context: any) => {
    if (context?.previousQueryData) {
      queryClient.setQueryData(["products", page, limit], context.previousQueryData);
    }
  },

  onSettled: () => {
    // Refetch to ensure server and cache are consistent
    queryClient.invalidateQueries({ queryKey: ["products"], exact: false });
  },
});

  const formik = useFormik({
    initialValues: { name: "", price: 0, category: "", stock: 0 },
    onSubmit: async(values) => {
       // Create a temporary _id for optimistic update
    const tempProduct: IProduct = {
        ...values, _id: `temp-${Date.now()}`,
        userId: "",
        createdAt: "",
        updatedAt: "",
        __v: 0
    };

    // Trigger mutation
    await addProductMutation.mutateAsync(tempProduct);

    // Reset form
    formik.resetForm();
    },
  });

  return (
    <GenericDialog

      toggleIcon="Add Product"
      title="Add New Product"
      description="Fill in the product details below"
      footer={
        <div className="flex space-x-2  ">
              <button className="text-red-700 !bg-white  hover:text-black " type="button">Cancel</button>
    <button
      type="submit"
      onClick={() => formik.handleSubmit()}
      className="!bg-green-800 hover:!bg-green-800 text-white px-12 py-2 rounded"
    >
      Submit
    </button>
        </div>
      }
    >
      <form className="grid gap-4 text-white">
        {/* Name */}
        <div className="grid grid-cols-4 items-center gap-4 text-white">
          <label htmlFor="name" className="text-right">
            Name
          </label>
          <input
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="col-span-3 p-2 rounded  border border-white "
            placeholder="Product Name"
          />
        </div>

        {/* Price */}
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="price" className="text-right">
            Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            value={formik.values.price}
            onChange={formik.handleChange}
            className="col-span-3 p-2 rounded border border-white text-white"
            placeholder="0.00"
          />
        </div>

        {/* Category */}
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="category" className="text-right">
            Category
          </label>
          <input
            id="category"
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            className="col-span-3 p-2 rounded border border-white text-white"
            placeholder="Clothing, Electronics..."
          />
        </div>

        {/* Stock */}
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="stock" className="text-right">
            Stock
          </label>
          <input
            id="stock"
            name="stock"
            type="number"
            value={formik.values.stock}
            onChange={formik.handleChange}
            className="col-span-3 p-2 rounded border border-white text-white"
            placeholder="0"
          />
        </div>
      </form>
    </GenericDialog>
  );
};
