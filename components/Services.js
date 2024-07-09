import Link from "next/link";

const Services = () => {
  return (
    <section className="p-8 bg-gray-100">
      <h2 className="text-2xl font-bold">Our Services</h2>
      <p className="mt-4">
        We offer a wide range of medical services to cater to your needs.
      </p>
      <p className="mt-4">
        We offer a wide range of medical services to cater to your needs.
      </p>
      <p className="mt-4">
        We offer a wide range of medical services to cater to your needs.
      </p>
      <p className="mt-4">
        We offer a wide range of medical services to cater to your needs.
      </p>
      <p className="mt-4">
        We offer a wide range of medical services to cater to your needs.
      </p>
      <p className="mt-4">
        We offer a wide range of medical services to cater to your needs.
      </p>
      <Link href="/services">
        <div className="text-blue-500 mt-4 inline-block">View More</div>
      </Link>
    </section>
  );
};

export default Services;
