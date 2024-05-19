import React from "react";
import { categories } from "../configs/categories";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="px-[60px] py-12 flex flex-col items-center text-center bg-gray-300 sm:px-5">
      <h1 className="text-[40px] font-bold mb-4 text-slate-800">
        Explorer Top Categories
      </h1>
      <p className="max-w-[700px] text-xl mb-10">
        Explore our wide range of vacation rentals that cater to all types of
        travelers. Immerse yourself in the local culture, enjoy the comforts of
        home, and create unforgettable memories in your dream destination.
      </p>

      <div className="flex py-[12] justify-center gap-5 2xl:flex-wrap">
        {categories?.slice(1, 7).map((category, index) => (
          <Link to="" key={index}>
            <div className="relative flex justify-center items-center w-[250px] h-[200px] cursor-pointer">
              <img
                className="absolute w-[100%] h-[100%]"
                src={category.img}
                alt={category.label}
              />
              <div className="absolute w-[100%] h-[100%] bg-[rgba(0,0,0,0.55)] duration-300 ease-in-out hover:w-[80%] hover:h-[80%]"></div>
              <div className="relative text-white">
                <div className="text-5xl inline-block">{category.icon}</div>
                <p className="font-semibold text-xl">{category.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
