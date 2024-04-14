import axios from "axios";

// use this to interact with our own API (/app/api folder) from the front-end side
// See https://.st/docs/tutorials/api-call
const apiClient = axios.create({
  baseURL: "/api",
});

apiClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    let message = "";

    if (error.response?.status === 401) {
      // User not auth, ask to re login
      console.log("Please login");
      // automatically redirect to /dashboard page after login
    } else if (error.response?.status === 403) {
      // User not authorized, must subscribe/purchase/pick a plan
      message = "Pick a plan to use this feature";
    } else {
      message =
        error?.response?.data?.error || error.message || error.toString();
    }

    error.message =
      typeof message === "string" ? message : JSON.stringify(message);

    console.log(error.message);

    if (error.message) {
      console.log(error.message);
    } else {
      console.log("something went wrong...");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
