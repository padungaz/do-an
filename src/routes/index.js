import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ROUTES, ROUTES_ADMIN, ROUTES_USER } from "./constants";

import LayoutAdmin from "../components/LayoutAdmin";
import OderDetails from "../components/OderDetails";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES_ADMIN.HOME} element={<LayoutAdmin />} />
        <Route path={ROUTES_ADMIN.TOUR_MANAGEMENT} element={<LayoutAdmin />} />
        <Route path={ROUTES_ADMIN.ODER_MANAGEMENT} element={<LayoutAdmin />} />
        <Route path={ROUTES_ADMIN.ADD_MANAGEMENT} element={<LayoutAdmin />} />
        <Route path={ROUTES_ADMIN.TOUR_DETAIL} element={<OderDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
