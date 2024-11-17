
import axios from "axios";
import { PRODUCT_LIST_REQUEST, 
         PRODUCT_LIST_SUCCESS, 
         PRODUCT_LIST_FAIL } from "../constants/productConstants";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk('data/fetchData', async () => {
    const response = await fetch('https://imsmit.pythonanywhere.com/api/products/');
    const data = await response.json();
    return data;
});

export const listProducts = () => async (dispatch) => {   
    try{
        dispatch({ type: PRODUCT_LIST_REQUEST })
        let { data } = await axios.get("https://imsmit.pythonanywhere.com/api/products/")
        
        dispatch({ 
            type: PRODUCT_LIST_SUCCESS, 
            payload: data 
        })
    }catch(error){
        console.log("ERROR :: ", error);
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
        }
}
