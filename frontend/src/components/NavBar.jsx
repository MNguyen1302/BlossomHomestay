import React from "react";
import logo from "../assets/logo.jpg";
import { IoSearchOutline } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";

const NavBar = () => {
  return (
    <div className="flex justify-between items-center ">
      <img src={logo} width="100px" height="100px" alt="" />
      <ul className="flex gap-5 text-base">
        <li>Home</li>
        <li>Menu</li>
        <li>About</li>
        <li>Contact Us</li>
      </ul>

      <div className="flex items-center gap-10">
        <IoSearchOutline />
        <FaCartShopping />
      </div>
      <button className="bg-transparent text-base px-8 py-3 cursor-pointer border rounded-full border-solid border-red-400">
        Sign In
      </button>
    </div>
  );
};

export default NavBar;
