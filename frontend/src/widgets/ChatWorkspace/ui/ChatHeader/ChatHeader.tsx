import {classNames} from "@/shared/lib/classNames";
import cls from './ChatHeader.module.scss'
import {useSelector} from "react-redux";
import {selectActiveChannel} from "@/entities/channel";

interface ChatHeaderProps {
    className?: string;
}

export const ChatHeader = ({className}: ChatHeaderProps) => {

    const activeChannel = useSelector(selectActiveChannel)

    return (
        <div className={classNames(cls.ChatHeader, {}, [className])}>
            <div className={cls.headerRow}>
                <div className={cls.channelName}># {activeChannel?.name}</div>
                <div>0 сообщений</div>
            </div>
        </div>
    );
};

