import {ChannelState} from "@/entities/channel/model/types/types";


interface ChannelRootState {
    channel: ChannelState;
}

export const selectChannels = (state: ChannelRootState) => state.channel.items;
export const selectActiveChannelId = (state: ChannelRootState) => state.channel.activeChannelId;
export const selectChannelsIsLoading = (state: ChannelRootState) => state.channel.isLoading;
export const selectChannelsFetchError = (state: ChannelRootState) => state.channel.fetchError;
export const selectActiveChannel = (state: ChannelRootState) => {
    return state.channel.items.find((channel) => (channel.id === state.channel.activeChannelId))
};
