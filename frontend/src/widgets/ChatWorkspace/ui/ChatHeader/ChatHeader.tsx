import {classNames} from "@/shared/lib/classNames";
import cls from './ChatHeader.module.scss'
import {useSelector} from "react-redux";
import {selectActiveChannel} from "@/entities/channel";
import {selectActiveChannelMessages} from "@/entities/message";
import {useTranslation} from "react-i18next";

interface ChatHeaderProps {
    className?: string;
}

export const ChatHeader = ({className}: ChatHeaderProps) => {
    const {t} = useTranslation();

    const activeChannel = useSelector(selectActiveChannel)
    const activeChannelMessages = useSelector(selectActiveChannelMessages)
    const messagesCount = activeChannelMessages?.length ?? 0;

    return (
        <div className={classNames(cls.ChatHeader, {}, [className])}>
            <div className={cls.headerRow}>
                <div className={cls.channelName}># {activeChannel?.name}</div>
                <div className={cls.activeChannelMessages}>
                    {t('messages.count', {count: messagesCount})}
                </div>
            </div>
        </div>
    );
};
