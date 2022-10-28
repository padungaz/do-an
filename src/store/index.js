import { configureStore } from "@reduxjs/toolkit";
import tourReducer from "./admin/tourSlice";
import paymentReducer from "./admin/paymentSlice";
import oderReducer from "./admin/tourSlice";
import clientReducer from "./admin/clientSlice";
import accountReducer from "./admin/accountSlice";

const store = configureStore({
  reducer: {
    tourReducer,
    paymentReducer,
    oderReducer,
    clientReducer,
    accountReducer,
  },
});
export default store;
