import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL_PAYMENT } from "../../../constants";

export const paymentEdit = createAsyncThunk(
    "payment/paymentEdit",
    async (payload) => {
        console.log("paymentEdit ~ payload", payload);
        const res = await axios
            .post(URL_PAYMENT, payload)
            .then((result) => {
                console.log("paymentEdit ~ result", result);
            })
            .catch((error) => {
                console.log("paymentEdit ~ error", error);
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
                console.log("paymentEdit.pending", { state, action });
            })
            .addCase(paymentEdit.fulfilled, (state, action) => {
                console.log("paymentEdit.fulfilled", { state, action });
                state.todos = action.payload;
            })
            .addCase(paymentEdit.rejected, (state, action) => {
                console.log("paymentEdit.rejected", { state, action });
            })
    },
});

const { reducer: paymentEditReducer } = paymentSlice;
export default paymentEditReducer;

