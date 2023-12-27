import { Skeleton } from "@/components/ui/skeleton";

const DetailedCoinInfoSkeleton = () => (
  <div className="flex-grow">
    <div className="flex flex-row gap-4">
      <Skeleton className="h-16 w-28 rounded-full" />
      <div className="flex flex-col flex-grow gap-4">
        <Skeleton className="h-6 w-full" /> 
        <Skeleton className="h-6 w-full" />
      </div>
    </div>

    <div className="flex flex-row gap-4 mt-4">
      <Skeleton className="h-10 w-1/2" /> 
      <Skeleton className="h-10 w-1/2" />
    </div>
  </div>
);

export default DetailedCoinInfoSkeleton;
