
export const debounce = <T>(
  time: number,
  setIsLoading: (arg: boolean) => void,
  setQueryString: ([]) => void,
  ingredientList: any,
  timeout: any,
) => {
  clearTimeout(timeout.current);

  setIsLoading(true);

  timeout.current = setTimeout(() => {
    setQueryString(ingredientList);
    setIsLoading(false);
  }, time);
};
