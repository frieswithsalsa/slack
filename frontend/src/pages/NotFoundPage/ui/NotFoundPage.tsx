import cls from './NotFoundPage.module.scss';
import {useTranslation} from "react-i18next";

const NotFoundPage = () => {

    const {t} = useTranslation();

    return (
        <div className={cls.NotFoundPage}>
            <p className={cls.title}>{t('notFound.title')}</p>
            <p className={cls.hint}>{t('notFound.hint')}</p>
        </div>
    );
};

export default NotFoundPage;
