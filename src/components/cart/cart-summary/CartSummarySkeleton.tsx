
export const CartSummarySkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
        <div className="animate-pulse">
            <div className="w-[50%] mt-2 mb-5 h-4 rounded bg-gray-200"></div>

            <div className="grid grid-cols-3 gap-4">
                <div className="h-2 rounded bg-gray-200" />
                <div/>
                <div className="h-2 rounded bg-gray-200" />

                <div className="h-2 rounded bg-gray-200" />
                <div/>
                <div className="h-2 rounded bg-gray-200" />
                
                <div className="h-2 rounded bg-gray-200" />
                <div/>
                <div className="h-2 rounded bg-gray-200" />
                
                <div className="mt-5 h-4 rounded bg-gray-200" />
                <div/>
                <div className="mt-5 h-4 rounded bg-gray-200" />
            </div>

            <div className="mt-8 mb-2 h-10 rounded bg-gray-200" />                            
        </div>
    </div>
  );
}
