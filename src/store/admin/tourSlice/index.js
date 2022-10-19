import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../../constants";

export const fetchTour = createAsyncThunk("tour/fetchTour", async (payload) => {
  // console.log("fetchTour ~ payload", payload);
  const res = await axios
    .get(URL)
    .then((result) => {
      // console.log("fetchTour ~ result", result);
      return result.data;
    })
    .catch((error) => {
      // console.log("fetchTour ~ error", error);
    });
  return res;
});

export const addTour = createAsyncThunk(
  "tour/addTour",
  async (payload, store) => {
    // console.log("addTour ~ payload", payload);
    const res = await axios
      .post(URL, payload)
      .then((result) => {
        // console.log("addTour ~ result", result);
        store.dispatch(fetchTour());
      })
      .catch((error) => {
        // console.log("addTour ~ error", error);
      });
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
