import { configureStore } from "@reduxjs/toolkit";
import tourReducer from "./admin/tourSlice";
import paymentReducer from "./admin/paymentSlice";
import oderReducer from "./admin/tourSlice";

const store = configureStore({
  reducer: {
    tourReducer,
    paymentReducer,
    oderReducer,
  },
});
export default store;
