import Image from "next/image";
// import Layout from "@/components/Layout";
import Intro from "@/components/Intro";
import Services from "@/components/Services";
import AboutUs from "@/components/AboutUs";
import DoctorInfo from "@/components/DoctorInfo";
import DoctorsSlider from "@/components/DoctorsSlider";
import Appointment from "@/components/Appointment";
export default function Home() {
  return (
    <main className="bg-[url('/login.jpeg')] ">
      {/* <Layout> */}
      <Intro />
      <Services />
      <section id="doctors">
        <DoctorsSlider />
      </section>
      <div className="w-full">{/* <DoctorInfo /> */}</div>
      <AboutUs />
      <Appointment />
      {/* </Layout> */}
    </main>
  );
}
