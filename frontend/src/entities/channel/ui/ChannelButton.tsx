import {classNames} from "@/shared/lib/classNames";
import cls from './ChannelButton.module.scss'

interface ChannelButtonProps {
    className?: string;
    children?: React.ReactNode;
    type: "button";
    onClick?: () => void;
    isActive?: boolean;
}

export const ChannelButton = ({className, children, type, onClick, isActive}: ChannelButtonProps) => {

    return (
        <button
            type={type}
            onClick={onClick}
            className={classNames(cls.ChannelButton, {[cls.active]: isActive}, [className])}
        >
            {children}
        </button>
    );
};

