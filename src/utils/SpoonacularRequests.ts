import { onCallHandler } from './AddOnCall';
import './SpoonacularRequests.css';

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
  const call: any = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=ec8da5b51af4425698dd91381535afff&ingredients=${ingredientSearch(ingredientList)}`);

  const response = await call.json();

  onCallHandler(response, addRecipe, 9);

}
