export interface Channel {
    id: string;
    name: string;
    removable: boolean;
}

export interface ChannelState {
    items: Channel[];
    activeChannelId: string | null;
    isLoading: boolean;
    error: string | null;
}