import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'

// const BASE_URL = "https://hungritobackend.onrender.com"
const BASE_URL = "http://localhost:6010"

export const userLogin = createAsyncThunk("userLogin", async({phone,pass},{ rejectWithValue })=>{
    try {
        const {data} = await axios.post(`${BASE_URL}/api/v1/user/login`, {phone, password:pass}, {
            headers:{
                "Content-Type": "application/json"
            }, withCredentials: true
        })
        localStorage.setItem("isUser", "true")
        return data
    } catch (error) {
        console.log("catch error", error)
        toast.error(`${error?.response?.data?.message || 'fail to login'}`, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        return rejectWithValue(error.response?.data || 'fail to login')
    }
})

export const userSignUp = createAsyncThunk("userSignUp", async({username, croppedImage, phone,pass},{ rejectWithValue })=>{
    try {
        const {data} = await axios.post(`${BASE_URL}/api/v1/user/signUp`, {username, phone, password:pass, img: croppedImage}, {
            headers:{
                "Content-Type": "application/json"
            },
            withCredentials:true
        })
        return data
    } catch (error) {
        console.log("catch error", error)
        toast.error(`${error?.response?.data?.message || 'fail to login'}`, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        return rejectWithValue(error.response?.data || 'fail to login')
    }
})

export const userPhoneOtpVerify = createAsyncThunk("userPhoneOtpVerify", async({phoneNum,otp},{ rejectWithValue })=>{
    try {
        const {data} = await axios.post(`${BASE_URL}/api/v1/user/signUp/verify`, {phone:phoneNum, otp}, {
            headers:{
                "Content-Type": "application/json"
            },
            withCredentials:true
        })
        localStorage.setItem("isUser", "true")
        return data
    } catch (error) {
        console.log("catch error", error)
        return rejectWithValue(error.response?.data || 'fail to login')
    }
})

export const userLoad = createAsyncThunk("userLoad", async(_,{rejectWithValue})=>{
    try {
        const {data} = await axios.get(`${BASE_URL}/api/v1/user/me`, {withCredentials: true})
        localStorage.setItem("isUser", "true")
        return data
    } catch (error) {
        localStorage.removeItem('isUser');
        console.log("catch error", error)
        return rejectWithValue(error.response?.data || 'fail to login')
    }
})