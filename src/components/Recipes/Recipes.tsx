import React from 'react';

import RecipeItem from './RecipeItem';
// import { FoodprintContext } from '../../store/ingredient-context';
import Card from '../UI/Card';
import "./Recipes.css";

const tempRecipes = ['Lasagna', 'Bakers Bread', 'Pizza']

const Recipes: React.FC = () => {
  return (
    <>
    <Card class='card'>
      <ul>
        {tempRecipes.map((item) => (
          <RecipeItem text={item} />
        ))}
      </ul>
    </Card>
    </>
  );
};
export default Recipes;
