import React, { useEffect, useState } from "react";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import bookingApi from "../apis/modules/booking.api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetBookPlace } from "../redux/state";
import { useNavigate } from "react-router-dom";
import { endOfDay, isWithinInterval, startOfDay } from "date-fns";

const PaymentForm = ({ clientSecret, handleSetPaymentSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const bookingPlace = useSelector((state) => state.bookingPlace);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!clientSecret) {
      return;
    }

    handleSetPaymentSuccess(false);
    setIsLoading(false);
  }, [stripe]);

  const hasOverlap = (startDate, endDate, dateRanges) => {
    const targetInterval = {
      start: startOfDay(new Date(startDate)),
      end: endOfDay(new Date(endDate)),
    };

    for (const range of dateRanges) {
      const rangeStart = startOfDay(new Date(range.startDate));
      const rangeEnd = endOfDay(new Date(range.endDate));

      if (
        isWithinInterval(targetInterval.start, {
          start: rangeStart,
          end: rangeEnd,
        }) ||
        isWithinInterval(targetInterval.end, {
          start: rangeStart,
          end: rangeEnd,
        }) ||
        (targetInterval.start < rangeStart && targetInterval.end > rangeEnd)
      ) {
        return true;
      }
    }

    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements || !bookingPlace) return;

    try {
      const response = await bookingApi.getBookingByPlace(
        bookingPlace.place._id
      );

      const placeBookingDates = response.bookings.map((booking) => {
        return {
          startDate: booking.startDate,
          endDate: booking.endDate,
        };
      });
      const overlapFound = hasOverlap(
        bookingPlace.startDate,
        bookingPlace.endDate,
        placeBookingDates
      );

      if (overlapFound) {
        setIsLoading(false);
        return toast.error(
          "Some of days you are trying to book have already been reserved. Please go back and select different dates or rooms"
        );
      }
      stripe
        .confirmPayment({ elements, redirect: "if_required" })
        .then(async (result) => {
          if (!result.error) {
            try {
              const response = await bookingApi.booking(
                result.paymentIntent.id
              );
              if (response.status === 200) toast.success("Homestay reserved");
              navigate("/");

              dispatch(resetBookPlace());
              handleSetPaymentSuccess(true);
              setIsLoading(false);
            } catch (error) {
              console.log(error);
              toast.error("Something went wrong!");
              setIsLoading(false);
            }
          } else {
            setIsLoading(false);
          }
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <h2 className="font-semibold mb-2 text-lg">Billing Address</h2>
      <AddressElement
        options={{
          mode: "billing",
        }}
      />
      <h2 className="font-semibold mt-4 mb-2 text-lg">Payment Information</h2>
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <div className="flex flex-col gap-1">
        <hr className="my-5" />
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold mb-1 text-lg">Your Booking Summary</h2>
          <div>You will check-in on {bookingPlace?.startDate} at 5PM</div>
          <div>You will check-out on {bookingPlace?.endDate} at 5PM</div>
        </div>
        <hr className="my-5" />

        <div className="font-bold text-lg">
          Total Price: ${bookingPlace?.totalPrice}
        </div>
      </div>
      <button
        className={`my-3 text-white px-5 py-3 bg-blue-400 rounded-lg ${
          !isLoading && "cursor-pointer"
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Processing Payment..." : "Pay Now"}
      </button>
      <ToastContainer />
    </form>
  );
};

export default PaymentForm;
