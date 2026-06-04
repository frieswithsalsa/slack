// import {classNames} from "shared/lib/classNames";
import cls from './Header.module.scss'
import {AppLink} from "@/shared/ui/AppLink/AppLink";

interface HeaderProps {
    className?: string;
}

export const Header = ({className}: HeaderProps) => {

    return (
        <div className={cls.Header}>
            <div className={cls.links}>

                <AppLink className={cls.mainLink} to="/">
                    <img
                        src="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/slack/wordmark.svg"
                        alt="Slack"
                        width={120}
                    />
                </AppLink>
            </div>
        </div>
    );
};

