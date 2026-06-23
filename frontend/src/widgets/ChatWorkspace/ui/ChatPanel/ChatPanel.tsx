import {classNames} from "@/shared/lib/classNames";
import cls from './ChatPanel.module.scss'
import {ChatHeader} from "@/widgets/ChatWorkspace/ui/ChatHeader/ChatHeader";
import {useSelector} from "react-redux";
import {Message, selectActiveChannelMessages} from "@/entities/message";
import {SendMessageForm} from "@/features/sendMessage";
import {useRef, useEffect} from "react";


interface ChatPanelProps {
    className?: string;
}

export const ChatPanel = ({className}: ChatPanelProps) => {

    const activeChannelMessages = useSelector(selectActiveChannelMessages)

    const messageAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messageAreaRef.current) {
            messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight
        }
    }, [activeChannelMessages]);


    return (
        <div className={classNames(cls.ChatPanel, {}, [className])}>
            <ChatHeader/>
            <div ref={messageAreaRef} className={cls.messageArea}>
                {activeChannelMessages.map((message) => (
                    <Message key={message.id} username={message.username} body={message.body}/>
                ))}
            </div>
            <SendMessageForm/>
        </div>
    );
};

