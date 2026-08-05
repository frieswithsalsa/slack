import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";

export const removeChannel = createAsyncThunk<
    string,
    string,
    { rejectValue: string }
>(
    'channel/remove',
    async (channelId, thunkAPI) => {
        try {
            const token = localStorage.getItem('authToken')

            const response = await axios.delete<{ id: string }>(
                `/api/v1/channels/${channelId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            return response.data.id;
        } catch {
            return thunkAPI.rejectWithValue('Не удалось удалить канал')
        }
    },
)

