import Link from "next/link";
import logo from "@/public/logo_2.png";
import Image from "next/image";
import { IoCallOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
const Footer = () => {
  return (
    <footer className="bg-pink-200 p-4 px-10 text-black ">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex justify-center mb-5 md:mb-0">
          <Image src={logo} alt="Al Bayt Hospital" width={200} />
        </div>

        <div className="md:flex gap-5 ">
          <div className="flex justify-center items-center gap-1 mb-5 md:mb-0">
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
  );
};

export default Footer;
