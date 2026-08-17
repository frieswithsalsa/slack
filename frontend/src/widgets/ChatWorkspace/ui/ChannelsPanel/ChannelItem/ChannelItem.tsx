import {classNames} from "@/shared/lib/classNames";
import cls from './ChannelItem.module.scss';
import {useRef, useState} from "react";
import {Channel} from "@/entities/channel/model/types/types";
import {useOnClickOutside} from "@/shared/lib/hooks/useOnClickOutside";
import {ChannelButton} from "@/entities/channel";
import {ChevronDown} from "lucide-react";

interface ChannelItemProps {
    className?: string;
    channel: Channel;
    isActive: boolean;
    onSelect: () => void;
    onRename: () => void;
    onRemove: () => void;
}

export const ChannelItem = ({
                                channel,
                                isActive,
                                onSelect,
                                onRemove,
                                onRename,
                                className
                            }: ChannelItemProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const rootRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(rootRef, () => setIsMenuOpen(false));

    const handleClick = () => {
        setIsMenuOpen((prev) => !prev);
    }

    return (
        <div ref={rootRef} className={classNames(cls.item, {[cls.active]: isActive}, [className])}>
            <ChannelButton
                className={cls.name}
                type="button"
                onClick={onSelect}
            >
                # {channel.name}
            </ChannelButton>

            {channel.removable && (
                <button className={cls.menuToggle}
                        type="button"
                        onClick={handleClick}
                >
                    <ChevronDown/>
                    <span className="visuallyHidden">Управление каналом</span>
                </button>
            )}

            {isMenuOpen && (
                <div role="menu" className={cls.menu}>
                    <button className={cls.menuItem} type="button" onClick={() => {
                        setIsMenuOpen(false);
                        onRename();
                    }}>Переименовать
                    </button>
                    <button className={classNames(cls.menuItem, {}, [cls.menuItemDanger])} type="button" onClick={() => {
                        setIsMenuOpen(false);
                        onRemove();
                    }}>Удалить
                    </button>
                </div>
            )}
        </div>

    );
};