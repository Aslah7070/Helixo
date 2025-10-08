/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import GenericDialog from "../../re-usable/Dialog";
import { adminController } from "../../../controllers/admin.controller";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IProduct } from "../../../types/type";
import type React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { SpinnerCustom } from "../../re-usable/SpinnerLoding";
type UpdateProductDialogProps = {
  product: IProduct;
  page: number;
  limit: number;
  toggleIcon: React.ReactElement;
};

export const UpdateProductDialog = ({
  toggleIcon,
  product,
  page,
  limit,
}: UpdateProductDialogProps) => {

      const [open, setOpen] = useState(false);
      const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const updateProductMutation = useMutation({
    mutationFn: (updatedProduct: IProduct) =>
      adminController.updateProduct(updatedProduct._id, updatedProduct),

    onMutate: async (updatedProduct) => {
      await queryClient.cancelQueries({ queryKey: ["products", page, limit] });

      const previousQueryData = queryClient.getQueryData<{ data: IProduct[] }>([
        "products",
        page,
        limit,
      ]);

      if (previousQueryData) {
        queryClient.setQueryData(["products", page, limit], {
          ...previousQueryData,
          data: previousQueryData.data.map((p) =>
            p._id === updatedProduct._id ? { ...p, ...updatedProduct } : p
          ),
        });
      }

      return { previousQueryData };
    },

    onError: (_err, _newProduct, context: any) => {
      if (context?.previousQueryData) {
        queryClient.setQueryData(
          ["products", page, limit],
          context.previousQueryData
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products"], exact: false });
    },
  });

  const formik = useFormik({
    initialValues: {
      name: product.name,
      price: product.price,
      category: product.category,
      stock: product.stock,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
        setLoading(true)
       await new Promise((resolve) => setTimeout(resolve, 1000));
      const updatedProduct = {
        ...product,
        ...values,
      };
      await updateProductMutation.mutateAsync(updatedProduct);
          setLoading(false)
      setOpen(false)
      toast.success("product updated successfully")
    },
  });

  const isFormChanged =
    formik.values.name !== product.name ||
    formik.values.price !== product.price ||
    formik.values.category !== product.category ||
    formik.values.stock !== product.stock;
  return (
    <GenericDialog
    setOpen={setOpen}
    open={open}
      toggleIcon={toggleIcon}
      title="Update Product"
      description="Modify the product details below"
      footer={
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => formik.resetForm()}
            disabled={!isFormChanged}
            className={`px-6 py-2 rounded border ${
              !isFormChanged
                ? "cursor-not-allowed opacity-50 bg-gray-300 text-gray-600"
                : "text-red-700 !bg-white hover:text-black"
            }`}
          >
            Cancel
          </button>
           <button
              type="submit"
              onClick={() => formik.handleSubmit()}
              className="!bg-green-800 hover:!bg-green-800 text-white px-12 py-2 rounded"
            >
              {loading ? (
           
            <SpinnerCustom />
          ) : "Submit"}
              
            </button>
   
        </div>
      }
    >
      <form className="grid gap-4 text-white">
        <div className="grid grid-cols-4 items-center gap-4 text-white">
          <label htmlFor="name" className="text-right">
            Name
          </label>
          <input
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="col-span-3 p-2 rounded border border-white"
            placeholder="Product Name"
          />
        </div>

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
