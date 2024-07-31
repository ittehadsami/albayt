"use client";
import Link from "next/link";
import Slider from "react-slick";
import React from "react";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
const DoctorInfo = () => {
  const sliderRef = React.useRef(null);
  const products = [
    {
      src: "/sneakers.png",
      alt: "Sneakers",
      title: "Sneakers",
      description: "Stylish cafe chair",
    },
    {
      src: "/loafer.png",
      alt: "Loafer",
      title: "Loafer",
      description: "Stylish cafe chair",
    },
    {
      src: "/booties.png",
      alt: "Booties",
      title: "Booties",
      description: "Stylish cafe chair",
    },
    {
      src: "/chelseaboot.png",
      alt: "Chelsea Boot",
      title: "Chelsea Boot",
      description: "Stylish cafe chair",
    },
    {
      src: "/balletflat.png",
      alt: "Ballet Flat",
      title: "Ballet Flat",
      description: "Stylish cafe chair",
    },
  ];
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1040,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          // initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className="p-8 bg-gray-200">
      <h2 className="text-2xl font-bold text-center">Our Doctors</h2>
      <p className="mt-4 text-center">Meet our team of experienced doctors.</p>
      <div>
        <div
          // initial={{ opacity: 0, y: 100 }}
          // whileInView={{ opacity: 1, y: 0 }}
          // transition={{ duration: 0.3, delay: 0.2, type: "just" }}
          className="border p-1 md:p-10 md:pb-10 mt-10 rounded-3xl max-w-full  relative lg:h-[36rem]"
        >
          <div className="flex justify-between items-center md:px-0 px-5">
            <div>
              <p className="text-lg md:text-xl lg:text-2xl font-semibold ">
                Featured Products
              </p>
            </div>
            <div className="mt-5 mb-4">
              <button
                className="bg-gray-200 rounded-full shadow-md mr-2 hover:bg-[#12957D] group transition duration-300 ease-in"
                onClick={() => sliderRef.current.slickPrev()}
              >
                <svg
                  width="38"
                  height="39"
                  viewBox="0 0 41 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-[#343B45] group-hover:stroke-white scale-50 rotate-180 "
                >
                  <path
                    d="M23.8976 8.33334L35.0927 20L23.8976 31.6667"
                    // stroke={"group-hover:"}
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <line
                    x1="33.6479"
                    y1="19.3862"
                    x2="6.09277"
                    y2="19.3862"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
              <button
                className="bg-gray-200 rounded-full shadow-md hover:bg-[#12957D] group transition duration-300 ease-in"
                onClick={() => sliderRef.current.slickNext()}
                // style={{
                //   background: "var(--Primary-Color, #12957D)",
                //   color: "white",
                // }}
              >
                <svg
                  width="38"
                  height="39"
                  viewBox="0 0 41 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-[#343B45] group-hover:stroke-white scale-50 "
                >
                  <path
                    d="M23.8976 8.33334L35.0927 20L23.8976 31.6667"
                    // stroke={"group-hover:"}
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <line
                    x1="33.6479"
                    y1="19.3862"
                    x2="6.09277"
                    y2="19.3862"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <hr className="mb-7" />
          <div className="lg:absolute  left-0 right-0">
            <Slider ref={sliderRef} {...settings}>
              {products.map((product, index) => (
                <div key={index} className="p-3">
                  <div className="p-3 bg-slate-50 rounded-lg  space-x-2 ">
                    <div className="relative rounded-lg w-full h-64">
                      <Image
                        src={product.src}
                        alt={product.alt}
                        className="w-full h-full object-cover object-center rounded-xl"
                        width={0}
                        height={0}
                        quality={100}
                      />
                    </div>
                    <div className="mt-5 pb-3">
                      <p
                        className="font-medium"
                        style={{
                          color:
                            "var(--text-485-e-5-a, var(--Color-5, #485E5A))",
                        }}
                      >
                        {product.title}
                      </p>
                      <p
                        className="text-sm text-gray-500 "
                        style={{ color: "var(--text-869694, #869694)" }}
                      >
                        {product.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorInfo;
