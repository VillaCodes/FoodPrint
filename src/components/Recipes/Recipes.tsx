import React, { useContext, useEffect } from 'react';

import RecipeItem from './RecipeItem';
import Card from '../UI/Card';
import { FoodprintContext } from '../../store/foodprint-context';
import { fetchData } from '../../utils/SpoonacularRequests';
import { debounce } from '../../utils/Debounce';

import "./Recipes.css";

const Recipes: React.FC = () => {

  const foodprintCtx = useContext(FoodprintContext);
  const addRecipe: (title: string, id: number, image: string) => void = foodprintCtx.recipes.addRecipe;
  const itemsReset = foodprintCtx.recipes.itemsReset;
  const ingredientList = foodprintCtx.ingredients.items;


  useEffect(() => {
    if(ingredientList.length !== 0) {

      debounce(fetchData, 3000, itemsReset(), addRecipe, ingredientList)

    } else {
      return;
    }
  }, [foodprintCtx.ingredients.items]);

  return (
    <>
      <Card class='card'>
        <ul>
          {foodprintCtx.recipes.items.length === 5 && foodprintCtx.recipes.items.map((item) => (
            <RecipeItem key={item.id} text={item.title} image={item.image} recipeID={item.id} />
          ))}
        </ul>
      </Card>
    </>
  );
};
export default Recipes;
