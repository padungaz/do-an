import { configureStore } from "@reduxjs/toolkit";
import addTourReducer from "./admin/addTourSlice";

const store = configureStore({
    reducer: {
        addTourReducer,
    },
});
export default store;