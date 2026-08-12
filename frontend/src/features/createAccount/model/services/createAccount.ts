import axios from "axios";
import {SignUpFormDataCredentials, SignUpFormResponse} from "@/features/createAccount/model/types";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const createAccount = createAsyncThunk<
    SignUpFormResponse,
    SignUpFormDataCredentials,
    { rejectValue: string }
>(
    'user/createAccount',
    async (signUpData, thunkAPI) => {

        try {
            const response = await axios.post<SignUpFormResponse>(
                '/api/v1/signup',
                signUpData,
            );

            localStorage.setItem("authToken", response.data.token);
            localStorage.setItem("username", response.data.username);

            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e) && e.response?.status === 409) {
                return thunkAPI.rejectWithValue("User already exists");

            }
            return thunkAPI.rejectWithValue("Sign up failed.")
        }
    },
)
