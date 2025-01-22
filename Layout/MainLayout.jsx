import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Header from "../Components/Header/Header";

const MainLayout = () => {
  const location = useLocation();

  const noHeaderFooter = location.pathname.includes("login");

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
      {noHeaderFooter || <Footer></Footer>}
    </div>
  );
};

export default MainLayout;
