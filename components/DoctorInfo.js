import Link from "next/link";

const DoctorInfo = () => {
  return (
    <section className="p-8 bg-gray-200">
      <h2 className="text-2xl font-bold">Our Doctors</h2>
      <p className="mt-4">Meet our team of experienced doctors.</p>
      <Link href="/doctors">
        <div className="text-blue-500 mt-4 inline-block">View More</div>
      </Link>
    </section>
  );
};

export default DoctorInfo;
