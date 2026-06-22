import {classNames} from "@/shared/lib/classNames";
import cls from './Message.module.scss'

interface MessageProps {
    className?: string;
    body: string;
    username: string;
}

export const Message = ({className, body, username}: MessageProps) => {

    return (
        <div className={classNames(cls.Message, {}, [className])}>
            <span className={cls.username}>{username}: </span>
            <span className={cls.body}>{body}</span>
        </div>
    );
};

