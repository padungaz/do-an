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
  initialState: { clients: [] },
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchClient.pending, (state, action) => {})
      .addCase(fetchClient.fulfilled, (state, action) => {
        state.clients = action?.payload;
      })
      .addCase(fetchClient.rejected, (state, action) => {});
  },
});

const { reducer: clientReducer } = clientSlice;
export default clientReducer;
