import React from "react";
import Header from "./navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="pt-0">
        <Header />
      </div>
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;