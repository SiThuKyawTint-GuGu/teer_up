/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";

const HeaderCarousel = () => {
    const carouselData = [
    {
        id:1,
        link:"https://www.google.com"
    },
    {
        id:2,
        link:"https://www.google.com"
    },
    {
        id:3,
        link:"https://www.google.com"
    },
    {
        id:4,
        link:"https://www.google.com"
    },
    {
        id:5,
        link:"https://www.google.com"
    }]
  return (
    <>
      <div className="carousel carousel-center max-w-md p-4 space-x-4 bg-white rounded-box h-[32%]">
        {carouselData?.map((item, index) => (
          <div key={index} className="carousel-item w-[90%]">
            <img
              src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
              className="rounded-box w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      
    </>
  );
};

export default HeaderCarousel;
