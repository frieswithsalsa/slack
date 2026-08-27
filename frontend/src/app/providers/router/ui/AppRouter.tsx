import {Suspense} from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
import {RouteConfig, AppRouteProps} from "@/shared/config/routeConfig/routeConfig";
import {useSelector} from "react-redux";
import {selectIsAuthed} from "@/entities/user";
import {useTranslation} from "react-i18next";

const AppRouter = () => {
    const {t} = useTranslation();
    const isAuthed = useSelector(selectIsAuthed);

    return (
        <Suspense fallback={<div>{t('app.loading')}</div>}>

            <Routes>
                {Object.values(RouteConfig).map(({element, path, authOnly}: AppRouteProps) => (
                    <Route
                        key={path}
                        path={path}
                        element={
                            path === '/login' && isAuthed
                                ? <Navigate to="/" replace/>
                                : authOnly && !isAuthed
                                    ? <Navigate to="/login" replace/>
                                    : element
                        }
                    />
                ))}
            </Routes>
        </Suspense>
    );
};

export default AppRouter;
