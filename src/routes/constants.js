// const preAdmin = "/admin";

// export const ROUTES = {
//   HOME: "/",
// };

// export const ROUTES_ADMIN = {
//   HOME: `${preAdmin}`,
//   PAGE_MANAGEMENT: `${preAdmin}/tour-management`,
//   TOUR_MANAGEMENT: `${preAdmin}/tour-management/tour`,
//   ODER_MANAGEMENT: `${preAdmin}/tour-management/oder`,
//   ADD_MANAGEMENT: `${preAdmin}/tour-management/add`,
//   TOUR_DETAIL: `${preAdmin}/tour-management/tour/:name`,
// };

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
  // TOUR_MANAGEMENT: `${preAdmin}/tour`,
  // TOUR_LIST_MANAGEMENT: `${preAdmin}/tour-list`,
  TOUR_MANAGEMENT: `${preAdmin}/products/tour`,
  TOUR_LIST_MANAGEMENT: `${preAdmin}/products/tour-list`,
  ODER_MANAGEMENT: `${preAdmin}/oder`,
  ADD_MANAGEMENT: `${preAdmin}/add`,
  TOUR_DETAIL: `${preAdmin}/tour/:name`,
};
