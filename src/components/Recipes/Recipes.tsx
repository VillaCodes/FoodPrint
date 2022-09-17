import React, { useContext, useEffect, useRef, useCallback } from 'react';
import Card from '../UI/Card';
import { FoodprintContext } from '../../store/foodprint-context';
import { fetchData } from '../../utils/SpoonacularRequests';
import { debounce } from '../../utils/Debounce';
import { IngredientSearch } from '../../models/recipe';
import List from './List';

import "./Recipes.css";

const Recipes: React.FC = () => {
  const foodprintCtx = useContext(FoodprintContext);
  const setRecipes: (title: string, id: number, image: string) => void = foodprintCtx.recipes.setRecipes;
  const { items } = foodprintCtx.recipes;
  const ingredientList = foodprintCtx.ingredients.items;
  const timeout = useRef();

  useEffect(() => {
    if(ingredientList.length !== 0) {

      debounce(fetchData, 1400, setRecipes, ingredientList, timeout);

  useEffect(() => {
      if (ingredientList.length) {
      debouncer()
    }
  }, [ingredientList]);

  return (
    <>
      { items?.length > 0 ? <List items={ items } /> : (
        <Card class='card'>
            <h3>Start building your foodprint by adding ingredients to your pantry!</h3>
        </Card>
      )}
    </>
  );
};
export default Recipes;
