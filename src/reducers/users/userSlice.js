import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userLoginAPI = createAsyncThunk("userLoginAPI", async ({ email, password }, { rejectWithValue }) => {
    try{ 
        const payload = {
                'username': email, 
                'password': password
            }
        
        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }

        const response = await axios.post(
            `http://192.168.0.167:8000/api/users/login/`, 
            payload,
            config
        )  
        console.log("login res", response);
            
        return response.data;
    } catch (error) {
        // Return a rejected promise with the error message
        console.log(error.response.data.detail);
        return rejectWithValue(error.response ? error.response.data.detail : error.message);
      }
});

export const userRegisterAPI = createAsyncThunk("userRegisterAPI", async ({ name, email, password }, { rejectWithValue }) => {
    try{ 
        const payload = {
                'first_name': name,
                'username': email, 
                'password': password
            }
        console.log("register payload", payload);
        
        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }

        const response = await axios.post(
            `http://192.168.0.167:8000/api/users/register`, 
            payload,
            config
        )  
        console.log("register res", response);
            
        return response.data;
    } catch (error) {
        // Return a rejected promise with the error message
        console.log(error.response.data.detail);
        return rejectWithValue(error.response ? error.response.data.detail : error.message);
    }
});

// get item from storage and save in initial state
const loginDetailFromStorage = {
        isLoggedIn: localStorage.getItem('user_info') ? true : false,
        isLoading: false,
        isError: false,
        errorMessage: null,
        product_data: [],
        userInfo: localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')) : null
    }

const initialState = loginDetailFromStorage 

const loginSlice = createSlice({
    name:'login',
    initialState,
    reducers: {
        logOut: (state) => {
            localStorage.removeItem("user_info")
            state.isLoggedIn = false;
            state.userInfo = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(userLoginAPI.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(userLoginAPI.fulfilled, (state, action) => {  
            console.log("action payload from login", action.payload);
            state.isLoggedIn = true
            state.isLoading = false
            state.isError = false
            const user_information = {
                name:action.payload.name,
                email:action.payload.email,
                refresh_token:action.payload.refresh
            }
            state.userInfo = user_information
            localStorage.setItem("user_info", JSON.stringify(user_information))
        });

        builder.addCase(userLoginAPI.rejected, (state, action) => {
            console.log("ERROR :: ", action.payload);
            state.errorMessage = action.payload
            state.isLoggedIn = false
            state.isError = true
            state.isLoading = false;
            state.userInfo = null
        });

        builder.addCase(userRegisterAPI.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(userRegisterAPI.fulfilled, (state, action) => {  
            console.log("action payload from register", action.payload);
            state.isLoggedIn = true
            state.isLoading = false
            state.isError = false
            const user_information = {
                name:action.payload.name,
                email:action.payload.email,
                refresh_token:action.payload.token
            }
            state.userInfo = user_information
            localStorage.setItem("user_info", JSON.stringify(user_information))
        });

        builder.addCase(userRegisterAPI.rejected, (state, action) => {
            console.log("ERROR register:: ", action.payload);
            state.errorMessage = action.payload
            state.isLoggedIn = false
            state.isError = true
            state.isLoading = false;
            state.userInfo = null
        });
    },
});

export const { logOut } = loginSlice.actions;
export default loginSlice.reducer;