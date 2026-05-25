import {RouteProps} from "react-router-dom";
import {LoginPage} from "@/pages/LoginPage";
import {NotFoundPage} from "@/pages/NotFoundPage";
import {MainPage} from "@/pages/MainPage";

export enum AppRoutes {
    MAIN = "main",
    LOGIN = 'login',
    PAGE_NOT_FOUND = 'page_not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.PAGE_NOT_FOUND]: '*',
}

export const RouteConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage/>
    },

    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: <LoginPage/>
    },

    [AppRoutes.PAGE_NOT_FOUND]: {
        path: RoutePath.page_not_found,
        element: <NotFoundPage/>
    }

}