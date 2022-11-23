import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES, ROUTES_ADMIN } from "./constants";

import OverViewPage from "../components/admin/OverViewPage";
import LayoutAdmin from "../containers/LayoutAdmin";
import Products from "../components/admin/Products";
import AddTour from "../components/AddTour";
import CustomerManagement from "../components/admin/CustomerManagement";
import OderDetails from "../components/admin/OderDetails";
import LoginPage from "../components/LoginPage";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />

        <Route
          path={ROUTES_ADMIN.OVERVIEW_PAGE}
          element={<LayoutAdmin>{<OverViewPage />}</LayoutAdmin>}
        />
        <Route
          path={ROUTES_ADMIN.TOUR_lIST}
          element={<LayoutAdmin>{<Products />}</LayoutAdmin>}
        />
        <Route
          path={ROUTES_ADMIN.ALL_TOUR_LIST}
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
