import { configureStore } from "@reduxjs/toolkit";
import addTourReducer from "./admin/addTourSlice";
import paymentReducer from "./admin/paymentSlice";

const store = configureStore({
    reducer: {
        addTourReducer,
        paymentReducer,
    },
});
export default store;