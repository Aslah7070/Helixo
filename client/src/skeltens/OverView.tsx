

const OverViewSkeleton = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {Array.from({ length: 3 }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white p-6 rounded-lg shadow animate-pulse"
        >
          <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
          <div className="h-6 bg-gray-300 rounded w-16"></div>
        </div>
      ))}
    </section>
  );
};

export default OverViewSkeleton;
