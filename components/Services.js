import Link from "next/link";

const Services = () => {
  return (
    <section className="p-8 bg-white">
      <h2 className="text-2xl font-bold text-center">Our Services</h2>
      <div className="flex w-full px-20 py-5 gap-10">
        <div className="bg-pink-100 hover:scale-105 hover:bg-pink-200 transition ease-in-out p-5 w-full rounded-lg flex flex-col text-center">
          <div>
            <p className="font-semibold text-2xl">Hello</p>
          </div>
          <p className="mt-4">
            We offer a wide range of medical services to cater to your needs.
          </p>
        </div>
        <div className="bg-pink-100 hover:scale-105 hover:bg-pink-200 transition ease-in-out p-5 w-full rounded-lg flex flex-col text-center">
          <div>
            <p className="font-semibold text-2xl">Hello</p>
          </div>
          <p className="mt-4">
            We offer a wide range of medical services to cater to your needs.
          </p>
        </div>
      </div>
      <div className="flex w-full px-20 py-5 gap-10">
        <div className="bg-pink-100 hover:scale-105 hover:bg-pink-200 transition ease-in-out p-5 w-full rounded-lg flex flex-col text-center">
          <div>
            <p className="font-semibold text-2xl">Hello</p>
          </div>
          <p className="mt-4">
            We offer a wide range of medical services to cater to your needs.
          </p>
        </div>
        <div className="bg-pink-100 hover:scale-105 hover:bg-pink-200 transition ease-in-out w-full p-5 rounded-lg flex flex-col text-center">
          <div>
            <p className="font-semibold text-2xl">Hello</p>
          </div>
          <p className="mt-4">
            We offer a wide range of medical services to cater to your needs.
          </p>
        </div>
      </div>

      {/* <p className="mt-4">
        We offer a wide range of medical services to cater to your needs.
      </p>
      <p className="mt-4">
        We offer a wide range of medical services to cater to your needs.
      </p> */}
      {/* <Link href="/services">
        <div className="text-blue-500 mt-4 inline-block">View More</div>
      </Link> */}
    </section>
  );
};

export default Services;
