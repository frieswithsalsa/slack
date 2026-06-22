import axios from "axios";
import {LoginFormData} from "@/features/authByUsername/model/types";
import {AppDispatch} from "@/app/store";
import {setUser} from "@/entities/user";

export const authByUsername = async (data: LoginFormData, dispatch: AppDispatch) => {
    let errorMessages: string[] = [];

    try {
        const response = await axios.post('/api/v1/login', data,);
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("username", response.data.username);
        dispatch(setUser(response.data.username));
        console.log(response.data);
        return response.data;
    } catch (e) {
        if (axios.isAxiosError(e) && e.response?.status === 401) {
            console.log("Authentication failed. Check your username or password")
            throw new Error("Authentication failed. Check your username or password");
        }
        throw new Error("Something went wrong.")
    }
}