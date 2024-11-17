// Note: Not using this code
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProduct = createAsyncThunk("fetchProduct", async (id) => {
    console.log("====> fetchProduct called");
    
    const response = await axios.get(`https://imsmit.pythonanywhere.com/api/products/${id}`)
    return response.data.data;  
})

const initialState = {
    isLoading: false,
    product: { reviews:[] },
    isError: true,
    errorMessage: null
} 
// Dont use same name as file it will call every time this function
const product_slice = createSlice({
    name:'product',
    initialState,
    reducers: {},
    extraReducers: builder => {
        
        builder.addCase(fetchProduct.pending, (state) => {            
            state.isLoading = true;
        });

        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            console.log(action.payload)
            state.isLoading = false;
            state.isError = false;
            state.product = action.payload;
        });

        builder.addCase(fetchProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.error.message
        });

    }
})

export default product_slice.reducer;