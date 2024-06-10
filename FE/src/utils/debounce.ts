const DEBOUNCE_TIME = 1000;

const debounce = <T extends (...args: any[]) => Promise<void>>(
    callback: T,
): ((...args: Parameters<T>) => void) => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    return function (...args: Parameters<T>) {
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            callback(...args);
        }, DEBOUNCE_TIME);
    };
};

export default debounce;
