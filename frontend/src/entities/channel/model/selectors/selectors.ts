import {ChannelState} from "@/entities/channel/model/types/types";

interface ChannelRootState {
    channel: ChannelState;
}

export const selectChannelId = (state: ChannelRootState) => state.channel.id;
export const selectChannelName = (state: ChannelRootState) => state.channel.name;
export const selectChannelIsRemovable = (state: ChannelRootState) => state.channel.isRemovable;
