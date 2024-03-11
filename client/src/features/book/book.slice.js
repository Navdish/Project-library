import {createSlice, current} from "@reduxjs/toolkit"
import { createBook, deleteBook, fetchBook  } from "./book.action";
import { createIssue } from "../issued/issued.action";

const initialState = {
    isLoading : false,
    postLoader : false,
    book: [],
    error: null,
    postError : null
}



export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {},
    extraReducers: (builder)=> {
        builder.addCase(createBook.pending, (state, action)=> {
            state.postLoader = true;
        })
        builder.addCase(createBook.fulfilled, (state, action)=> {
            state.postLoader = false;
            if(state.book.length === 0) state.book = [action.payload];
            else state.book = [...state.book, action.payload];
        })
        builder.addCase(createBook.rejected, (state, action)=> {
            state.postLoader = false;
            state.error = action.error;
        })
        builder.addCase(fetchBook.pending, (state, action)=> {
            state.isLoading = true;
        })
        builder.addCase(fetchBook.fulfilled, (state, action)=> {
            state.isLoading = false;
            state.book = action.payload;
        })
        builder.addCase(fetchBook.rejected, (state, action)=> {
            state.isLoading = false;
            state.error = action.error;
        })
        builder.addCase(deleteBook.pending, (state, action)=> {
            state.deleteLoader = true;
        })
        builder.addCase(deleteBook.fulfilled, (state, action)=> {
            state.deleteLoader = false;
            let temp = current(state.book);
            temp.filter(t => t._id !== action.payload._id);
            state.book = temp;
        })
        builder.addCase(deleteBook.rejected, (state, action)=> {
            state.isLoading = false;
            state.error = action.error;
        })

        builder.addCase(createIssue.fulfilled, (state, action)=> {
            let temp = current(state.book);
            temp = temp.filter(t => t._id !== action.payload.bookId);
            state.book = temp;
        })
    }
})

export default bookSlice.reducer
