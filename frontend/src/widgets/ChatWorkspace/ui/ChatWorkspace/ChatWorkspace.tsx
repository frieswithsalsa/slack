import {classNames} from "@/shared/lib/classNames";
import cls from './ChatWorkspace.module.scss'
import {ChannelsPanel} from "@/widgets/ChatWorkspace/ui/ChannelsPanel/ChannelsPanel";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "@/app/store";
import {useEffect, useRef} from "react";
import {fetchChannels} from "@/entities/channel/model/services/fetchChannels";
import {ChatPanel} from "@/widgets/ChatWorkspace/ui/ChatPanel/ChatPanel";
import {fetchMessages} from "@/entities/message/model/services/fetchMessages";
import {socket} from '@/shared/api/socket';
import {addMessage, MessageType} from "@/entities/message";
import {addChannel, channelRemoved, channelRenamed, Channel, selectChannelsFetchError} from "@/entities/channel";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";
import {selectMessagesError} from "@/entities/message/model/slice/messageSlice";


interface ChatWorkspaceProps {
    className?: string;
}


export const ChatWorkspace = ({className}: ChatWorkspaceProps) => {

    const {t} = useTranslation();
    const dispatch = useDispatch<AppDispatch>();

    const fetchChannelsError = useSelector(selectChannelsFetchError);
    const fetchMessagesError = useSelector(selectMessagesError)

    const toastIdRef = useRef<string | number | null>(null);

    useEffect(() => {

        const handleNewChannel = (payload: Channel) => {
            dispatch(addChannel(payload));
        }
        socket.on('newChannel', handleNewChannel);

        return () => {
            socket.off('newChannel', handleNewChannel);
        }
    }, [dispatch]);

    useEffect(() => {
        const handleRemoveChannel = (payload: Channel) => {
            dispatch(channelRemoved(payload.id))
        }
        socket.on('removeChannel', handleRemoveChannel);

        return () => {
            socket.off('removeChannel', handleRemoveChannel);
        }
    }, [dispatch]);

    useEffect(() => {
        const handleRenameChannel = (payload: Channel) => {
            dispatch(channelRenamed(payload))
        }
        socket.on('renameChannel', handleRenameChannel);

        return () => {
            socket.off('renameChannel', handleRenameChannel);
        }
    }, [dispatch]);

    useEffect(() => {
        const handleNewMessage = (payload: MessageType) => {
            dispatch(addMessage(payload));
        }
        socket.on('newMessage', handleNewMessage);

        return () => {
            socket.off('newMessage', handleNewMessage);
        };
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchChannels());
    }, [dispatch]);

    useEffect(() => {
        if (fetchChannelsError) {
            toast.error(t('errors.channelsLoadFailed'));
        }
    }, [fetchChannelsError, t]);

    useEffect(() => {
        dispatch(fetchMessages());
    }, [dispatch]);

    useEffect(() => {
        if (fetchMessagesError) {
            toast.error(t('errors.messagesLoadFailed'));
        }
    }, [fetchMessagesError, t]);

    useEffect(() => {
        const handleConnectionLost = (reason: string) => {
            toast.error(t('errors.connectionLost'))
        }
        socket.on('disconnect', handleConnectionLost);

        return () => {
            socket.off('disconnect', handleConnectionLost);
        }
    }, [t]);


    return (
        <div className={classNames(cls.ChatWorkspace, {}, [className])}>
            <ChannelsPanel/>
            <ChatPanel/>
        </div>
    );
};
