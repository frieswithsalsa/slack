import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Channel, ChannelState} from "@/entities/channel/model/types/types";

const initialState: ChannelState = {
    items: [],
    activeChannelId: null,
    isLoading: false,
    error: null,
}

const channelSlice = createSlice({
    name: 'channel',
    initialState,
    reducers: {
        setChannels: (state, action: PayloadAction<Channel[]>) => {
            state.items = action.payload;
            state.activeChannelId = action.payload[0]?.id ?? null;
        },

        setActiveChannelId: (state, action: PayloadAction<string | null>) => {
            state.activeChannelId = action.payload;
        },
    },
});


export const {setChannels, setActiveChannelId} = channelSlice.actions;

export default channelSlice.reducer;