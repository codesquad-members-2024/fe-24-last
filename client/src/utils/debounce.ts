function debounce<T extends (...args: string[]) => void>(
  callback: T,
  delay: number
): [(...args: Parameters<T>) => void, () => void] {
  let timer: ReturnType<typeof setTimeout> | undefined;

  function cancel() {
    clearTimeout(timer);
  }

  return [
    function (...args: Parameters<T>) {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    cancel,
  ];
}

export default debounce;
