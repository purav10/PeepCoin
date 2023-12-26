import { Skeleton } from "@/components/ui/skeleton";

const DetailedCoinInfoSkeleton = () => (
  <>
  <div className="flex flex-col gap-4">
    <Skeleton className="h-24 w-24 rounded-full" /> 
    <Skeleton className="h-6 w-[375px]" /> 
  </div>
    <div className="flex flex-col gap-4">
    <Skeleton className="h-4 w-full" /> 
    <Skeleton className="h-full rounded-md w-[400px]" /> 
    </div>
    <div className="flex flex-col gap-4">
    <Skeleton className="h-full rounded-half w-[450px]" /> 
    </div>
</>
);

export default DetailedCoinInfoSkeleton;

