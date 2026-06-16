import {classNames} from "@/shared/lib/classNames";
import cls from './ChatWorkspace.module.scss'
import {ChannelsPanel} from "@/widgets/ChatWorkspace/ui/ChannelsPanel/ChannelsPanel";

interface ChatWorkspaceProps {
    className?: string;
}

export const ChatWorkspace = ({className}: ChatWorkspaceProps) => {

    return (
        <div className={classNames(cls.ChatWorkspace, {}, [className])}>
            <ChannelsPanel/>
        </div>
    );
};

