import React, { useState } from "react";
import logo from "../assets/logo.png";
import { IoSearchOutline } from "react-icons/io5";
import { Menu, Person } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setLogout } from "../redux/state";

const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  return (
    <div className="px-14 py-3 flex justify-between items-center relative sm:px-5">
      <a href="/">
        <img className="w-[100px] cursor-pointer" src={logo} alt="Logo" />
      </a>

      <div className="border border-solid border-gray-300 rounded-3xl h-[50px] px-5 flex gap-10 items-center lg:hidden">
        <input
          className="border-none outline-none"
          type="text"
          placeholder="Search..."
        />
        <IoSearchOutline />
      </div>

      <div className="flex items-center gap-5 sm:hidden">
        <a href={user ? "/create-place" : "/login"} className="cursor-pointer">
          Become A Host
        </a>
        <button
          className="h-[50px] flex items-center px-3 border border-solid border-gray-300 rounded-3xl bg-white cursor-pointer gap-3 sm:hidden"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        >
          <Menu sx={{ color: "#949494" }} />
          {!user ? (
            <Person sx={{ color: "#949494" }} />
          ) : (
            <img
              className="bg-cover rounded-full w-10 h-10"
              src={user.avatar}
              alt="Avatar"
            />
          )}
        </button>

        {dropdownMenu && !user && (
          <div className="absolute bg-white right-[60px] top-[80px] flex flex-col w-[200px] py-3 border border-solid border-gray-200 rounded-3xl shadow-xl z-50 sm:right-5">
            <Link className="w-[100%] px-4 py-2 no-underline" to="/login">
              Login
            </Link>
            <Link className="w-[100%] px-4 py-2 no-underline" to="/register">
              Register
            </Link>
          </div>
        )}

        {dropdownMenu && user && (
          <div className="absolute bg-white right-[60px] top-[80px] flex flex-col w-[200px] py-3 border border-solid border-gray-200 rounded-3xl shadow-xl z-50 sm:right-5">
            <Link className="w-[100%] px-4 py-2 no-underline" to="/trip-list">
              Trip List
            </Link>
            <Link className="w-[100%] px-4 py-2 no-underline" to="/wish-list">
              Wish List
            </Link>
            <Link
              className="w-[100%] px-4 py-2 no-underline"
              to="/property-list"
            >
              Property List
            </Link>
            <Link
              className="w-[100%] px-4 py-2 no-underline"
              to="/reservation-list"
            >
              Reservation List
            </Link>
            <Link className="w-[100%] px-4 py-2 no-underline" to="/become-host">
              Reservation List
            </Link>
            <Link
              className="w-[100%] px-4 py-2 no-underline"
              to="/login"
              onClick={() => {
                dispatch(setLogout());
              }}
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
