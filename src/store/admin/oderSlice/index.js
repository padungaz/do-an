import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../../constants";

export const addOder = createAsyncThunk("oder/addOder", async (payload) => {

  const res = await axios
    .post(URL, payload)
    .then((result) => {
    })
    .catch((error) => {
    });
  return res;
});

export const fetchTour = createAsyncThunk("tour/fetchTour", async (payload) => {
  const res = await axios
    .get(URL)
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
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
      })
      .addCase(addOder.fulfilled, (state, action) => {
        state.tours = action.payload;
      })
      .addCase(addOder.rejected, (state, action) => {
      })

      .addCase(fetchTour.pending, (state, action) => {
      })
      .addCase(fetchTour.fulfilled, (state, action) => {
        state.tours = action.payload;
      })
      .addCase(fetchTour.rejected, (state, action) => {
      });
  },
});

const { reducer: oderReducer } = oderSlice;
export default oderReducer;
