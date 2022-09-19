import { configureStore } from"@reduxjs/toolkit";
import modalSlice from "./slices/modalSlice";
import todoSlice from "./slices/todoSlice"
import filtersSlice from "./slices/filtersSlice"

const store = configureStore({
    reducer: {
      todo: todoSlice.reducer,
      modal: modalSlice.reducer,
      filters:filtersSlice.reducer,
    },
  });
export default store;