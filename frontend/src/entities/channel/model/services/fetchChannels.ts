import axios from "axios";
import {createAsyncThunk} from '@reduxjs/toolkit'
import {Channel} from "@/entities/channel/model/types/types";


export const fetchChannels = createAsyncThunk<
    Channel[],
    void,
    { rejectValue: string }
>(
    'channel/fetchAll',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('authToken')

            const response = await axios.get<Channel[]>(
                '/go-api/v1/channels',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            return response.data;
        } catch {
            return thunkAPI.rejectWithValue('errors.channelsLoadFailed');
        }
    },
)
