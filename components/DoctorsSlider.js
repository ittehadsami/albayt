"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
const DoctorsSlider = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:3001/doctors");
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className="mx-5">
      <Slider {...settings}>
        {doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="flex items-center border bg-white w-20 gap-10 mr-12 my-5 py-10"
          >
            <Image
              src={doctor.image}
              alt={doctor.name}
              className="slider-image"
              width={100}
              height={100}
            />
            <h3 className="slider-name">{doctor.name}</h3>
            <p className="slider-specialization">{doctor.specialization}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default DoctorsSlider;
