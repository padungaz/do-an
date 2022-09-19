import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../constants";

export const fetchTodos = createAsyncThunk("todo/fetchTodos", async () => {
    const res = await axios
        .get(URL)
        .then((result) => {
            console.log("await-axios.get ~ result", result);
            return result.data;
        })
        .catch((error) => {
            console.log("await-axios.get ~ error", error);
        });
    return res;
});

export const addNewTask = createAsyncThunk(
    "todo/addNewTask",
    async (payload, store) => {
        console.log("addNewTask ~ payload", payload);
        const res = await axios
            .post(URL, payload)
            .then((result) => {
                console.log("addNewTask ~ result", result);
                store.dispatch(fetchTodos());
            })
            .catch((error) => {
                console.log("addNewTask ~ error", error);
            });
        return res;
    }
);

export const deleteItem = createAsyncThunk(
    "todo/deleteItem",
    async (payload, store) => {
        const res = await axios
            .delete(`${URL}/${payload}`)
            .then((result) => {
                console.log("deleteItem ~ result", result);
                store.dispatch(fetchTodos()); 
            })
            .catch((error) => {
                console.log("deleteItem ~ error", error);
            });
        return res;
    }
);

export const changeStatus = createAsyncThunk(
    "todo/changeStatus",
    async (payload, store) => {
        const res = await axios
            .patch(`${URL}/${payload.id}`, {
                status: payload.status,
            })
            .then((result) => {
                console.log("changeStatus ~ result", result);
                store.dispatch(fetchTodos()); 
            })
            .catch((error) => {
                console.log("changeStatus ~ error", error);
            });
        return res;
    }
);

export const editItem = createAsyncThunk(
    "todo/editItem",
    async (payload, store) => {
        const res = await axios
            .patch(`${URL}/${payload.id}`, {
                content: payload.content,
            })
            .then((result) => {
                console.log("editItem ~ result", result);
                store.dispatch(fetchTodos());
            })
            .catch((error) => {
                console.log("editItem ~ error", error);
            });
        return res;
    }
);

const todoSlice = createSlice({
    name: 'todo',
    initialState: { todos: [] },
    reducers: {},

    extraReducers(builder) {
        builder
            .addCase(fetchTodos.pending, (state, action) => {
                console.log("fetchTodos.pending", { state, action });
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                console.log("fetchTodos.fulfilled", { state, action });
                state.todos = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                console.log("fetchTodos.rejected", { state, action });
            })

            .addCase(addNewTask.pending, (state, action) => {
                console.log("addNewTask.pending", { state, action });
            })
            .addCase(addNewTask.fulfilled, (state, action) => {
                console.log("addNewTask.fulfilled", { state, action });
                state.todos = action.payload;
            })
            .addCase(addNewTask.rejected, (state, action) => {
                console.log("addNewTask.rejected", { state, action });
            })

            .addCase(deleteItem.pending, (state, action) => {
                console.log("deleteItem.pending", { state, action });
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                console.log("deleteItem.fulfilled", { state, action });
                state.todos = action.payload;
            })
            .addCase(deleteItem.rejected, (state, action) => {
                console.log("deleteItem.rejected", { state, action });
            })

            .addCase(changeStatus.pending, (state, action) => {
                console.log("changeStatus.pending", { state, action });
            })
            .addCase(changeStatus.fulfilled, (state, action) => {
                console.log("changeStatus.fulfilled", { state, action });
                state.todos = action.payload;
            })
            .addCase(changeStatus.rejected, (state, action) => {
                console.log("changeStatus.rejected", { state, action });
            })

            .addCase(editItem.pending, (state, action) => {
                console.log("editItem.pending", { state, action });
            })
            .addCase(editItem.fulfilled, (state, action) => {
                console.log("editItem.fulfilled", { state, action });
                state.todos = action.payload;
            })
            .addCase(editItem.rejected, (state, action) => {
                console.log("editItem.rejected", { state, action });
            });
    },
});

export default todoSlice;

