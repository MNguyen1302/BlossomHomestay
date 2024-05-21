import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import placeApi from "../apis/modules/place.api";
import { facilities } from "../configs/categories";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

const PlaceDetail = () => {
  const [loading, setLoading] = useState(true);
  const [place, setPlace] = useState(null);

  const { placeId } = useParams();

  const getPlaceDetail = async () => {
    try {
      const response = await placeApi.getDetail(placeId);
      setPlace(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPlaceDetail();
  }, []);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <div className="mt-10 mx-[130px] mb-[120px] xl:mx-[80px] lg:mx-[50px] sm:mx-5">
        <div className="flex justify-between items-center sm:flex-col sm:items-start sm:gap-[15px]">
          <h1 className="sm:text-[26px] text-3xl font-medium">{place.title}</h1>
          <div></div>
        </div>

        <div className="flex flex-wrap gap-[10px] my-5">
          {place.listingPhotos.map((item, index) => (
            <img className="max-w-[280px]" key={index} src={item} alt="" />
          ))}
        </div>

        <h2 className="text-2xl font-medium">
          {place.type} in {place.city}, {place.province}, {place.country}
        </h2>

        <p className="max-w-[800px] mt-5 text-lg">
          {place.guestCount} guests - {place.bedroomCount} bedroom(s) -{" "}
          {place.bedCount} bed(s) - {place.bathroomCount} bathroom(s)
        </p>
        <hr className="my-5" />

        <div className="flex gap-5 items-center">
          <img
            className="w-[60px] h-[60px] m-0"
            src={place.creator.avatar}
            alt="Profile"
          />
          <h3 className="text-slate-700 text-xl font-medium">
            Hosted by {place.creator.firstName} {place.creator.lastName}
          </h3>
        </div>
        <hr className="my-5" />

        <h3 className="text-slate-700 text-xl font-medium">Description</h3>
        <p className="max-w-[800px] mt-5 text-lg">{place.description}</p>
        <hr className="my-5" />

        <h3 className="text-slate-700 text-xl font-medium">
          {place.highlight}
        </h3>
        <p className="max-w-[800px] mt-5 text-lg">{place.highlightDesc}</p>
        <hr className="my-5" />

        <div className="flex justify-between lg:flex-col lg:gap-[50px]">
          <div>
            <h2 className="text-2xl font-medium">What this place offers?</h2>
            <div className="grid grid-cols-1-1 gap-x-[100px] my-[30px] max-w-[700px] sm:gap-x-[20px]">
              {place.amenities.map((item, index) => (
                <div
                  className="flex items-center gap-5 text-lg font-semibold mb-5"
                  key={index}
                >
                  <div className="text-3xl">
                    {
                      facilities.find((facility) => facility.name === item)
                        ?.icon
                    }
                  </div>
                  <p className="my-[30px] text-lg">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-medium">
              How long do you want to stay?
            </h2>
            <div className="my-[30px]">
              <DateRange ranges={dateRange} onChange={handleSelect} />
              {dayCount > 1 ? (
                <h2 className="mb-[10px] text-2xl font-medium">
                  ${place.price} x {dayCount} nights
                </h2>
              ) : (
                <h2 className="mb-[10px] text-2xl font-medium">
                  ${place.price} x {dayCount} night
                </h2>
              )}
              <h2 className="mb-[10px] text-2xl font-medium">
                Total Price: ${place.price * dayCount}
              </h2>
              <p className="text-lg">
                Start Date: {dateRange[0].startDate.toDateString()}
              </p>
              <p className="text-lg">
                End Date: {dateRange[0].endDate.toDateString()}
              </p>

              <button
                className="mt-[30px] w-[100%] bg-blue-400 text-white p-[15px] rounded-xl lg:max-w-[300px]"
                type="submit"
              >
                Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceDetail;
