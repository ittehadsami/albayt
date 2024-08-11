import Link from "next/link";
import { CiLocationOn } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
const Appointment = () => {
  return (
    <section className="p-8 bg-white flex justify-center ">
      <div className="md:m-10 p-10 sm:w-[640px] bg-pink-100 rounded-xl">
        <h2 className="text-2xl font-bold text-center">Make an appointment</h2>
        <div className="p-5">
          <div className="flex justify-between items-center mb-10">
            <div className="flex gap-5 ">
              <IoCallOutline className="text-2xl" />
              <div> Phone Number:</div>
            </div>

            <div>+8801828996215</div>
          </div>
          <div className="flex justify-between items-center ">
            <div className="flex gap-5">
              <CiLocationOn className="text-2xl" />
              <div>Location:</div>
            </div>
            <div>249/1, Hamida Tower, South Jatrabari, Dhaka-1204</div>
          </div>
          <p></p>
        </div>
      </div>
    </section>
  );
};

export default Appointment;
