import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL_tOUR } from "../../../constants";

export const fetchTourAll = createAsyncThunk(
  "data/fetchTourAll",
  async (payload) => {
    const res = await axios
      .get(URL_tOUR)
      .then((result) => {
        return result.data;
      })
      .catch((error) => {});
    return res;
  }
);

export const fetchTour = createAsyncThunk(
  "client/fetchTour",
  async (params) => {
    console.log("param", params);
    const res = await axios
      .get(
        `${URL_tOUR}?_sort=id&_order=desc&_page=${params?.page}&_limit=${
          params?.per_page
        }&nameTour_like=${params?.name ? params?.name?.trim() : ""}`
      )
      .then((result) => {
        return result?.data;
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
        store.dispatch(fetchTourAll());
      })
      .catch((error) => {});
    return res;
  }
);

export const editTour = createAsyncThunk(
  "tour/editTour",
  async (payload, store) => {
    const res = await axios
      .put(`${URL_tOUR}/${payload.id}`, {
        ...payload,
      })
      .then((result) => {
        console.log("result", result);
        store.dispatch(fetchTour(payload.filters));
        store.dispatch(fetchTourAll());
      })
      .catch((error) => {
        console.log("editTour ~ error", error);
      });
    return res;
  }
);

const tourSlice = createSlice({
  name: "tour",
  initialState: { tours: [], data: [] },
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(addTour.pending, (state, action) => {})
      .addCase(addTour.fulfilled, (state, action) => {
        state.tours = action.payload;
      })
      .addCase(addTour.rejected, (state, action) => {})

      .addCase(fetchTour.pending, (state, action) => {})
      .addCase(fetchTour.fulfilled, (state, action) => {
        state.tours = action.payload;
      })
      .addCase(fetchTour.rejected, (state, action) => {})

      .addCase(fetchTourAll.pending, (state, action) => {})
      .addCase(fetchTourAll.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(fetchTourAll.rejected, (state, action) => {})

      .addCase(editTour.pending, (state, action) => {
        console.log("editTour.fulfilled", { state, action });
      })
      .addCase(editTour.fulfilled, (state, action) => {
        console.log("editTour.fulfilled", { state, action });
        state.data = action.payload;
      })
      .addCase(editTour.rejected, (state, action) => {});
  },
});

const { reducer: tourReducer } = tourSlice;
export default tourReducer;
