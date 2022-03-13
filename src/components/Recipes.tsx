import React, { useContext } from 'react';

import RecipeItem from './RecipeItem';
import { IngredientContext } from '../store/ingredient-context';
import Ingredients from '../models/ingredients';

const tempIngredients = [
  (new Ingredients('bread')),
  (new Ingredients('milk')),
  (new Ingredients('eggs')),
  (new Ingredients('tomatos'))
]

const Recipes: React.FC = () => {
  const values = useContext(IngredientContext);
  const { items, addIngredient } = values;
  console.log(tempIngredients)

  return (
    <>
      <button onClick={() => addIngredient('milk')} >Add milk</button>
      <ul>
        {items.map((item) => (
          <RecipeItem key={item.id} text={item.text} />
        ))}
      </ul>
    </>
  )
}

export default Recipes;
