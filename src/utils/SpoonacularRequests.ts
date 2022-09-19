import { onCallHandler } from './AddOnCall';
import './SpoonacularRequests.css';
import { IngredientSearch } from '../models/recipe';

const headers = new Headers();
headers.append('Content-Type', 'application/json');

export const fetchData = async(setRecipes: (title:string, id:number, image: string)=> void, setRecipeSearchResults: (response: IngredientSearch[]) => void, searchString: string) => {
  const call = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=73a82c046a6043fd8fd23732ec9380c7&ingredients=${searchString}&number=50`);

  if (call.ok) {
    const response = await call.json();
    onCallHandler(response, setRecipes, 10);
 }
};

export const readRecipe = async(recipeId: string) => {
  const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=73a82c046a6043fd8fd23732ec9380c7&includeNutrition=false`;
  const options = {
    headers,
  };

  const recipeCall = await fetch(url, options);

  const recipeResponse = await recipeCall.json();

  return recipeResponse;
};
