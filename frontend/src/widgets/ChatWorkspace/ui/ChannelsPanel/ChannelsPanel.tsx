import {classNames} from "@/shared/lib/classNames";
import cls from './ChannelsPanel.module.scss'
import {ChannelButton} from "@/entities/channel";
import {Plus} from 'lucide-react';

interface ChannelsPanelProps {
    className?: string;
}

const channels = [
    'random',
    'general'
]

export const ChannelsPanel = ({className}: ChannelsPanelProps) => {

    return (
        <div className={classNames(cls.ChannelsPanel, {}, [className])}>
            <div className={cls.ChannelsPanelHeader}>
                <h3>Channels</h3>
                <button type='button' className={cls.AddChannel}>
                    <Plus size={16}/>
                </button>
            </div>
            <ul className={cls.channelsList}>
                {channels.map((channel) => (
                    <li className={cls.channelItem} key={channel}>
                        <ChannelButton type='button'># {channel}</ChannelButton>
                    </li>
                ))}
            </ul>
        </div>
    );
};

