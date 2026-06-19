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
            {username}: {body}
        </div>
    );
};

