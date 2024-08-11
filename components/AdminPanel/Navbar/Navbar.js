import { RiMenuFill } from "react-icons/ri";
import { GiCancel } from "react-icons/gi";
import { IoLogoReact } from "react-icons/io5";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "@/plugins/axios";
const DashboardNav = ({ sidebarHandler, isOpen }) => {
  const router = useRouter();
  const handleLogout = () => {
    toast.success("logout successful");
    axios
      .get(`/admin/logout`)
      .then((response) => {
        localStorage.removeItem("admin");
        toast.success("Logout Successfull");
        router.push("/admin-login");
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err?.response?.data?.data?.message || "Something went wrong"
        );
      });
  };
  return (
    <div className="flex justify-between text-right py-2 px-5 bg-white shadow-md z-10">
      <button onClick={sidebarHandler} className=" block md:hidden">
        {isOpen ? (
          <GiCancel className="fill-gray-400 h-6 w-6" />
        ) : (
          <RiMenuFill className="stroke-gray-400 h-6 w-6" />
        )}
      </button>
      {/* <Image
        src={Logo}
        width={0}
        height={0}
        style={{ width: "56px", height: "auto" }}
        alt="Dettol"
      /> */}
      <div className="flex items-center text-2xl">Save the People</div>

      <div className="my-auto">
        <button
          onClick={handleLogout}
          className={`px-4 py-2 transition-all duration-300 font-bold bg-pink-200 rounded text-white outline hover:bg-white hover:text-pink-200 hover:outline-1 hover:outline-pink-200`}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default DashboardNav;
