import {classNames} from "@/shared/lib/classNames";
import cls from './ChannelsPanel.module.scss'
import {ChannelButton} from "@/entities/channel";
import {Plus} from 'lucide-react';
import {useSelector} from "react-redux";
import {selectChannels} from "@/entities/channel/model/selectors/selectors";

interface ChannelsPanelProps {
    className?: string;
}


export const ChannelsPanel = ({className}: ChannelsPanelProps) => {

    const channels = useSelector(selectChannels)

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
                    <li className={cls.channelItem} key={channel.id}>
                        <ChannelButton type='button'># {channel.name}</ChannelButton>
                    </li>
                ))}
            </ul>
        </div>
    );
};

