

const ProductsTableSkeleton = ({ rows = 5 }) => {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, idx) => (
        <tr key={idx} className="animate-pulse hover:bg-gray-100 text-black">
          <td className="py-2 px-16">
            <div className="h-4 bg-gray-300 rounded w-24"></div>
          </td>
          <td className="py-2 px-8">
            <div className="h-4 bg-gray-300 rounded w-12"></div>
          </td>
          <td className="py-2 px-16">
            <div className="h-4 bg-gray-300 rounded w-20"></div>
          </td>
          <td className="py-2 w-96">
            <div className="h-4 bg-gray-300 rounded w-16"></div>
          </td>
          <td className="py-2 flex space-x-2 justify-center">
            <div className="h-6 w-6 bg-gray-300 rounded"></div>
            <div className="h-6 w-6 bg-gray-300 rounded"></div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default ProductsTableSkeleton;
