import {classNames} from "@/shared/lib/classNames";
import styles from './MainPage.module.scss';
import {ChatWorkspace} from "@/widgets/ChatWorkspace/ui/ChatWorkspace/ChatWorkspace";


interface MainPageProps {
    className?: string;
}

export const MainPage = ({className}: MainPageProps) => {

    return (
        <div className={classNames(styles.MainPage, {}, [className])}>
            <ChatWorkspace/>
        </div>
    );
};

