import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL_tOUR } from "../../../constants";

// export const fetchTour = createAsyncThunk("tour/fetchTour", async (payload) => {
//   const res = await axios
//     .get(URL_tOUR)
//     .then((result) => {
//       return result.data;
//     })
//     .catch((error) => {});
//   return res;
// });

export const fetchTour = createAsyncThunk(
  "client/fetchTour",
  async (params) => {
    console.log("param", params);
    const res = await axios
      .get(
        `${URL_tOUR}?_page=${params.page}&_limit=${params.per_page}&q=${
          params?.name ? params?.name : ""
        }`
      )
      .then((result) => {
        return result.data;
      })
      .catch((error) => {});
    return res;
  }
);

export const addTour = createAsyncThunk(
  "tour/addTour",
  async (payload, store) => {
    const res = await axios
      .post(URL_tOUR, payload)
      .then((result) => {
        store.dispatch(fetchTour());
      })
      .catch((error) => {});
    return res;
  }
);

const tourSlice = createSlice({
  name: "tour",
  initialState: { tours: [] },
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(addTour.pending, (state, action) => {
        // console.log("addTour.pending", { state, action });
      })
      .addCase(addTour.fulfilled, (state, action) => {
        // console.log("addTour.fulfilled", { state, action });
        state.tours = action.payload;
      })
      .addCase(addTour.rejected, (state, action) => {
        // console.log("addTour.rejected", { state, action });
      })

      .addCase(fetchTour.pending, (state, action) => {
        // console.log("fetchTour.pending", { state, action });
      })
      .addCase(fetchTour.fulfilled, (state, action) => {
        // console.log("fetchTour.fulfilled", { state, action });
        state.tours = action.payload;
      })
      .addCase(fetchTour.rejected, (state, action) => {
        // console.log("fetchTour.rejected", { state, action });
      });
  },
});

const { reducer: tourReducer } = tourSlice;
export default tourReducer;
