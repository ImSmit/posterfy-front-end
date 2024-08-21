import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
    const response = await axios.get("http://192.168.0.167:8000/api/products/")
    console.log("res :: ",response);
    return response.data;
})

const initialState = {
    isLoading: false,
    products: [],
    isError: true,
    errorMessage: null
}

const productsSlice = createSlice({
    name:'products',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.products = action.payload;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            console.log("ERROR ::", action.error.message);
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.error.message
        })
    }
})

// react tool kit will not know which actions needs to created so we have to define 
// export default productSlice.reducer;
// export const { productReducer } = productSlice.actions;
export default productsSlice.reducer; // not reducres egnore "s"
