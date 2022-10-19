export const ROUTES = {
  HOME: "/",
};

// export const ROUTES_ADMIN = {

// };

// export const ROUTES_USER = {

// };

// const preRoute = "";
const preAdmin = "/admin";
// const preUser = "/user";

// export const ROUTES = {
//   HOME: "/",
//   LOGIN: `${preRoute}/login`,
//   COURSE_DETAIL: `${preRoute}/course/details/:id/`,
// };

export const ROUTES_ADMIN = {
  HOME: `${preAdmin}`,
  PAGE_MANAGEMENT: `${preAdmin}/tour-management`,
  TOUR_MANAGEMENT: `${preAdmin}/tour-management/tour`,
  ODER_MANAGEMENT: `${preAdmin}/tour-management/oder`,
  ADD_MANAGEMENT: `${preAdmin}/tour-management/add`,
  TOUR_DETAIL: `${preAdmin}/tour-management/tour/:name`,
};
