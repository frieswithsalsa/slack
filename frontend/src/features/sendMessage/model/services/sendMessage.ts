import type {SendMessageData} from "../types";
import type {MessageType} from "@/entities/message";
import axios from "axios";

export const sendMessage = async (message: SendMessageData) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
        throw new Error("Unable to retrieve token");
    }

    try {
        const response = await axios.post<MessageType>('/api/v1/messages', message, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })


        return response.data;
    } catch (e) {
        if (axios.isAxiosError(e) && e.response?.status === 401) {
            console.log("Unauthorized.")
            throw new Error("Unauthorized.");
        }
        throw new Error("Something went wrong.")
    }

}