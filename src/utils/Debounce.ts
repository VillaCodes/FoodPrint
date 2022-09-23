import ingredientSearch from './queryStringBuilder';

export const debounce = <T>(
  fetchData: any,
  time: number,
  setRecipes: any,
  ingredientList: any,
  timeout: any,
) => {

  clearTimeout(timeout.current);

  const searchString = ingredientSearch(ingredientList);

  timeout.current = setTimeout(() => {
    fetchData(setRecipes, searchString);

  }, time);

  setRecipes([]);
}
