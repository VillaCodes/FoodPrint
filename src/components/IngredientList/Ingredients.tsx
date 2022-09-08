import React, { useContext } from "react";
import { FoodprintContext } from "../../store/foodprint-context";
import "./IngredientList.css";
import { fetchID } from '../../utils/main';
import { fetchFormat } from '../../utils/main';


const Ingredients = () => {
  const { ingredients } = useContext(FoodprintContext);
  const { items, removeIngredient } = ingredients;

  const removeIngredientHandler = async (ingredient: {id: string, text: string}) => {
    removeIngredient(ingredient.text);
    fetchFormat('http://localhost:4000/removeIngredient' ,'DELETE' ,{id: await fetchID(), ingredient: { id: '0', text: ingredient.text }});
  };

  return (
  <>
      {items.map((ingredient) => (
        <li className="Ingredient" key={items.indexOf(ingredient)}>
           {ingredient.text}
           <span className="close" onClick={() => removeIngredientHandler(ingredient)}>x</span>
        </li>
      ))}
  </>
  )
}

export default Ingredients;
