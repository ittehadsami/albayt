"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "@/public/logo_2.png";
import { IoCallOutline } from "react-icons/io5";
import { CiLocationOn, CiClock2 } from "react-icons/ci";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {/* Bottom Section */}
      <div
        // className={`fixed left-0 w-full p-4 transition-colors duration-300 ${
        //   scrolled ? "bg-pink-200" : "bg-transparent"
        // }`}
        className="left-0 w-full p-4 transition-colors duration-300 bg-pink-200"
      >
        <div className="flex justify-between items-center p-3 md:pl-20 ">
          <div>
            <Image src={logo} alt="Al Bayt Hospital" width={200} />
          </div>
          <div className="items-center text-center">
            <button onClick={toggleMenu}>
              {menuOpen ? (
                <FaTimes className="text-2xl text-black lg:hidden " />
              ) : (
                <FaBars className="text-2xl text-black lg:hidden" />
              )}
            </button>
            <div
              className={`${
                menuOpen ? "flex" : "hidden"
              } flex-col lg:flex lg:flex-row gap-10 text-black items-center lg:text-xl absolute lg:static top-20 left-0 w-full bg-pink-200 lg:bg-transparent p-5 lg:p-0 transition-all duration-300 z-[9999]`}
            >
              <div>Home</div>
              <div>Doctors</div>
              <div>Services</div>
              <div>About Us</div>
              <div>Contact Us</div>
              <button className="bg-white hover:scale-105 scale-95 rounded-md p-2 text-center text-black border hover:bg-pink-600 hover:text-black hover:border-pink-600 transition duration-300">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
