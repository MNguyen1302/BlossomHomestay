import React, { useEffect, useState } from "react";
import { categories } from "../configs/categories";
import ListingCard from "./ListingCard";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import placeApi from "../apis/modules/place.api";
import { setListings } from "../redux/state";

const Listings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const listings = useSelector((state) => state.listings);

  const getFeedPlaces = async () => {
    try {
      const response = await placeApi.getPlacesByCategory(
        selectedCategory !== "All" ? selectedCategory : ""
      );
      dispatch(setListings(response));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeedPlaces();
    console.log(listings);
  }, [selectedCategory]);

  return (
    <>
      <div className="px-20 py-[50px] flex justify-center flex-wrap gap-[60px] sm:px-5 sm:py-[50px]">
        {categories?.map((item, index) => (
          <div
            className={`flex flex-col items-center cursor-pointer hover:text-blue-300 ${
              selectedCategory === item.label
                ? "text-blue-300"
                : "text-gray-700"
            }`}
            key={index}
            onClick={() => setSelectedCategory(item.label)}
          >
            <div className="text-3xl">{item.icon}</div>
            <p className="text-lg font-bold">{item.label}</p>
          </div>
        ))}
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="px-[60px] pb-[120px] flex flex-wrap justify-center gap-[5px] lg:px-5">
          {listings.map(
            ({
              _id,
              creator,
              listingPhotos,
              city,
              province,
              country,
              category,
              type,
              price,
            }) => (
              <ListingCard
                key={_id}
                listingId={_id}
                creator={creator}
                listingPhotos={listingPhotos}
                city={city}
                province={province}
                country={country}
                category={category}
                type={type}
                price={price}
              />
            )
          )}
        </div>
      )}
    </>
  );
};

export default Listings;
