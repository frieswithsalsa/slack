import {classNames} from "@/shared/lib/classNames";
import cls from './ChatPanel.module.scss'
import {ChatHeader} from "@/widgets/ChatWorkspace/ui/ChatHeader/ChatHeader";
import {SendHorizontal} from 'lucide-react';


interface ChatPanelProps {
    className?: string;
}

export const ChatPanel = ({className}: ChatPanelProps) => {

    return (
        <div className={classNames(cls.ChatPanel, {}, [className])}>
            <ChatHeader/>
            <div className={cls.messageArea}></div>
            <form className={cls.messageForm}>
                <div className={cls.inputWrapper}>
                    <input placeholder="Введите сообщение..." type="text" className={cls.messageInput}/>
                    <button aria-label="Отправить сообщение" className={cls.sendButton} type="submit">
                        <SendHorizontal size={30} strokeWidth={0.75}/>
                    </button>
                </div>
            </form>
        </div>
    );
};

