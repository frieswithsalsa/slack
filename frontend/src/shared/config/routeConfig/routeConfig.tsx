import {RouteProps} from "react-router-dom";
import {LoginPage} from "@/pages/LoginPage";
import {NotFoundPage} from "@/pages/NotFoundPage";

export enum AppRoutes {
    LOGIN = 'login',
    PAGE_NOT_FOUND = 'page_not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.PAGE_NOT_FOUND]: '*',
}

export const RouteConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: <LoginPage/>
    },

    [AppRoutes.PAGE_NOT_FOUND]: {
        path: RoutePath.page_not_found,
        element: <NotFoundPage/>
    }

}