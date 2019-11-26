export function throttle(time: number = 10) {
  let timer: null | number = null;
  return (fun: any) => {
    timer && clearTimeout(timer);
    timer = setTimeout(fun, time);
  };
}
