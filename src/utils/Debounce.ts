import ingredientSearch from './queryStringBuilder';

export const debounce = <T>(
  func: any,
  time: number,
  reset: () => void,
  setIsLoading: (arg: boolean) => void,
  x: any,
  y: any,
  z: any,
  timeout: any,
) => {

  clearTimeout(timeout.current);

  setIsLoading(true);
  const searchString = ingredientSearch(z);

  timeout.current = setTimeout(() => {
    func(x, y, searchString).then(setIsLoading(false));

  }, time);

  reset();
};
