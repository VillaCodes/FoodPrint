import { onCallHandler } from './AddOnCall';
import './SpoonacularRequests.css';

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");



export const fetchData = async(addRecipe: (title:string, id:number, image: string)=> void, ingredientList: any) => {
  const ingredientSearch = (ingredients: any) => {

    let searchString = '';
    for(let i = 0; i < ingredients.length; i++) {
      if (i !== ingredients.length - 1) {
        searchString += (ingredients[i].text +  ',+' );
      } else {
        searchString += ingredients[i].text;
        break;
      }
    }
    return searchString;
  }
  const call = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=e0b11b97f0b64f5982330cabe8d0ec9b&ingredients=${ingredientSearch(ingredientList)}`);

  const response = await call.json();
  console.log(response)

  onCallHandler(response, addRecipe, 5);
}

export const readRecipe = async(recipeId: number) => {
  const url = `https://api.spoonacular.com/recipes/${recipeId.toString()}/information?apiKey=73a82c046a6043fd8fd23732ec9380c7&includeNutrition=false`
  const options = {
    headers
  };
  
  const recipeCall = await fetch(url, options);

  const recipeResponse = await recipeCall.json();
  console.log(recipeResponse)

  return recipeResponse
};