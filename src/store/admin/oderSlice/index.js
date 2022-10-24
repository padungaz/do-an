import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../../constants";

export const addOder = createAsyncThunk("oder/addOder", async (payload) => {
  console.log("addOder ~ payload", payload);
  const res = await axios
    .post(URL, payload)
    .then((result) => {
      console.log("addOder ~ result", result);
    })
    .catch((error) => {
      console.log("addOder ~ error", error);
    });
  return res;
});

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

const oderSlice = createSlice({
  name: "oder",
  initialState: { oders: [] },
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(addOder.pending, (state, action) => {
        // console.log("addOder.pending", { state, action });
      })
      .addCase(addOder.fulfilled, (state, action) => {
        // console.log("addOder.fulfilled", { state, action });
        state.tours = action.payload;
      })
      .addCase(addOder.rejected, (state, action) => {
        // console.log("addOder.rejected", { state, action });
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

const { reducer: oderReducer } = oderSlice;
export default oderReducer;
