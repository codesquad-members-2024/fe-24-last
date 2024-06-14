export const debounce = (callback: Function, delay: number) => {
  let timerId: number | null = null;

  return (...args: any[]) => {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(callback, delay, ...args);
  };
};

export const throttle = (callback: Function, delay: number) => {
  let timerId: number | null = null;

  return (...args: any[]) => {
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
