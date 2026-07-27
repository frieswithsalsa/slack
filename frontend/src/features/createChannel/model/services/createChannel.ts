import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";
import {Channel} from "@/entities/channel/model/types/types";
import {CreateChannelRequest} from '../types';

export const createChannel = createAsyncThunk<
    Channel,
    CreateChannelRequest,
    { rejectValue: string }
>(
    'channel/create',
    async (newChannel, thunkAPI) => {
        try {
            const token = localStorage.getItem('authToken')

            const response = await axios.post<Channel>(
                '/api/v1/channels',
                newChannel,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            return response.data;
        } catch {
            return thunkAPI.rejectWithValue('Не удалось создать канал')
        }
    },
)

