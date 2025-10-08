import React from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useQuery } from "@tanstack/react-query";
import { adminController } from "../../../controllers/admin.controller";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

type Category = { name: string; count: number };

const StatsChart: React.FC = () => {
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Products by Category",
        font: { size: 16 },
      },
    },
  };

  const { data: stats, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: () => adminController.getStats(),
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  if (isLoading) return <p>Loading charts...</p>;
  if (!stats) return <p>No stats available</p>;

  const lineData = {
    labels: stats.months,
    datasets: [
      {
        label: "Products Sold",
        data: stats.productsSold,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.3,
      },
    ],
  };

  const pieData = {
    labels: stats.categories?.map((c: Category) => c.name),
    datasets: [
      {
        label: "Category Count",
        data: stats.categories?.map((c: Category) => c.count),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  return (
    <div className="grid gap-8 md:grid-cols-2 p-4 w-full">
      {/* Line Chart */}
      <div className="w-full bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-bold mb-2 text-center">
          Monthly Products Sold
        </h2>
        <div className="relative h-[300px] sm:h-[400px] md:h-[450px]">
          <Line
            data={lineData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
      </div>

      <div className="w-full bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-bold mb-2 text-center">
          Products by Category
        </h2>
        <div className="relative h-[300px] sm:h-[400px] md:h-[450px] flex justify-center items-center">
          {stats.categories.length === 0 ? (
            <div className="flex justify-center items-center h-[300px] text-gray-500 font-medium">
              You have no products available.
            </div>
          ) : (
            <Pie data={pieData} options={pieOptions} />
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsChart;
