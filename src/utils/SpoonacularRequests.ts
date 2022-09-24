import { onCallHandler } from './AddOnCall';
import './SpoonacularRequests.css';
import { IngredientSearch } from '../models/recipe';

const headers = new Headers();
headers.append('Content-Type', 'application/json');

export const fetchData = async(setRecipes: (title:string, id:number, image: string)=> void, searchString: string) => {
  const call = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=ec8da5b51af4425698dd91381535afff&ingredients=${searchString}&number=50`);

  if (call.ok) {
    const response = await call.json();

    onCallHandler(response, setRecipes);
 }
};

export const readRecipe = async(recipeId: string) => {
  const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=ec8da5b51af4425698dd91381535afff&includeNutrition=false`;
  const options = {
    headers,
  };

  const recipeCall = await fetch(url, options);

  const recipeResponse = await recipeCall.json();

  return recipeResponse;
};
