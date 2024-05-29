import privateClient from "../client/private.client";
import publicJsonClient from "../client/publicJson.client";

const placeEndpoints = {
  createPayment: "booking/create-payment-intent",
  booking: (paymentIntentId) => `booking/${paymentIntentId}`,
  getBookingByPlace: (placeId) => `booking/${placeId}`
};

const placeApi = {
  createPayment: async (data) => {
    try {
      const response = await privateClient.post(
        placeEndpoints.createPayment,
        data
      );

      return response;
    } catch (err) { return err; }
  },
  booking: async (paymentIntentId) => {
    try {
        const response = await privateClient.patch(
            placeEndpoints.booking(paymentIntentId)
        );

        return response;
    } catch (err) {
        return err
    }
  },
  getBookingByPlace: async (placeId) => {
    try {
        const response = await publicJsonClient.get(
            placeEndpoints.getBookingByPlace(placeId)
        );

        return response;
    } catch (err) {
        return err
    }
  }
};

export default placeApi;