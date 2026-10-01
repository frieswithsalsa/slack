import axios from "axios";
import {Message} from "@/entities/message/model/types/types";
import {createAsyncThunk} from "@reduxjs/toolkit";


export const fetchMessages = createAsyncThunk<
    Message[],
    void,
    { rejectValue: string }
>(
    'message/fetchAll',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('authToken')

            const response = await axios.get<Message[]>(
                '/go-api/v1/messages',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            return response.data;
        } catch {
            return thunkAPI.rejectWithValue('errors.messagesLoadFailed');
        }
    },
)
