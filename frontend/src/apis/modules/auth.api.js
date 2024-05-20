import publicClient from "../client/public.client";
import publicJsonClient from "../client/publicJson.client";

const authEndpoints = {
  register: "auth/register",
  login: "auth/login"
};

const authApi = {
  register: async (formData) => {
    try {
      const response = await publicClient.post(
        authEndpoints.register,
        formData
      );

      return response;
    } catch (err) { return err; }
  },
  login: async (data) => {
    try {
      const response = await publicJsonClient.post(
        authEndpoints.login,
        data
      );

      return response;
    } catch (err) { return err; }
  },
  
};

export default authApi;