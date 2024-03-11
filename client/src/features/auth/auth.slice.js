import {createSlice} from "@reduxjs/toolkit"
import { createUser, login } from "./auth.action";

const initialState = {
    isLoading : false,
    user: {},
    error: null,
}



export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder)=> {
        builder.addCase(createUser.pending, (state, action)=> {
            state.isLoading = true;
        })
        builder.addCase(createUser.fulfilled, (state, action)=> {
            state.isLoading = false;
        })
        builder.addCase(createUser.rejected, (state, action)=> {
            state.isLoading = false;
            state.error = action.error;
        })
        builder.addCase(login.pending, (state, action)=> {
            state.isLoading = true;
        })
        builder.addCase(login.fulfilled, (state, action)=> {
            state.isLoading = false;
            state.user = action.payload.user.user;
            state.error = null;
        })
        builder.addCase(login.rejected, (state, action)=> {
            state.isLoading = false;
            state.error = action.error;
        })
    }
})

export default authSlice.reducer
