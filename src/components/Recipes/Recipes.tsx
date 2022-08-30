import React, { useContext, useEffect, useRef } from 'react';
import RecipeItem from './RecipeItem';
import Pagination from '../Pagination/Pagination';
import Card from '../UI/Card';
import { FoodprintContext } from '../../store/foodprint-context';
import { fetchData } from '../../utils/SpoonacularRequests';
import { debounce } from '../../utils/Debounce';

import "./Recipes.css";
import { IngredientSearch } from '../../models/recipe';

const Recipes: React.FC = () => {

  const foodprintCtx = useContext(FoodprintContext);
  const addRecipe: (title: string, id: number, image: string) => void = foodprintCtx.recipes.addRecipe;
  const setRecipeSearchResults: (response: IngredientSearch[]) => void = foodprintCtx.recipeSearchResults.setRecipeSearchResults;
  const itemsReset = foodprintCtx.recipes.itemsReset;
  const ingredientList = foodprintCtx.ingredients.items;
  const isLoggedIn = foodprintCtx.login.isLoggedIn;
  const timeout = useRef();

  useEffect(() => {
    if(ingredientList.length !== 0) {

      debounce(fetchData, 3000, itemsReset(), addRecipe, setRecipeSearchResults, ingredientList, timeout)

    } else {
      return;
    }
  }, [ingredientList]);

  return (
    <>
      <Card class='card'>
        <ul>
          {ingredientList.length !== 0 && <Pagination data={foodprintCtx.recipes.items} RenderComponent={RecipeItem} title={''} pageLimit={5} dataLimit={10} />}
          {ingredientList.length === 0 && !isLoggedIn && <h3>Start building your foodprint by adding in ingredients!</h3>}
          {ingredientList.length === 0 && isLoggedIn && <h3>Start building your foodprint by adding ingredients to your pantry!</h3>}
        </ul>
      </Card>
    </>
  );
};
export default Recipes;
