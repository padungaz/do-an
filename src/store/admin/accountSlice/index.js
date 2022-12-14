import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL_ACCOUNT } from "../../../constants";

export const fetchAccount = createAsyncThunk(
  "account/fetchAccount",
  async () => {
    const res = await axios
      .get(URL_ACCOUNT)
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
      });
    return res;
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState: { accounts: [] },
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchAccount.pending, (state, action) => {
      })

      .addCase(fetchAccount.fulfilled, (state, action) => {
        state.accounts = action.payload;
      })
      .addCase(fetchAccount.rejected, (state, action) => {
      });
  },
});

const { reducer: accountReducer } = accountSlice;

export default accountReducer;
