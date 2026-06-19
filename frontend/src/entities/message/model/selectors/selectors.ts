import {MessageState} from "@/entities/message/model/types/types";
import {ChannelState} from "@/entities/channel/model/types/types";

interface MessageRootState {
    message: MessageState;
    channel: ChannelState;

}

export const selectActiveChannelMessages = (state: MessageRootState) => {
    return state.message.items.filter((message) => (message.channelId === state.channel.activeChannelId))
}

