import axios from "axios";
import queryString from "query-string";

const baseApiConfig = {
  baseURL: "http://localhost:3011",
  headers: {
    "content-type": "application/json",
  },
  timeout: 600000, // 600s = 10 mins
  paramsSerializer: (params) => queryString.stringify(params),
};

const baseApiClient = axios.create(baseApiConfig);

const request = ({
  enableFlashMessageError = true,
  enableFlashMessageSuccess = false,
  isAuth = true,
  ...options
}) => {
  const onSuccess = (response) => {
    console.log("response: ", response);
    return response;
  };

  const onError = (error) => {
    return Promise.reject(error.response);
  };

  return baseApiClient(options).then(onSuccess).catch(onError);
};

export default request;
