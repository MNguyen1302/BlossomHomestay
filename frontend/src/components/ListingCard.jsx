import React, { useState } from "react";
import PropTypes from "prop-types";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { MdOutlineFavorite, MdFavoriteBorder } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ListingCard = ({
  listingId,
  creator,
  listingPhotos,
  city,
  province,
  country,
  category,
  type,
  price,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFavourite, setIsFavourite] = useState(false);

  const navigate = useNavigate();

  const goToPrevSlide = (e) => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingPhotos.length) % listingPhotos.length
    );
  };

  const goToNextSlide = (e) => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotos.length);
  };
  return (
    <div
      className="relative cursor-pointer p-[10px] rounded-xl hover:shadow-2xl"
      onClick={() => {
        navigate(`/place/${listingId}`);
      }}
    >
      <div className="w-[300px] overflow-hidden rounded-xl mb-[10px]">
        <div
          className="flex transform duration-500 ease-in"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {listingPhotos?.map((photo, index) => (
            <div
              key={index}
              className="relative flex-0 w-[100%] h-[270px] flex items-center"
            >
              <img
                className="w-[100%] h-[100%] brightness-[85%]"
                src={photo}
                alt={`Photo ${index + 1}`}
              />
              <div className="absolute top-[50%] rounded-full p-[5px] -translate-y-2/4 border-none cursor-pointer flex items-center justify-center bg-[rgba(255,255,255,0.7)] z-[999] left-[10px] hover:bg-white text-base">
                <ArrowBackIosNew
                  sx={{ fontSize: "20px" }}
                  onClick={(e) => goToPrevSlide(e)}
                />
              </div>
              <div className="absolute top-[50%] rounded-full p-[5px] -translate-y-2/4 border-none cursor-pointer flex items-center justify-center bg-[rgba(255,255,255,0.7)] z-[999] right-[10px] hover:bg-white text-base">
                <ArrowForwardIos
                  sx={{ fontSize: "20px" }}
                  onClick={(e) => goToNextSlide(e)}
                />
              </div>
              <div className="absolute right-5 top-5 border-none text-2xl text-white cursor-pointer z-[999] bg-none">
                {isFavourite ? <MdOutlineFavorite /> : <MdFavoriteBorder />}
              </div>
            </div>
          ))}
        </div>
      </div>

      <h3 className="font-semibold text-lg">
        {city}, {province}, {country}
      </h3>
      <p className="text-base">{category}</p>
      <p className="text-base">{type}</p>
      <p className="text-base">
        <span className="font-bold text-lg">${price}</span> per night
      </p>
    </div>
  );
};

ListingCard.propTypes = {
  listingPhotos: PropTypes.arrayOf(PropTypes.string),
};

export default ListingCard;
