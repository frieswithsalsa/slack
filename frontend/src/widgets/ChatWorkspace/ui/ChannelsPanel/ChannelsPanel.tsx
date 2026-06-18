import {classNames} from "@/shared/lib/classNames";
import cls from './ChannelsPanel.module.scss'
import {Plus} from 'lucide-react';
import {useDispatch, useSelector} from "react-redux";
import {ChannelButton, selectChannels, setActiveChannelId} from "@/entities/channel";
import {AppDispatch} from "@/app/store";

interface ChannelsPanelProps {
    className?: string;
}


export const ChannelsPanel = ({className}: ChannelsPanelProps) => {

    const channels = useSelector(selectChannels)
    const dispatch = useDispatch<AppDispatch>();

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
                        <ChannelButton
                            onClick={() => dispatch(setActiveChannelId(channel.id))}
                            type='button'># {channel.name}
                        </ChannelButton>
                    </li>
                ))}
            </ul>
        </div>
    );
};

