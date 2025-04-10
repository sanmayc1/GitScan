import { repoCommits } from "@/services/api/api";
import { Commits, DateCommitCount, fetchCommits, Modal } from "@/utils/types";
import {  Folder, LoaderCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Bar, BarChart, XAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";

const ChartModal: React.FC<Modal> = ({ onClose, repo }) => {
  const [commits, setCommits] = useState<Commits[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchCommitActivity = async () => {
      setLoading(true)
      const commitsData:fetchCommits[] | null = await repoCommits(repo.fullName);
    
      if (!commitsData || commitsData.length < 0) {
        setLoading(false)
        return;
      }
      let commitsDate: Commits[] = [];
      const commitsCount: DateCommitCount = {};
      const dates: string[] = [];
      for (let commit of commitsData) {
        dates.push(commit.commit.author.date.split("T")[0]);
      }
      for (let date of dates) {
        if (commitsCount.hasOwnProperty(date)) {
          commitsCount[date] += 1;
        } else {
          commitsCount[date] = 1;
        }
      }
      for (let date in commitsCount) {
        commitsDate.push({ date, count: commitsCount[date] });
      }

      commitsDate = commitsDate.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      
      setCommits(commitsDate);
      setLoading(false);
    };
  
    fetchCommitActivity();
   
  }, [repo]);

  const chartConfig = {
    date: {
      label: "Date",
      color: "#2563eb",
    },
    count: {
      label: "count",
      color: "#60a5fa",
    },
  } as const;

  return (
    <>
      <div className="inset-0 fixed z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="p-5 min-w-[60%] bg-white rounded-lg shadow-lg flex flex-col gap-3">
          <h1 className="text-2xl font-bold">Commit Activity</h1>
          <div className="flex gap-3 w-full p-2  ">
            <div className="flex ">
              <Folder fill="gray" color="gray" size={23} />
            </div>
            <p className="text-sm whitespace-nowrap">{repo.name}</p>
          </div>
          {!loading ? (
            <div className="flex justify-center items-center p-5  w-full bg-gray-200 rounded-lg">
              {commits.length > 0 ? (
                <ChartContainer
                  config={chartConfig}
                  className="min-h-[300px] w-full"
                >
                  <BarChart data={commits}>
                    <XAxis dataKey="date" tick={{ fill: "black" }} />

                    <Bar dataKey="count" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </BarChart>
                </ChartContainer>
              ) : (
                <p>No Commits yet</p>
              )}
            </div>
          ) : (
            <div className="flex w-full h-[200px] justify-center items-center">
              <LoaderCircle className="animate-spin" />
            </div>
          )}
          <div className="flex justify-end items-center gap-3 ">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChartModal;
