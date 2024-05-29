import { useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { facilities } from "../configs/categories";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import PaymentForm from "../components/PaymentForm";
import Navbar from "../components/Navbar";

const stripePromise = loadStripe(
  "pk_test_51PKNdNP2T76IDzY5j8OoNDnXwM7fMvtVHQgPitpiVxIWsc5Q7ycN7MMUb53cZejxHqRLmpFaqEfElx85dzeCEgfi00U2E3aJK0"
);

const BookingPlace = () => {
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { placeId } = useParams();

  const { bookingPlace, paymentIntentId, clientSecret } = useSelector(
    (state) => state
  );

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };

  const handleSetPaymentSuccess = (value) => {
    setPaymentSuccess(value);
  };

  return !(bookingPlace && clientSecret) ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <div className=" bg-gray-100 px-32 pt-10 pb-14 ">
        <div className="max-w-[700px] mx-auto">
          <h3 className=" text-2xl font-semibold mb-6">
            Complete payment to reserve this room!
          </h3>
        </div>
        <div className="max-w-[700px] mx-auto p-5 bg-white rounded-lg">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-4">
              {bookingPlace.place.title}
            </h3>
            <p>Is there anything special about this room?</p>

            <div className="aspect-square overflow-hidden relative w-[100%] h-[200px] rounded-lg my-4">
              <img
                className="object-cover w-[100%] h-[100%]"
                src="https://q-xx.bstatic.com/xdata/images/hotel/840x460/175840216.jpg?k=870a1c15b3455318fdb169d327b9d51952077ad783259f93d36f11534c62e7dc&o="
                alt=""
              />
            </div>
            <div className="grid grid-cols-2 gap-4 content-start text-sm">
              {bookingPlace.place.amenities.map((item, index) => (
                <div
                  className="flex items-center gap-5 text-lg font-semibold mb-1"
                  key={index}
                >
                  <div className="text-base ">
                    {
                      facilities.find((facility) => facility.name === item)
                        ?.icon
                    }
                  </div>
                  <p className="text-base">{item}</p>
                </div>
              ))}
            </div>
            <hr className="my-5" />
            <div>Room Price: ${bookingPlace.place.price}</div>
            <hr className="my-5" />
          </div>
          <Elements options={options} stripe={stripePromise}>
            <PaymentForm
              clientSecret={clientSecret}
              handleSetPaymentSuccess={handleSetPaymentSuccess}
            />
          </Elements>
        </div>
      </div>
    </>
  );
};

export default BookingPlace;
