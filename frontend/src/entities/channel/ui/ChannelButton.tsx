import {classNames} from "@/shared/lib/classNames";
import cls from './ChannelButton.module.scss'

interface ChannelButtonProps {
    className?: string;
    children?: React.ReactNode;
    type: "button";
    onClick?: () => void;
}

export const ChannelButton = ({className, children, type, onClick}: ChannelButtonProps) => {

    return (
        <button
            type={type}
            onClick={onClick}
            className={classNames(cls.ChannelButton, {}, [className])}
        >
            {children}
        </button>
    );
};

