import React, { useContext, useEffect, useRef } from 'react';
import Card from '../UI/Card';
import { FoodprintContext } from '../../store/foodprint-context';
import { fetchData } from '../../utils/SpoonacularRequests';
import { debounce } from '../../utils/Debounce';
import List from './List';

import "./Recipes.css";

const Recipes: React.FC = () => {
  const foodprintCtx = useContext(FoodprintContext);
  const addRecipe: (title: string, id: number, image: string) => void = foodprintCtx.recipes.addRecipe;
  const { itemsReset, items } = foodprintCtx.recipes;
  const ingredientList = foodprintCtx.ingredients.items;
  const timeout = useRef();

  useEffect(() => {
    if(ingredientList.length !== 0) {

      debounce(fetchData, 1400, itemsReset(), addRecipe, ingredientList, timeout)

    } else {
      return;
    }
  }, [ingredientList]);

  return (
    <>
      { items.length > 0 ? <List items={ foodprintCtx.recipes.items } /> : (
        <Card class='card'>
            <h3>Start building your foodprint by adding ingredients to your pantry!</h3>
        </Card>
      )}
    </>
  );
};
export default Recipes;
