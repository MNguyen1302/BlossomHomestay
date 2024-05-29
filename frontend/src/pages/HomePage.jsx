import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Slide from "../components/Slide";
import Categories from "../components/Categories";
import Listings from "../components/Listings";

const HomePage = () => {
  return (
    <div className="relative overflow-hidden">
      <Navbar />
      <Slide />
      <Categories />
      <Listings />
    </div>
  );
};

export default HomePage;
