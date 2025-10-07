import type { ICategories } from "../../../types/type";

type CategoryProgressProps = {
  categories: ICategories[];
};

const CategoryProgress = ({ categories }: CategoryProgressProps) => {
  return (
    <div>
      <section className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="font-semibold mb-4 text-black">Category Breakdown</h2>

        {categories?.length > 0 ? (
          categories?.map((cat) => {
          
            const percentage = Math.min(
              ((cat.total || 0) / 30000) * 100,
              100
            );

            return (
              <div key={cat.name} className="mb-5">
            
                <div className="flex justify-between text-sm mb-1 text-gray-700">
                  <span className="font-medium">{cat.name}</span>
                  <span>
                    ${cat.total.toLocaleString()}{" "}
                    <span className="text-gray-500">
                      ({cat.items} items)
                    </span>
                  </span>
                </div>

        
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gray-900 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-sm">No category data available</p>
        )}
      </section>
    </div>
  );
};

export default CategoryProgress;
