import { useContext } from 'react';
import { FoodprintContext } from '../store/ingredient-context';

export const fetchData = async() => {
  const ingredients = useContext(FoodprintContext).ingredients.items;
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
  

}
