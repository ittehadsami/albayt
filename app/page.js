import Image from "next/image";
// import Layout from "@/components/Layout";
import Intro from "@/components/Intro";
import Services from "@/components/Services";
import AboutUs from "@/components/AboutUs";
import DoctorInfo from "@/components/DoctorInfo";
export default function Home() {
  return (
    <main className="bg-[url('/login.jpeg')] ">
      {/* <Layout> */}
      <Intro />
      <Services />
      <AboutUs />
      <DoctorInfo />
      {/* </Layout> */}
    </main>
  );
}
