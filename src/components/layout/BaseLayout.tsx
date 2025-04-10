import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";



const BaseLayout:React.FC = ()=>{
    return (
        <div className="flex flex-col min-h-screen ">
            <Navbar/>
            <main className="flex-grow px-4 py-6 ">
              <Outlet/>
            </main>
            <Footer/>      
        </div>
    )
}

export default BaseLayout;