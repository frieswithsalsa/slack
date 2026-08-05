import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";
import {Channel} from "@/entities/channel/model/types/types";
import {RenameChannelRequest} from "@/features/renameChannel/model/types";

export const renameChannel = createAsyncThunk<
    Channel,
    RenameChannelRequest,
    { rejectValue: string }
>(
    'channel/rename',
    async ({id, name}, thunkAPI) => {
        try {
            const token = localStorage.getItem('authToken')

            const response = await axios.patch<Channel>(
                `/api/v1/channels/${id}`, {name},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            return response.data;
        } catch {
            return thunkAPI.rejectWithValue('Не удалось переименовать канал')
        }
    },
)

