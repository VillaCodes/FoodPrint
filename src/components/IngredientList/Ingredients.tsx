import React, { useContext } from 'react';
import { FoodprintContext } from '../../store/foodprint-context';
import './IngredientList.css';
import { fetchFormat } from '../../utils/main';

const Ingredients = () => {

  const { ingredients, login } = useContext(FoodprintContext);
  const { items, removeIngredient } = ingredients;
  const { id, isLoggedIn } = login;

  const removeIngredientHandler = async (ingredient: { id: string, text: string }) => {
    removeIngredient(ingredient.text);
    if (isLoggedIn) {
      fetchFormat('http://localhost:4000/removeIngredient', 'DELETE', { id: id, ingredient: { id: '0', text: ingredient.text } });
    }
  };

  return (
  <>
      {items.map((ingredient) => (
        <li className='ingredient-item' key={items.indexOf(ingredient)}>
           <div className='ingredient-item-text orange-font'> {ingredient.text} </div>
           <div className='ingredient-item-close orange-font' onClick={() => removeIngredientHandler(ingredient)}>x</div>
        </li>
      ))}
  </>
  );
};

export default Ingredients;
