import React, { useContext } from 'react';

import RecipeItem from './RecipeItem';
import { IngredientContext } from '../store/ingredient-context';
import Ingredients from '../models/ingredients';
import "./Recipes.css"

const tempIngredients = [
  (new Ingredients('bread')),
  (new Ingredients('milk')),
  (new Ingredients('eggs')),
  (new Ingredients('tomatoes'))
]

const Recipes: React.FC = () => {
  const values = useContext(IngredientContext);
  const { items, addIngredient } = values;
  console.log(tempIngredients)

  return (
    <>
      <button className="ingredient-button" onClick={() => addIngredient('milk')} >Milk</button>
      <div>
        {items.map((item) => (
          <RecipeItem key={item.id} text={item.text} />
        ))}
      </div>
    </>
  )
}

export default Recipes;
