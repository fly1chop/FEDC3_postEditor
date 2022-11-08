export const debounce = (func, timeout = 500) => {
  let timerId = null;

  return (...args) => {
    if(timerId !== null){
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => func(...args), timeout)
  };
}