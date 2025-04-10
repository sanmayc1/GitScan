import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="text-center h-full p-10 flex flex-col justify-center gap-3 items-center font-bold  ">
        <h1 className="text-5xl mb-4">Welcome to GitScan</h1>

        <img
          src="./githubLogo.png"
          alt="Logo"
          className="h-28 w-28 object-contain animate-pulse mb-10"
        />

        <p className="font-semibold text-gray-500 text-lg text-center sm:px-[10%] mb-5">
          This app allows you to enter any GitHub username and view their public
          profile details. You can see a list of their public repositories and a
          daily chart of their commit activity
        </p>
        <Button
          onClick={() => navigate("/searchuser")}
          variant="default"
          size="lg"
          className="flex items-center justify-center"
        >
          <span>Get Start</span> <ChevronRight color="white" />
        </Button>
      </div>
    </>
  );
};

export default Home;
