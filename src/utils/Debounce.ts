import ingredientSearch from "./queryStringBuilder";

export const debounce = <T>(
  func: any,
  time: number,
  reset: () => void,
  x: any,
  y: any,
  z: any,
  timeout: any
) => {

  clearTimeout(timeout.current);

  const searchString = ingredientSearch(z);

  timeout.current = setTimeout(() => {
    func(x, y, searchString)

  }, time)

  reset();
}
