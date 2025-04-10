import React from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();

  return (
    <nav className="flex justify-between sm:px-16 px-6 py-7">
      {/* left */}
      <div
        className="sm:text-2xl text-lg font-bold flex items-center gap-1 "
        onClick={() => navigate("/")}
      >
        <img
          src="./githubLogo.png"
          alt="logo"
          className="object-contain h-6 sm:h-8"
        />
        <p className="font-bold">GitScan</p>
      </div>
      {/* right */}
      <ul className="flex space-x-4 font-semibold text-gray-700 sm:text-base text-xs items-center ">
        <li className="cursor-pointer" onClick={() => navigate("/")}>
          Home
        </li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
};

export default Navbar;
