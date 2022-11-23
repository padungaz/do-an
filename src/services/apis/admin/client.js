// const API_URL = "http://localhost:3011";

import request from "../../request";

export const getListClientApi = async (params) =>
  request({
    url: "/client",
    method: "GET",
    params,
  });

// export const getListClientApi = async (path) => {
//   // console.log(path);
//   const slide = await fetch(
//     API_URL + `/client?_page=${path.page}&_limit=${path.limit}${path.name}`
//   ).then((res) => res.json());
//   // console.log("slide", slide);
//   return slide;
// };
