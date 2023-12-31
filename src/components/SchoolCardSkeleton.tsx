

const SchoolCardSkeleton = () => {
    return (
        <div className="w-80 h-80 rounded-lg border border-gray-400 shadow-2xl relative overflow-hidden animate-pulse flex flex-col gap-4">
          {/* photo header (skeleton loader) */}
          <div className="w-full h-[50%] bg-gray-300 rounded-tr-lg rounded-tl-lg"></div>
    
          {/* school card body */}
          <div className="flex flex-col gap-2">
            {/* school name (skeleton loader) */}
            <p className="p-2 text-lg font-semibold bg-gray-300 h-5 w-3/4"></p>
    
            {/* school city (skeleton loader) */}
            <p className="p-2 text-sm text-gray-500 bg-gray-300 h-5 w-1/2"></p>
          </div>
    
          {/* footer button (skeleton loader) */}
          <div className="absolute w-full bg-gray-400 h-9 bottom-0 flex justify-center text-white items-center rounded-br-lg rounded-bl-lg">
            Loading...
          </div>
        </div>
      );
}

export default SchoolCardSkeleton