import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginService } from "service/Login/LoginService";

const loginSlice = createSlice({
    name: "login",
    initialState:{
        isLoading: false,
        isLogin: false,
    },
    reducers: {
        loginChange:(state, action) => {
            state.isLogin = !state.isLogin;
        },
    },
    extraReducers:(builder) =>{
        builder
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.isLogin = true
                state.isLoading = false
            })
            .addCase(fetchLogin.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchLogin.rejected, (state, action) => {
            })
    }
})

export const fetchLogin = createAsyncThunk(
    'login/fetchLogin', async (params, thunkAPI) => {
        const res = await loginService.Login(params.data);
        if(res?.success === false && res.success != null){
            return thunkAPI.rejectWithValue(res.response)
        }
        return res.data
    }
)
export const {loginChange} = loginSlice.actions;
export default loginSlice.reducer;