import React, { useContext } from 'react';
import Recipes from "../Recipes/Recipes";
import IngredientsContainer from "./IngredientsContainer";
import { FoodprintContext } from '../../store/foodprint-context';
import List from '../Recipes/List';
import "./IngredientList.css"

const Pantry = () => {
  const foodprintCtx = useContext(FoodprintContext);

  return (
    <div>
      <IngredientsContainer />
      <List items={foodprintCtx.favorites.items}/>
    </div>
   )
}
export default Pantry
