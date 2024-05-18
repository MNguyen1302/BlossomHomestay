import { useState } from "react";
import logo from "../assets/logo.jpg";
import { IoSearchOutline } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { IconContext } from "react-icons";

const NavBar = () => {
  const [menu, setMenu] = useState("home");

  return (
    <div className="flex justify-between items-center ">
      <img src={logo} width="100px" height="100px" alt="" />
      <ul className="flex gap-5 text-base">
        <li
          onClick={() => setMenu("home")}
          className={
            menu === "home"
              ? "pb-1 border-b-2 border-solid border-slate-700"
              : ""
          }
        >
          Home
        </li>
        <li
          onClick={() => setMenu("menu")}
          className={
            menu === "menu"
              ? "pb-1 border-b-2 border-solid border-slate-700"
              : ""
          }
        >
          Menu
        </li>
        <li
          onClick={() => setMenu("about")}
          className={
            menu === "about"
              ? "pb-1 border-b-2 border-solid border-slate-700"
              : ""
          }
        >
          About
        </li>
        <li
          onClick={() => setMenu("contact-us")}
          className={
            menu === "contact-us"
              ? "pb-1 border-b-2 border-solid border-slate-700"
              : ""
          }
        >
          Contact Us
        </li>
      </ul>

      <div className="flex items-center gap-10">
        <IconContext.Provider value={{ size: 25 }}>
          <IoSearchOutline />
          <div className="relative">
            <FaCartShopping />
            <div className="absolute min-w-3 min-h-3 bg-green-400 rounded-md -top-3 -right-2"></div>
          </div>
        </IconContext.Provider>
        <button className="bg-transparent text-base px-8 py-3 cursor-pointer border rounded-full border-solid border-slate-700 hover:border-green-400 duration-1000 ">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default NavBar;
