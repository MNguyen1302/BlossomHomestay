import publicClient from "../client/public.client";
import publicJsonClient from "../client/publicJson.client";

const placeEndpoints = {
  createPlace: "place/create",
  getPlacesByCategory: (category) => `place?category=${category}`
};

const placeApi = {
  createPlace: async (formData) => {
    try {
      const response = await publicClient.post(
        placeEndpoints.createPlace,
        formData
      );

      return response;
    } catch (err) { return err; }
  },
  getPlacesByCategory: async (category) => {
    try {
      const response = await publicClient.post(
        placeEndpoints.getPlacesByCategory(category),
      );

      return response;
    } catch (err) { return err; }
  },
};

export default placeApi;