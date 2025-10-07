import OverViewSkeleton from "../../../skeltens/OverView"


type OverViewProps={
    productsCount:number,
    categyCount:number,
    totalPrice:number
    isLoading:boolean
}

const OverView = ({productsCount,categyCount,isLoading,totalPrice}:OverViewProps) => {


if(isLoading){
 return (
       <OverViewSkeleton/>
 )
}

  return (
    <div>
       <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-black">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-500">PRODUCTS</p>
          <p className="text-xl font-bold">{productsCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-500">TOTAL VALUE</p>
          <p className="text-xl font-bold">
            {totalPrice}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-500">CATEGORIES</p>
          <p className="text-xl font-bold">{categyCount}</p>
        </div>
      </section>
    </div>  
  )
}

export default OverView
