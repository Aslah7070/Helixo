
import OverView from "./OverView";
import CategoryProgress from "./CategoryProgress";
import ProductsTable from "./ProductsTable";
import {  useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { adminController } from "../../../controllers/admin.controller";
import CategoryProgressSkeleton from "../../../skeltens/Progress";
import StatsChart from "./ChartStats";




const Dashboard = () => {
const [page, setPage] = useState(1);
  const limit = 6;
 const { data, isLoading} = useQuery({
   queryKey: ["products", page, limit], 
    queryFn: () => adminController.findProducts(page,limit),
     refetchOnMount: "always",
      refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
const categyCount=data?.summary.totalCategories
const totalPrice=data?.summary.totalValue
const productsCount=data?.summary.totalProducts
const categories=data?.categories
  console.log("data",data)
 
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
  

    <OverView  categyCount={categyCount} totalPrice={totalPrice} isLoading={isLoading} productsCount={productsCount}/>

  {isLoading ? (
  <CategoryProgressSkeleton rows={4} />
) : (
  <CategoryProgress categories={categories} />
)}

    <ProductsTable products={data?.data} page={page} setPage={setPage} total={productsCount}  limit={limit} isLoading={isLoading}/>

    <StatsChart/>
    </div>
  );
};

export default Dashboard;
