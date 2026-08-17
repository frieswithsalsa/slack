import cls from './NotFoundPage.module.scss';

const NotFoundPage = () => {
    return (
        <div className={cls.NotFoundPage}>
            <p className={cls.title}>Страница не найдена</p>
            <p className={cls.hint}>Проверьте адрес или вернитесь в чат.</p>
        </div>
    );
};

export default NotFoundPage;
