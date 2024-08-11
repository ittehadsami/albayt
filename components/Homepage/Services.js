"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:3001/Services");
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className="mb-10 mx-5">
      <Slider {...settings}>
        {services.map((service) => (
          <div
            key={service._id}
            className="flex items-center border bg-white w-20 gap-10 mr-12 my-5 py-10"
          >
            <h3 className="slider-name">{service.name}</h3>
            <p className="slider-specialization">{service.description}</p>
            <p className="slider-specialization">{service.category}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Services;
