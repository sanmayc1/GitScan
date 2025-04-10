import { Repositories } from "@/utils/types";
import { Folder } from "lucide-react";
import React from "react";

const Repository: React.FC<Repositories> = ({
  name,
  viewCommits,
  full_name,
}) => {
  return (
    <div className="bg-gray-200 flex flex-col rounded-lg h-26 ">
      <div className="grid grid-cols-4 w-full p-2  ">
        <div className="flex w-full h-full  ">
          <Folder fill="gray" color="gray" size={23} />
        </div>
        <p className="break-all col-span-3 text-sm">{name}</p>
      </div>
      <div className="flex justify-end items-end h-full">
        <p
          className="font-blod bg-blue-100 rounded-full text-xs whitespace-nowrap m-2 hover:scale-105 transition-all duration-300 py-1 px-2 cursor-pointer"
          onClick={() => viewCommits?.(full_name, name)}
        >
          View Commits Chart
        </p>
      </div>
    </div>
  );
};

export default Repository;
