import type {SendMessageData} from "../types";
import type {MessageType} from "@/entities/message";
import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {Message} from "@/entities/message/model/types/types";

export const sendMessage = createAsyncThunk<
    Message,
    SendMessageData,
    { rejectValue: string }
>(
    'message/send',
    async (message, thunkAPI) => {
        try {
            const token = localStorage.getItem('authToken')

            const response = await axios.post<MessageType>(
                '/api/v1/messages',
                message,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            return response.data
        } catch {
            return thunkAPI.rejectWithValue('errors.messageSendFailed');
        }
    }
)
