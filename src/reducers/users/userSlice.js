import { createSlice } from "@reduxjs/toolkit";

// get item from storage and save in initial state
const loginDetailFromStorage = {
        isLoggedIn: localStorage.getItem('user_info') ? true : false,
        isLoading: false,
        isError: false,
        errorMessage: null,
        product_data: [],
        userInfo: localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')) : null,
        userDetails: null
        
    }

const initialState = loginDetailFromStorage 

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        logOut: (state) => {
            localStorage.removeItem("user_info")
            state.isLoggedIn = false;
            state.userInfo = null;
        },
        loginSuccess: (state, action) => {
            console.log("action payload from login", action.payload);
            state.isLoggedIn = true
            state.isLoading = false
            state.isError = false
            const user_information = {
                name: action.payload.name,
                email: action.payload.email,
                token: action.payload.token
            }
            state.userInfo = user_information
            localStorage.setItem("user_info", JSON.stringify(user_information))
        },
        getUser: (state = {userDetail: {}}, action) => {
            console.log("action ======> ", action);
            const user_information = {
                name: action.payload.data.name,
                email: action.payload.data.email,
                token: action.payload.data.token
            }
            state.userInfo = user_information
            localStorage.setItem("user_info", JSON.stringify(user_information))
            state.userDetail = action.payload.data
        },
    },
});

export const { logOut, loginSuccess, getUser } = userSlice.actions;
export default userSlice.reducer;