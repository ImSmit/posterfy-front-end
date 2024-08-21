import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProduct = createAsyncThunk("fetchProduct", async (id) => {
    const response = await axios.get(`http://192.168.0.167:8000/api/product/${id}`)
    return response.data.data;
})

const initialState = {
    isLoading: false,
    product: { reviews:[] },
    isError: true,
    errorMessage: null
} 
const producSlice = createSlice({
    name:'product',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchProduct.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.product = action.payload;
        });
        builder.addCase(fetchProduct.rejected, (state, action) => {
            console.log("ERROR ::", action.error.message);
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.error.message
        })
    }
})

export default producSlice.reducer;