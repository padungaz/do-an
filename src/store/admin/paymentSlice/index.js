import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL_PAYMENT } from "../../../constants";

export const paymentEdit = createAsyncThunk(
    "payment/paymentEdit",
    async (payload) => {
 
        const res = await axios
            .post(URL_PAYMENT, payload)
            .then((result) => {
   
            })
            .catch((error) => {
     
            });
        return res;
    }
);

const paymentSlice = createSlice({
    name: 'payment',
    initialState: { payment: [] },
    reducers: {},

    extraReducers(builder) {
        builder
            .addCase(paymentEdit.pending, (state, action) => {

            })
            .addCase(paymentEdit.fulfilled, (state, action) => {
      
                state.todos = action.payload;
            })
            .addCase(paymentEdit.rejected, (state, action) => {

            })
    },
});

const { reducer: paymentEditReducer } = paymentSlice;
export default paymentEditReducer;

