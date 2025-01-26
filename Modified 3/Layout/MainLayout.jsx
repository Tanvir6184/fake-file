import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Header from "../Components/Header/Header";

const MainLayout = () => {
  const location = useLocation();

  const noHeaderFooter =
    location.pathname.includes("login") ||
    location.pathname.includes("register");

  return (
    <div className="">
      {noHeaderFooter || (
        <div>
          <Header></Header>
        </div>
      )}
      <Navbar></Navbar>
      <div className="min-h-[calc(100vh-100px)]">
        <Outlet></Outlet>
      </div>
      <div className="w-full"> {noHeaderFooter || <Footer></Footer>}</div>
    </div>
  );
};

export default MainLayout;
