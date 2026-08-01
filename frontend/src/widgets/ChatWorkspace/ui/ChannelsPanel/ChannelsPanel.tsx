import cls from './ChannelsPanel.module.scss'
import {useState} from "react";
import {classNames} from "@/shared/lib/classNames";
import {Plus} from 'lucide-react';
import {useDispatch, useSelector} from "react-redux";
import {selectActiveChannelId, selectChannels, setActiveChannelId} from "@/entities/channel";
import {AppDispatch} from "@/app/store";
import {CreateChannelModal} from '@/features/createChannel'
import {ChannelItem} from "@/widgets/ChatWorkspace/ui/ChannelsPanel/ChannelItem/ChannelItem";


interface ChannelsPanelProps {
    className?: string;
}


export const ChannelsPanel = ({className}: ChannelsPanelProps) => {

    const channels = useSelector(selectChannels)
    const dispatch = useDispatch<AppDispatch>();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const activeChannelId = useSelector(selectActiveChannelId);

    return (
        <div className={classNames(cls.ChannelsPanel, {}, [className])}>
            <div className={cls.ChannelsPanelHeader}>
                <h3>Channels</h3>
                <button
                    type='button'
                    className={cls.AddChannel}
                    onClick={() => {
                        setIsModalOpen(true)
                    }}
                >
                    <Plus size={16}/>
                </button>
            </div>
            <ul className={cls.channelsList}>
                {channels.map((channel) => (
                    <li className={cls.channelItem} key={channel.id}>
                        <ChannelItem
                            channel={channel}
                            isActive={activeChannelId === channel.id}
                            onSelect={() => dispatch(setActiveChannelId(channel.id))}
                            onRename={() => {
                            }}
                            onRemove={() => {
                            }}
                        />
                    </li>
                ))}
            </ul>
            {isModalOpen && (
                <CreateChannelModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
            )}
        </div>
    );
};

