"use client";
import { useState, useRef, useEffect } from "react";
import DashboardNav from "@/components/AdminPanel/Navbar/Navbar";
import DashboardSidebar from "@/components/AdminPanel/Sidebar/Sidebar";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import AdminAuth from "@/components/Auth/AdminAuth";

export default function RootLayout({ children }) {
  const [sideBar, setSideBar] = useState(false);
  const navbarRef = useRef();
  const pathname = usePathname();

  useEffect(() => {
    setSideBar(false);
  }, [pathname]);
  return (
    <>
      {/* <AdminAuth> */}
      <div className="flex flex-col">
        <div ref={navbarRef} className="w-full z-10">
          <DashboardNav
            sidebarHandler={() => setSideBar(!sideBar)}
            isOpen={sideBar}
          />
        </div>

        <div className={`flex h-[calc(100vh-57px)]`}>
          {" "}
          {/* substract navbar height */}
          <div
            className={`h-full  overflow-y-auto shrink-0 ${
              sideBar ? "w-[50%]" : "w-0"
            } md:w-auto transition-all duration-300`}
          >
            <DashboardSidebar />
          </div>
          <div className="h-full w-full overflow-y-auto p-3 bg-white">
            {children}
          </div>
        </div>
      </div>
      {/* </AdminAuth> */}
    </>
  );
}
