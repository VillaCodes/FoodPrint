import React from 'react';

import RecipeItem from './RecipeItem';
// import Recipe from '../../models/recipe';
// import { FoodprintContext } from '../../store/ingredient-context';
import "./Recipes.css";

const tempRecipes = ['Lasagna', 'Bakers Bread', 'Pizza']

const Recipes: React.FC = () => {
  return (
    <>
      <ul>
        {tempRecipes.map((item) => (
          <RecipeItem text={item} />
        ))}
      </ul>
    </>
  );
};
export default Recipes;
