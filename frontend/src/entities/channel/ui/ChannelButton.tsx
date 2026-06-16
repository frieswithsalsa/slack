import {classNames} from "@/shared/lib/classNames";
import cls from './ChannelButton.module.scss'

interface ChannelButtonProps {
    className?: string;
    children?: React.ReactNode;
    type: "button";
}

export const ChannelButton = ({className, children}: ChannelButtonProps) => {

    return (
        <button className={classNames(cls.ChannelButton, {}, [className])}>
            {children}
        </button>
    );
};

