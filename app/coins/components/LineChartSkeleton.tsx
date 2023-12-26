import { Skeleton } from "@/components/ui/skeleton";

const LineChartSkeleton = () => (
  <div className="p-4">
    <div className="flex justify-between mb-4">
      <Skeleton className="h-6 w-[20%] rounded" />
      <Skeleton className="h-6 w-[40%] rounded" />
    </div>
    <Skeleton className="h-[300px] w-full rounded" />
  </div>
);

export default LineChartSkeleton;
