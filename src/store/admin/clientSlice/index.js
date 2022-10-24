import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL_CLIENT } from "../../../constants";

export const fetchClient = createAsyncThunk(
  "client/fetchClient",
  async (payload) => {
    // console.log("fetchClient ~ payload", payload);
    const res = await axios
      .get(URL_CLIENT)
      .then((result) => {
        // console.log("fetchClient ~ result", result);
        return result.data;
      })
      .catch((error) => {
        // console.log("fetchClient ~ error", error);
      });
    return res;
  }
);

const clientSlice = createSlice({
  name: "client",
  initialState: { clients: [] },
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchClient.pending, (state, action) => {
        // console.log("fetchClient.pending", { state, action });
      })
      .addCase(fetchClient.fulfilled, (state, action) => {
        // console.log("fetchClient.fulfilled", { state, action });
        state.clients = action.payload;
      })
      .addCase(fetchClient.rejected, (state, action) => {
        // console.log("fetchClient.rejected", { state, action });
      });
  },
});

const { reducer: clientReducer } = clientSlice;
export default clientReducer;
