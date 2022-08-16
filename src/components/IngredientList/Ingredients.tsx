import React, { useContext } from "react";
import { FoodprintContext } from "../../store/foodprint-context";
import "./IngredientList.css";

const Ingredients = () => {
  const { ingredients } = useContext(FoodprintContext);
  const { items, removeIngredient } = ingredients;
  return (
  <>
      {items.map((ingredient) => (
        <li className="Ingredient" key={items.indexOf(ingredient)}>
           {ingredient.text}
           <span className="close" onClick={() => removeIngredient(ingredient.text)}>x</span>
        </li>
      ))}
  </>
  )
}

export default Ingredients;
