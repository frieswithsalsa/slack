import axios from "axios";
import {LoginFormData, LoginFormResponse} from "@/features/authByUsername/model/types";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const authByUsername = createAsyncThunk<
    LoginFormResponse,
    LoginFormData,
    { rejectValue: string }
>(
    'user/authByUsername',
    async (loginData, thunkAPI) => {

        try {
            const response = await axios.post<LoginFormResponse>(
                '/api/v1/login',
                loginData,
            );

            localStorage.setItem("authToken", response.data.token);
            localStorage.setItem("username", response.data.username);

            return response.data;
        } catch {
            return thunkAPI.rejectWithValue("errors.authFailed")
        }
    },
)
