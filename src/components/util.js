export const debounce = (func, timeout = 500) => {
  let timerId;

  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => func(...args), timeout)
  };
}