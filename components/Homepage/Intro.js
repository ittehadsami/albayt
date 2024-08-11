const Intro = () => {
  return (
    <section
      className="p-8 
    bg-[url('/blurhospital.jpg')] bg-cover bg-center 
    "
    >
      <div className="flex justify-center">
        <div className="md:pl-20 ">
          <h1 className="md:text-xl  text-pink-600  ">Caring for life</h1>
          <p className="md:text-4xl mt-3">Leading the Way </p>
          <p className="md:text-4xl">in Medical Excellence</p>
          <div>
            <button className="bg-white p-3 text-center rounded-md hover:bg-pink-600 duration-300 mt-10">
              Our Services
            </button>
          </div>
        </div>
        {/* <div className="text-xl items-center mt-[270px]">
          <p>Picture </p>
        </div> */}
      </div>
      {/* <div>
        <p>sdagfkahjksd</p>
      </div> */}
    </section>
  );
};

export default Intro;
