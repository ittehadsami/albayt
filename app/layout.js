import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import logo from "@/public/logo_2.png";
import Navbar from "@/components/Navbar";
import { IoCallOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
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
          <header className="fixed  bg-transparent  text-white  w-full">
            <Navbar />
          </header>
          <main className=" ">{children}</main>
          <footer className="bg-pink-200 p-4 px-10 text-black ">
            <div className="flex items-center justify-between">
              <div>
                <Image src={logo} alt="Al Bayt Hospital" width={200} />
              </div>
              {/* <div>
                <p>© 2023 Al Bayt Hospital</p>
              </div> */}
              <div className="flex gap-5">
                <div className="flex justify-center items-center gap-1">
                  <div>
                    <IoCallOutline className="text-2xl" />
                  </div>
                  <div>
                    <div>01828-996215</div>
                  </div>
                </div>
                <div className="flex justify-center items-center gap-1">
                  <div>
                    <CiLocationOn className="text-2xl" />
                  </div>
                  <div className="max-w-auto items-end">
                    <div className="text-wrap ">
                      249/1, Hamida Tower, South Jatrabari, Dhaka-1204
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
