import axios from "axios";
import queryString from "query-string";

const baseURL = "http://localhost:3000/api/v1";

const publicJsonClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: params => queryString.stringify(params)
  }
});

publicJsonClient.interceptors.request.use(async config => {
  return {
    ...config,
    headers: {
        'Content-Type': 'application/json'
    }
  };
});

publicJsonClient.interceptors.response.use((response) => {
  if (response && response.data) return response.data;
  return response;
}, (err) => {
  throw err.response.data;
});

export default publicJsonClient;