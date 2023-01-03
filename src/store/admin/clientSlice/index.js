import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL_CLIENT } from "../../../constants";
// import { getListClientApi } from "../../../services/apis/admin/client";

export const fetchClient = createAsyncThunk(
  "client/fetchClient",
  async (params) => {
    const res = await axios
      .get(
        `${URL_CLIENT}?_page=${params.page}&_limit=${
          params.per_page
        }&nameTour_like=${params?.name ? params?.name.trim() : ""}`
      )
      .then((result) => {
        return result.data;
      })
      .catch((error) => {});
    return res;
  }
);

export const fetchClientDetails = createAsyncThunk(
  "clientsDetails/fetchClientDetails",
  async (params) => {
    console.log("param-clientsDetails", params);
    const res = await axios
      .get(`${URL_CLIENT}?nameTour=${params}`)
      .then((result) => {
        console.log("clientsDetails", result);
        return result?.data;
      })
      .catch((error) => {});
    return res;
  }
);

// export const fetchClient = createAsyncThunk(
//   "client/fetchClient",
//   async (params) => {
//     try {
//       const response = await getListClientApi(params);
//       return response?.data;
//     } catch (error) {

//     }
//   }
// );

const clientSlice = createSlice({
  name: "client",
  initialState: { clients: [], clientsDetails: [] },
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchClient.pending, (state, action) => {})
      .addCase(fetchClient.fulfilled, (state, action) => {
        state.clients = action?.payload;
      })
      .addCase(fetchClient.rejected, (state, action) => {})

      .addCase(fetchClientDetails.pending, (state, action) => {})
      .addCase(fetchClientDetails.fulfilled, (state, action) => {
        console.log("fetchClientDetails", { state, action });
        state.clientsDetails = action?.payload;
      })
      .addCase(fetchClientDetails.rejected, (state, action) => {});
  },
});

const { reducer: clientReducer } = clientSlice;
export default clientReducer;
