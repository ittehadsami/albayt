import Image from "next/image";
// import Layout from "@/components/Layout";
import Intro from "@/components/Homepage/Intro";
import Services from "@/components/Homepage/Services";
import AboutUs from "@/components/Homepage/AboutUs";
import DoctorInfo from "@/components/Homepage/DoctorInfo";
import DoctorsSlider from "@/components/Homepage/DoctorsSlider";
import Appointment from "@/components/Homepage/Appointment";
export default function Home() {
  return (
    <main className="bg-[url('/login.jpeg')] ">
      {/* <Layout> */}
      <Intro />
      {/* <Services /> */}
      <section id="doctors" className="bg-white">
        <DoctorsSlider />
      </section>
      <div className="w-full">{/* <DoctorInfo /> */}</div>
      <AboutUs />
      <Appointment />
      {/* </Layout> */}
    </main>
  );
}
