export function SkeletonCard() {
  return (
    <div className="flex-shrink-0 w-full px-4 lg:px-0 snap-center" aria-hidden="true">
      <div className="max-w-sm lg:max-w-none mx-auto h-[450px] rounded-tr-[3rem] rounded-bl-[3rem] overflow-hidden bg-white/50 border border-black/5 animate-pulse">
        {/* Image Placeholder */}
        <div className="h-52 bg-gray-200" />
        
        {/* Content Placeholder */}
        <div className="p-6 space-y-6">
          <div className="space-y-3">
            <div className="h-6 w-3/4 bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-100 rounded" />
            <div className="h-4 w-5/6 bg-gray-100 rounded" />
          </div>
          
          <div className="pt-4 border-t border-gray-100 space-y-3">
            <div className="h-4 w-32 bg-gray-100 rounded" />
            <div className="h-4 w-24 bg-gray-100 rounded" />
          </div>
          
          <div className="h-4 w-20 bg-[#168706]/20 rounded" />
        </div>
      </div>
    </div>
  );
}