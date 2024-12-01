"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
const SkeletonLoader: React.FC = () => {
  // Create an array of 6 skeleton cards
  const skeletons = Array(6).map((_, index) => (
    <Card className="w-[300px]" key={index}>
      <CardHeader>
        <Skeleton className="h-6 w-[60%] rounded-md" />
        <Skeleton className="h-4 w-[80%] rounded-md mt-2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full rounded-md mb-2" />
        <Skeleton className="h-4 w-[90%] rounded-md" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-4 w-[50%] rounded-md" />
      </CardFooter>
    </Card>
  ));

  return skeletons;
};

export default SkeletonLoader;
