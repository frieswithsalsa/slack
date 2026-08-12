import styles from './RegisterPage.module.scss'
import {classNames} from "@/shared/lib/classNames";
import {SignUpForm} from "@/features/createAccount/ui/SignUpForm";

const RegisterPage = () => {
    return (
        <div className={classNames(styles.wrapper, {}, [])}>
            <SignUpForm/>
        </div>
    );
};

export default RegisterPage;

