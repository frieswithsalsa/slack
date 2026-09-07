import {lazy} from "react";

export const NotFoundPageAsync = lazy(() => new Promise(
    resolve => {
        // @ts-expect-error нетипизированный new Promise выводит resolve как {default: never}, импорт модуля в него не укладывается
        setTimeout(() => resolve(import('./NotFoundPage')), 1500)
    })
)