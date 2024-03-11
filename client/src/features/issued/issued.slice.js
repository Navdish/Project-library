import {createSlice} from "@reduxjs/toolkit"
import { createIssue } from "./issued.action";

const initialState = {
    isLoading : false,
    issued: [],
    returned: [],
    error: null,
}



export const issuedSlice = createSlice({
    name: 'issued',
    initialState,
    reducers: {},
    extraReducers: (builder)=> {
        builder.addCase(createIssue.pending, (state)=> {
            state.isLoading = true;
        })
        builder.addCase(createIssue.fulfilled, (state, action)=> {
            state.isLoading = false;
            if(state.issued.length === 0) state.issued = [action.payload];
            else state.issued = [...state.issued, action.payload];
        })
        builder.addCase(createIssue.rejected, (state, action)=> {
            state.isLoading = false;
            state.error = action.error;
        })
        
    }
})

export default issuedSlice.reducer
