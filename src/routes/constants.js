const preRoute = "";
const preAdmin = "/admin";
const preUser = "/user";

export const ROUTES = {
  HOME: "/",
  LOGIN: `${preRoute}/login`,
  COURSE_DETAIL: `${preRoute}/course/details/:id/`,
};

export const ROUTES_ADMIN = {
  HOME: `${preAdmin}`,
  OVERVIEW_PAGE: `${preAdmin}/overview`,
  PAGE_MANAGEMENT: `${preAdmin}/products`,
  TOUR_lIST: `${preAdmin}/products/tour-list`,
  ALL_TOUR_LIST: `${preAdmin}/products/all-tour-list`,
  ODER_MANAGEMENT: `${preAdmin}/oder`,
  // BOOKING: `${preAdmin}/oder`,
  ADD_MANAGEMENT: `${preAdmin}/add`,
  TOUR_DETAIL: `${preAdmin}/products/:name`,
};
