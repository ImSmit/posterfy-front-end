// Not using this code
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("fetchProducts", async () => {    
    const response = await axios.get("https://imsmit.pythonanywhere.com/api/products/")
    return response.data;
})

const initialState = {
    isLoading: false,
    products: [],
    isError: false,
    errorMessage: null
}

const products_slice = createSlice({
    name:'products',
    initialState,
    extraReducers: builder => {
        
        builder.addCase(fetchProducts.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(fetchProducts.fulfilled, (state, action) => {                        
            state.isLoading = false;
            state.isError = false;
            state.products = action.payload;
        });

        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.error.message
        });

    },
})

// react tool kit will not know which actions needs to created so we have to define 
// export default productSlice.reducer;
// export const { productReducer } = productSlice.actions;
export default products_slice.reducer; // not reducres egnore "s"
