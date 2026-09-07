import cls from './Header.module.scss'
import {AppLink} from "@/shared/ui/AppLink/AppLink";
import {LogoutButton} from "@/features/logout";
import {selectIsAuthed} from "@/entities/user";
import {useSelector} from "react-redux";
import {classNames} from "@/shared/lib/classNames";

interface HeaderProps {
    className?: string;
}

export const Header = ({className}: HeaderProps) => {

    const isAuthed = useSelector(selectIsAuthed)

    return (
        <div className={classNames(cls.Header, {}, [className])}>
            <div className={cls.links}>

                <AppLink className={cls.mainLink} to="/">
                    <img
                        src="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/slack/wordmark.svg"
                        alt="Slack"
                        width={120}
                    />
                </AppLink>
            </div>
            {isAuthed && <LogoutButton />}
        </div>
    );
};

