
export const debounce = <T>(
  func: any,
  time: number,
  reset: T,
  x: any,
  y: any,
  z: any,
  timeout: any
) => {

  clearTimeout(timeout.current);
  timeout.current = setTimeout(() => {
    func(x, y, z)
  }, time)

  reset;
}
