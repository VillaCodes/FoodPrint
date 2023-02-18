import React, { useState, useContext } from 'react';
import Ingredients from './Ingredients';
import './IngredientList.css';
import { FoodprintContext } from '../../store/foodprint-context';
import { fetchFormat } from '../../utils/main';


export default function IngredientsContainer() {
  const foodprintCtx = useContext(FoodprintContext);
  const [ userIngredient, setUserIngredient ] = useState<string>('');
  const { addIngredient, items } = foodprintCtx.ingredients;
  const { isLoggedIn, id } = foodprintCtx.login;

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formattedIngredient = userIngredient.toLowerCase();

    if (isLoggedIn) {
      await fetchFormat('http://localhost:4000/saveIngredient', 'POST', { id: id, ingredient: { id: `${items.length}`, text: formattedIngredient } });
    }
    items.map(e => e.text).includes(formattedIngredient) ? null : addIngredient(formattedIngredient);
    setUserIngredient('');
  };

   return (
        <ul className="ingredients-Container">
            <header className="purple-font">Current Ingredients</header>
            <Ingredients />
            <form onSubmit={submitHandler} data-testid="form">
              <input
                id="userIngredient"
                placeholder="Add ingredient"
                type="text"
                className="ingredient-item"
                onChange={(event) => setUserIngredient(event?.target.value)}
                value={userIngredient}
              />
            </form>
        </ul>
    )
}
