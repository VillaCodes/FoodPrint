export const debounce = (func: any, wait: number, other: any, x: any, y: any) => {
  const cleanTimeout = setTimeout(() => {
    func(x, y)
  }, wait)

  other;

  return () => {
    clearTimeout(cleanTimeout);
  }
}
