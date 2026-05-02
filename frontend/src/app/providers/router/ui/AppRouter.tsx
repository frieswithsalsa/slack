import {Suspense} from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
import {RouteConfig} from "@/shared/config/routeConfig/routeConfig";

const AppRouter = () => {
    return (
        <Suspense fallback={<div>Loading</div>}>


            <Routes>
                <Route path="/" element={<Navigate to="/login" replace/>}/>

                {Object.values(RouteConfig).map(({element, path,}) => (
                    <Route
                        key={path}
                        path={path}
                        element={element}
                    />
                ))}
            </Routes>
        </Suspense>
    );
};

export default AppRouter;