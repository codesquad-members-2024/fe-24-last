import { useEffect, RefObject } from "react";

const useOnClickOutside = <T extends HTMLElement>(
    ref: RefObject<T>,
    handler: React.Dispatch<React.SetStateAction<boolean>>
) => {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }

            handler(false);
        };

        document.addEventListener("mousedown", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
        };
    }, [ref, handler]);
};

export default useOnClickOutside;
