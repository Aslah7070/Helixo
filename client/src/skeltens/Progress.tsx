

const CategoryProgressSkeleton = ({ rows = 4 }) => {
  return (
    <section className="bg-white p-6 rounded-lg shadow mb-8 animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-40 mb-4"></div> {/* Skeleton for the title */}
      {Array.from({ length: rows }).map((_, idx) => (
        <div key={idx} className="mb-4">
          {/* Skeleton for the text row */}
          <div className="flex justify-between text-sm mb-1">
            <div className="h-4 bg-gray-300 rounded w-24"></div>
            <div className="h-4 bg-gray-300 rounded w-20"></div>
          </div>
          {/* Skeleton for the progress bar */}
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div className="bg-gray-300 h-2 rounded-full w-3/4"></div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default CategoryProgressSkeleton;
