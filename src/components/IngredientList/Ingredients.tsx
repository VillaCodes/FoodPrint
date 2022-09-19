import React, { useContext } from 'react';
import { FoodprintContext } from '../../store/foodprint-context';
import './IngredientList.css';
import { fetchFormat } from '../../utils/main';

const Ingredients = () => {

  const { ingredients, login } = useContext(FoodprintContext);
  const { items, removeIngredient } = ingredients;
  const { id } = login;

  const removeIngredientHandler = async (ingredient: { id: string, text: string }) => {
    removeIngredient(ingredient.text);
    fetchFormat('http://localhost:4000/removeIngredient', 'DELETE', { id: id, ingredient: { id: '0', text: ingredient.text } });
  };

  return (
  <>
      {items.map((ingredient) => (
        <li className='Ingredient' key={items.indexOf(ingredient)}>
           {ingredient.text}
           <span className='close' onClick={() => removeIngredientHandler(ingredient)}>x</span>
        </li>
      ))}
  </>
  );
};

export default Ingredients;
