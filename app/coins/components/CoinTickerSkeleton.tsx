import { Skeleton } from "@/components/ui/skeleton";

const CoinTickerSkeleton = () => (
  <div className="flex flex-col gap-4 p-4">
    <Skeleton className="h-6 w-full rounded-md" /> 
    {Array.from({ length: 5 }).map((_, index) => (
      <div key={index} className="flex justify-between items-center gap-2">
        <Skeleton className="h-4 w-1/5 rounded-md" /> 
        <Skeleton className="h-4 w-1/5 rounded-md" /> 
        <Skeleton className="h-4 w-1/5 rounded-md" /> 
        <Skeleton className="h-4 w-1/5 rounded-full" />
      </div>
    ))}
  </div>
);

export default CoinTickerSkeleton;
