
export const debounce = <T>(
  func: any,
  time: number,
  x: any,
  y: any,
  timeout: any
) => {

  clearTimeout(timeout.current);
  timeout.current = setTimeout(() => {
    func(x, y)
  }, time)

  x([]);
}
