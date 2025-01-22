import React from "react";
import { FaBook, FaCompactDisc, FaUsers } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-blue-300">
        <ul className="text-xl text-black  menu ">
          <li>
            <NavLink to="/dashboard/all-user">
              <FaUsers></FaUsers> All Users
            </NavLink>
          </li>
          <li>
            <NavLink to="all-articles">
              <FaBook></FaBook> All Articles
            </NavLink>
          </li>
          <li>
            <NavLink to="add-publisher">
              <FaCompactDisc></FaCompactDisc> Add Publisher
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="menu w-full text-center">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
