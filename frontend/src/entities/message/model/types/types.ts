export interface Message {
    id: string;
    body: string;
    channelId: string;
    username: string;
}

export interface MessageState {
    items: Message[];
    isLoading: boolean;
    error: string | null;
}