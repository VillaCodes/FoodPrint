import { onCallHandler } from './AddOnCall';
import './SpoonacularRequests.css';

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
  const call = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=ec8da5b51af4425698dd91381535afff&ingredients=${ingredientSearch(ingredientList)}`);

  const response = await call.json();

  onCallHandler(response, addRecipe, 10);
}

export const readRecipe = async(recipeId: string) => {
  const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=73a82c046a6043fd8fd23732ec9380c7&includeNutrition=false`
  const options = {
    headers
  };

  const recipeCall = await fetch(url, options);

  const recipeResponse = await recipeCall.json();

  return recipeResponse
};
