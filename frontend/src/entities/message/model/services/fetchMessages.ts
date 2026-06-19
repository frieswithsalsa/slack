import axios from "axios";
import {setMessages} from "@/entities/message/model/slice/messageSlice";
import {AppDispatch} from "@/app/store";
import {Message} from "@/entities/message/model/types/types";


export const fetchMessages = async (dispatch: AppDispatch) => {

    const token = localStorage.getItem("authToken");

    if (!token) {
        throw new Error("Unable to retrieve token");
    }

    try {
        const response = await axios.get<Message[]>('/api/v1/messages', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        dispatch(setMessages(response.data));

        return response.data;
    } catch (e) {
        if (axios.isAxiosError(e) && e.response?.status === 401) {
            console.log("Unauthorized.")
            throw new Error("Unauthorized.");
        }
        throw new Error("Something went wrong.")
    }
}