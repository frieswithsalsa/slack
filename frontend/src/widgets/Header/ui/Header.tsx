// import {classNames} from "shared/lib/classNames";
import cls from './Header.module.scss'
import {Link} from "react-router-dom";

interface HeaderProps {
    className?: string;
}

export const Header = ({className}: HeaderProps) => {

    return (
        <div className={cls.Header}>
            <div className={cls.links}>
                <Link className={cls.mainLink} to="/login">Slack</Link>
            </div>

        </div>
    );
};

