import styles from './LoginPage.module.scss';
import {classNames} from "@/shared/lib/classNames";
import {LoginForm} from "@/features/authByUsername/ui/LoginForm";

const LoginPage = () => {
    return (
        <div className={classNames(styles.wrapper, {}, [])}>
            <LoginForm/>
        </div>
    );
};

export default LoginPage;

