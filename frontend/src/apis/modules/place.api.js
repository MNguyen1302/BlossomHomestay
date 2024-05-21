import publicClient from "../client/public.client";
import publicJsonClient from "../client/publicJson.client";

const placeEndpoints = {
  createPlace: "place/create",
  getPlacesByCategory: (category) => `place?category=${category}`,
  getDetail: (placeId) => `place/${placeId}`
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
      const response = await publicJsonClient.get(
        placeEndpoints.getPlacesByCategory(category),
      );

      return response;
    } catch (err) { return err; }
  },
  getDetail: async (placeId) => {
    try {
        const response = await publicJsonClient.get(
            placeEndpoints.getDetail(placeId)
        )

        return response
    } catch (err) {
        return err;
    }
  }
};

export default placeApi;