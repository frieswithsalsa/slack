import {lazy} from "react";

export const RegisterPageAsync = lazy(
    () =>
        new Promise((resolve) => {
            //@ts-ignore
            setTimeout(() => resolve(import("./RegisterPage")), 1500);
        }),
);
