import { SquarePen, Trash2 } from "lucide-react";
import ProductsTableSkeleton from "../../../skeltens/ProductTable";
import type { IProduct } from "../../../types/type";
import { AddProductDialog } from "./AddProducts";
import { AlertDialogBox } from "../../re-usable/AlertModal";
import { adminController } from "../../../controllers/admin.controller";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateProductDialog } from "./updateProducts";
import toast from "react-hot-toast";

type ProductsTableProps = {
  products: IProduct[];
  isLoading: boolean;
  page: number;
  limit: number;
  total: number;
  setPage: (page: number) => void;
};

const ProductsTable = ({
  products,
  isLoading,
  page,
  limit,
  total,
  setPage,
}: ProductsTableProps) => {
  const queryClient = useQueryClient();

  const deleteProductMutation = useMutation({
    mutationFn: (productId: string) => adminController.deleteProduct(productId),
    onMutate: async (productId: string) => {
      await queryClient.cancelQueries({ queryKey: ["products", page, limit] });
      const previousQueryData = queryClient.getQueryData<{ data: IProduct[] }>([
        "products",
        page,
        limit,
      ]);

      const previousProducts = previousQueryData?.data || [];
      queryClient.setQueryData(["products", page, limit], {
        ...previousQueryData,
        data: previousProducts.filter((p) => p._id !== productId),
      });

      return { previousProducts };
    },

    onError: (_err, _taskId, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(
          ["products", page, limit],
          context.previousProducts
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products", page, limit] });
    },
  });

  return (
    <div>
      <section className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <h2 className="font-semibold text-lg mb-2 md:mb-0">Products</h2>
          <AddProductDialog page={page} limit={limit} />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-300 text-black">
                <th className="py-2 px-4 md:px-8">NAME</th>
                <th className="py-2 px-4 md:px-8">PRICE</th>
                <th className="py-2 px-4 md:px-12">CATEGORY</th>
                <th className="py-2 px-4 w-32 md:w-96">STOCK</th>
              </tr>
            </thead>

            {isLoading ? (
              <ProductsTableSkeleton rows={6} />
            ) : (
              <tbody>
                {products?.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-100 text-black">
                    <td className="py-2 px-4 md:px-8">{p.name}</td>
                    <td className="py-2 px-4 md:px-8">${p.price.toFixed(2)}</td>
                    <td className="py-2 px-4 md:px-16">
                      <span className="bg-gray-200 py-1 px-2 rounded text-sm">
                        {p.category}
                      </span>
                    </td>
                    <td className="py-2 px-4 w-32 md:w-96">{p.stock}</td>
                    <td className="py-2 px-4 flex space-x-2 justify-center">
                      <UpdateProductDialog
                        toggleIcon={
                          <>
                            <span className=" hover:bg-white focus:outline-none p-1 rounded">
                              <SquarePen className="text-gray-500" />
                            </span>
                          </>
                        }
                        product={p}
                        page={page}
                        limit={limit}
                      />
                      <AlertDialogBox
                        triggerLabel={
                          <span className="bg-white  focus:outline-none p-1 rounded cursor-pointer">
                            <Trash2 className="w-5 h-5 text-gray-500" />
                          </span>
                        }
                        title="Confirm Delete?"
                        description="Are you sure you want to delete this product? This action cannot be undone."
                        actionText="Yes, Delete"
                        cancelText="Cancel"
                        triggerVariant="destructive"
                        onAction={async () => {
                            await new Promise((resolve) => setTimeout(resolve, 1000));
                          await deleteProductMutation.mutateAsync(p._id);
                          toast.success("products deleted  successfully")
                        }}
                        onCancel={() => console.log("Delete cancelled")}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>

        {total > limit && (
          <div className="flex justify-center items-center mt-4 space-x-4">
            <button
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>

            <span className="px-3 py-1 rounded bg-gray-100 text-gray-700">
              {page}
            </span>

            <button
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              onClick={() => setPage(page + 1)}
              disabled={page * limit >= total}
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductsTable;
