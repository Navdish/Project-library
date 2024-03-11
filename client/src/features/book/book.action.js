import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from 'axios'
import { typeCreateBook, typeDeleteBook, typeFetchBook} from './book.type'


export const createBook = createAsyncThunk(
    typeCreateBook,
    async(data)=> {
        try {
            const response = await axios.post('http://localhost:8080/book', data)
            const dataj = await response.data
            return dataj;
        } catch (error) {
            throw error;
        }
    }
)


export const fetchBook = createAsyncThunk(
    typeFetchBook,
    async(data)=> {
        try {
            const response = await axios.get('http://localhost:8080/book', {params : {
                search : data.search
            }})
            const dataj = await response.data
            return dataj;
        } catch (error) {
            throw error;
        }
    }
)

export const deleteBook = createAsyncThunk(
    typeDeleteBook,
    async(data)=> {
        try {
            const response = await axios.delete('http://localhost:8080/book', {params : {
                book : data
            }})
            const dataj = await response.data
            return dataj;
        } catch (error) {
            throw error;
        }
    }
)


