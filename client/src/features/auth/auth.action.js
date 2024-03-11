import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from 'axios'
import { typeCreateUser, typeLoginUser } from './auth.type'


export const createUser = createAsyncThunk(
    typeCreateUser,
    async(data)=> {
        try {
            console.log(data);
            const response = await axios.post('http://localhost:8080/auth/signup', data)
            const dataj = await response.data
            return dataj;
        } catch (error) {
            throw error;
        }
    }
)

export const login = createAsyncThunk(
    typeLoginUser,
    async(data)=> {
        try{
            const response = await axios.post('http://localhost:8080/auth/login', data)
            const resData = await response.data
            console.log(resData);
            return resData
        }
        catch(error) {
            throw error;
        }
    }
)