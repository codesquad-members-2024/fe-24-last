export const debounce = (callback: Function, delay: number) => {
  let timerId: number | null = null;

  return (...args: any[]) => {
    const hasOptions = args.some((arg) => arg === true);

    if (timerId) clearTimeout(timerId);
    if (hasOptions) {
      timerId = null;
      callback(...args.filter((arg) => arg !== true));
      return;
    }
    timerId = setTimeout(callback, delay, ...args);
  };
};

export const throttle = (callback: Function, delay: number) => {
  let timerId: number | null = null;

  return (...args: any[]) => {
    const hasOptions = args.some((arg) => arg === true);

    if (hasOptions) {
      clearTimeout(timerId || 0);
      callback(...args.filter((arg) => arg !== true));
    }
    if (timerId) return;
    timerId = setTimeout(
      () => {
        callback(...args);
        timerId = null;
      },
      delay,
      ...args
    );
  };
};
