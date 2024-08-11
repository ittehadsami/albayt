import Link from "next/link";
import {
  FaUserFriends,
  FaUserInjured,
  FaMoneyBillAlt,
  FaRegImage,
} from "react-icons/fa";
import { IoIosHome } from "react-icons/io";
import { usePathname } from "next/navigation";
import { useState } from "react";
import NavDropdown from "./NavDropdown";

const DashboardSidebar = () => {
  const pathname = usePathname();
  const [isSelected, setIsSelected] = useState("");

  return (
    <div className="p-5 bg-gradient-to-bl from-pink-200 to-pink-400 h-full shrink-0 flex min-w-48 select-none">
      <ul className="w-full space-y-4">
        {/* Single Link  */}
        <li className="w-full shadow-sm">
          <Link
            href={"/admin"}
            className={`flex items-center gap-2 py-2 px-3 text-white group w-full uppercase ${
              pathname === "/admin" ? "border-e-2 border-white" : ""
            }`}
          >
            <FaUserFriends className="group-hover:scale-[1.3] transition-all duration-300 text-lg" />
            <p>Users</p>
          </Link>
        </li>
        <li className="w-full shadow-sm">
          <Link
            href={"/admin/injured-list"}
            className={`flex items-center gap-2 py-2 px-3 text-white group w-full uppercase ${
              pathname === "/admin/injured-list"
                ? "border-e-2 border-white"
                : ""
            }`}
          >
            <FaUserInjured className="group-hover:scale-[1.3] transition-all duration-300 text-lg" />
            <p>Injured List</p>
          </Link>
        </li>
        <li className="w-full shadow-sm">
          <Link
            href={"/admin/donors"}
            className={`flex items-center gap-2 py-2 px-3 text-white group w-full uppercase ${
              pathname === "/admin/donors" ? "border-e-2 border-white" : ""
            }`}
          >
            <FaMoneyBillAlt className="group-hover:scale-[1.3] transition-all duration-300 text-lg" />
            <p>Donors</p>
          </Link>
        </li>

        {/* Dropdown  */}
      </ul>
    </div>
  );
};

export default DashboardSidebar;
