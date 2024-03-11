import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from 'axios'
import { typeIssueBook } from "./issued.type"



export const createIssue = createAsyncThunk(
    typeIssueBook,
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



