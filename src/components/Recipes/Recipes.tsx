import React, { useContext } from 'react';

import RecipeItem from './RecipeItem';
import { FoodprintContext } from '../../store/ingredient-context';
import Ingredients from '../../models/ingredients';
import "./Recipes.css"
import Card from '../UI/Card';

const tempIngredients = [
  (new Ingredients('bread')),
  (new Ingredients('milk')),
  (new Ingredients('eggs')),
  (new Ingredients('tomatoes'))
]

const Recipes: React.FC = () => {
  const values = useContext(FoodprintContext);
  const { items, addRecipeHandler } = values.recipes;
  return (
    <>
      <Card>
        <ul>
          {items.map((item) => (
            <RecipeItem text={item.text} />
          ))}
        </ul>
      </Card>
    </>
  )
}

export default Recipes;
