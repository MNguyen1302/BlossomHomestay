import privateClient from "../client/private.client";

const userEndpoints = {
  addToWishList: (placeId) => `user/add-wish-list/${placeId}`
};

const userApi = {
  addToWishList: async (placeId) => {
    try {
      const response = await privateClient.patch(
        userEndpoints.addToWishList(placeId)
      );

      return response;
    } catch (err) { return err; }
  }
};

export default userApi;