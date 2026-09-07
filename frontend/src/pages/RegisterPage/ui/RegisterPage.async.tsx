import {lazy} from "react";

export const RegisterPageAsync = lazy(
    () =>
        new Promise((resolve) => {
            // @ts-expect-error нетипизированный new Promise выводит resolve как {default: never}, импорт модуля в него не укладывается
            setTimeout(() => resolve(import("./RegisterPage")), 1500);
        }),
);
