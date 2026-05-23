import styles from './LoginPage.module.scss';
import {classNames} from "@/shared/lib/classNames";
import {LoginForm} from "@/features/AuthByUserName/ui/LoginForm";

const LoginPage = () => {
    return (
        <div className={classNames(styles.wrapper)}>
            <LoginForm/>
        </div>
    );
};

export default LoginPage;

