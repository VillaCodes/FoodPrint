import ingredientSearch from './queryStringBuilder';

export const debounce = <T>(
  fetchData: any,
  time: number,
  setIsLoading: (arg: boolean) => void,
  setRecipes: any,
  ingredientList: any,
  timeout: any,
) => {

  clearTimeout(timeout.current);

  setIsLoading(true);
  
  const searchString = ingredientSearch(ingredientList);

  timeout.current = setTimeout(() => {
    fetchData(setRecipes, searchString).then(setIsLoading(false));

  }, time);

  setRecipes([]);
}
