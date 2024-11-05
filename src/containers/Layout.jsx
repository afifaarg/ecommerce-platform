import React, { useContext, useEffect, lazy } from "react";
import { Outlet, useLocation } from "react-router-dom"; // Import Outlet
import Sidebar from "../AdminComponents/Sidebar";
import Header from "../AdminComponents/Header";
import { SidebarContext } from "../contexts/SidebarContext";

const Page404 = lazy(() => import("../AdminPages/404"));

function Layout() {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  let location = useLocation();

  useEffect(() => {
    closeSidebar();
  }, [location]);

  return (
    <div
      className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${
        isSidebarOpen ? "overflow-hidden" : ""
      }`}
    >
      <Sidebar />

      <div className="flex flex-col flex-1 w-full">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
