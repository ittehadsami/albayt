import Link from "next/link";

const AboutUs = () => {
  return (
    <section className="p-8 bg-white">
      <h2 className="text-2xl font-bold">About Us</h2>
      <p className="mt-4">Learn more about our mission, vision, and values.</p>
      <Link href="/about">
        <div className="text-blue-500 mt-4 inline-block">View More</div>
      </Link>
    </section>
  );
};

export default AboutUs;
