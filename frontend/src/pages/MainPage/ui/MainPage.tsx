import {classNames} from "@/shared/lib/classNames";
import styles from './MainPage.module.scss';


interface MainPageProps {
    className?: string;
}

export const MainPage = ({className}: MainPageProps) => {

    return (
        <div className={classNames(styles.MainPage, {}, [className])}>

        </div>
    );
};

