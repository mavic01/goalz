
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit" 
import authService from "./authService"


//Get user from local storage
const user = JSON.parse(localStorage.getItem('user'))    //JSON.parse cos local storage can only have strings, hence we parse it

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}


// next we're gonna handle the registration with the asyncThunk() to deal with async data from our backend
// Register User.. lets add a service file for the actual HTTP req just the clean the code
export const register = createAsyncThunk("auth/register", async(user, thunkAPI) => {
    try{
        return await authService.register(user) //state.user = action.payload below
    }catch(error){
        const message = (error.res && error.res.data && error.res.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)                                                    //state.message = action.payload
    }
})

export const logout = createAsyncThunk("auth/logout", async () => {
    await authService.logout
})


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: { //anything we put within the REDUCER are not gonna be thunk or async functions. Thunk funcs will go into a func called extra reducers
        reset: (state) => { //func to be dispatched to reset the values after we register etc..
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ""
        },
    },
    extraReducers: (builder) => {
      builder
        .addCase(register.pending, (state) => {
            state.isLoading = true            
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(register.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer