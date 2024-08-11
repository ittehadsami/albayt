import { Inter } from "next/font/google";
import "../globals.css";
import Image from "next/image";
import logo from "@/public/logo_2.png";
import Navbar from "@/components/Homepage/Navbar";
import { IoCallOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import Footer from "@/components/Homepage/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Al Bayt Hospital",
  description: "Al Bayt Hospital",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <header className=" bg-transparent text-white w-full">
            <Navbar />
          </header>
          <main className=" ">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
