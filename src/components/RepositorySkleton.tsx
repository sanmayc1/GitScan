import React from "react";
import { Skeleton } from "./ui/skeleton";

const RepositorySkeleton: React.FC = () => {
  return (
    <>
      <Skeleton className="bg-gray-300 rounded-lg min-h-26 min-w-20 " />
    </>
  );
};

export default RepositorySkeleton;
