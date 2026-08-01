import {RefObject, useEffect} from "react";

export const useOnClickOutside = (
    ref: RefObject<HTMLElement | null>,
    handler: (event: MouseEvent) => void) => {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            const target = event.target;

            if (!(target instanceof Node) || !ref.current || ref.current.contains(target)) {
                return;
            }

            handler(event);
        };

        document.addEventListener("mousedown", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
        };
    }, [ref, handler]);
};