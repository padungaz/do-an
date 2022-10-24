// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import { ROUTES, ROUTES_ADMIN, ROUTES_USER } from "./constants";

// import AdminRoute from "../hocs/AdminRoute";

// // import LayoutAdmin from "../components/LayoutAdmin";
// // const LayoutAdmin = React.lazy(() =>
// //   import("../containers/AdminPage/CourseManagementPage")
// // );
// // import OderDetails from "../components/OderDetails";
// // import OverViewPage from "../components/OverViewPage";
// // import Oder from "../components/Oder";
// // import CustomerManagement from "../components/CustomerManagement";
// // import AddTour from "../components/AddTour";

// const OverViewPage = React.lazy(() => import("../components/OverViewPage"));
// const Oder = React.lazy(() => import("../components/Oder"));
// const CustomerManagement = React.lazy(() =>
//   import("../components/CustomerManagement")
// );
// const AddTour = React.lazy(() => import("../components/AddTour"));
// const OderDetails = React.lazy(() => import("../components/OderDetails"));

// const Routing = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <AdminRoute path={ROUTES_ADMIN.OVERVIEW_PAGE} element={OverViewPage} />
//         <AdminRoute path={ROUTES_ADMIN.TOUR_MANAGEMENT} element={Oder} />
//         <AdminRoute
//           path={ROUTES_ADMIN.ODER_MANAGEMENT}
//           element={CustomerManagement}
//         />
//         <AdminRoute path={ROUTES_ADMIN.ADD_MANAGEMENT} element={AddTour} />
//         <AdminRoute path={ROUTES_ADMIN.TOUR_DETAIL} element={OderDetails} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default Routing;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ROUTES, ROUTES_ADMIN, ROUTES_USER } from "./constants";

import LayoutAdmin from "../components/LayoutAdmin";
import OderDetails from "../components/OderDetails";
import OverViewPage from "../components/OverViewPage";
import Oder from "../components/Oder";
import AddTour from "../components/AddTour";
import CustomerManagement from "../components/CustomerManagement";
import TourList from "../components/TourList";
import Products from "../components/Products";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path={ROUTES_ADMIN.HOME} element={<LayoutAdmin />} /> */}
        <Route
          path={ROUTES_ADMIN.OVERVIEW_PAGE}
          element={<LayoutAdmin>{<OverViewPage />}</LayoutAdmin>}
        />
        {/* <Route
          path={ROUTES_ADMIN.TOUR_LIST_MANAGEMENT}
          element={<LayoutAdmin>{<TourList />}</LayoutAdmin>}
        />
        <Route
          path={ROUTES_ADMIN.TOUR_MANAGEMENT}
          element={<LayoutAdmin>{<Oder />}</LayoutAdmin>}
        /> */}

        <Route
          path={ROUTES_ADMIN.TOUR_LIST_MANAGEMENT}
          element={<LayoutAdmin>{<Products />}</LayoutAdmin>}
        />
        <Route
          path={ROUTES_ADMIN.TOUR_MANAGEMENT}
          element={<LayoutAdmin>{<Products />}</LayoutAdmin>}
        />

        <Route
          path={ROUTES_ADMIN.ODER_MANAGEMENT}
          element={<LayoutAdmin>{<CustomerManagement />}</LayoutAdmin>}
        />
        <Route
          path={ROUTES_ADMIN.ADD_MANAGEMENT}
          element={<LayoutAdmin>{<AddTour />}</LayoutAdmin>}
        />
        <Route
          path={ROUTES_ADMIN.TOUR_DETAIL}
          element={<LayoutAdmin>{<OderDetails />}</LayoutAdmin>}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
