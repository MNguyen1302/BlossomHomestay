import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import placeApi from "../apis/modules/place.api";
import bookingApi from "../apis/modules/booking.api";
import { facilities } from "../configs/categories";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  setBookingPlace,
  setClientSecret,
  setPaymentIntentId,
} from "../redux/state";
import { eachDayOfInterval } from "date-fns";

const PlaceDetail = () => {
  const [loading, setLoading] = useState(true);
  const [place, setPlace] = useState(null);
  const [bookings, setBookings] = useState([]);

  const { placeId } = useParams();

  const userId = useSelector((state) => state.user?._id);
  const paymentIntentId = useSelector((state) => state.paymentIntentId);

  const dispatch = useDispatch();

  const getPlaceDetail = async () => {
    try {
      const response = await placeApi.getDetail(placeId);
      setPlace(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getBookings = async () => {
    try {
      const response = await bookingApi.getBookingByPlace(placeId);
      setBookings(response.bookings);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPlaceDetail();
    getBookings();
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

  const navigate = useNavigate();

  const handleBookRoom = async () => {
    if (!userId) {
      toast.error("Make sure you are logged in");
      return;
    }

    if (!place.creator._id) {
      toast.error("Something went wrong, refresh the page and try again");
      return;
    }

    if (dayCount > 0) {
      const bookingRoomData = {
        hostId: place.creator._id,
        placeId: place._id,
        startDate: dateRange[0].startDate.toDateString(),
        endDate: dateRange[0].endDate.toDateString(),
        totalPrice: place.price * dayCount,
        payment_intent_id: paymentIntentId,
      };
      const response = await bookingApi.createPayment(bookingRoomData);
      dispatch(setPaymentIntentId(response.paymentIntent.id));
      dispatch(setClientSecret(response.paymentIntent.client_secret));
      bookingRoomData.place = place;
      dispatch(setBookingPlace(bookingRoomData));
      navigate(`/booking`);
    } else {
      toast.error("Pls select date");
    }
  };

  const disabledDates = useMemo(() => {
    let dates = [];
    console.log(bookings);
    bookings.forEach((booking) => {
      const range = eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });

      dates = [...dates, ...range];
    });
    return dates;
  }, [bookings]);

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
              <DateRange
                ranges={dateRange}
                onChange={handleSelect}
                disabledDates={disabledDates}
                disabledDay={(date) => date < new Date()}
              />
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
                onClick={handleBookRoom}
              >
                Booking
              </button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default PlaceDetail;
