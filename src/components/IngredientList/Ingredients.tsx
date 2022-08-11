import React, { useContext } from "react";
import { FoodprintContext } from "../../store/foodprint-context";
import "./IngredientList.css"

export default function Ingredients () {
const { ingredients, login } = useContext(FoodprintContext);
const { items, removeIngredient } = ingredients;
const { isLoggedIn } = login;

return (
  <>
      {isLoggedIn && items.map((ingredient) => (
        <li className="Ingredient" key={items.indexOf(ingredient)}>
          {ingredient.text}
          <span className="close" onClick={() => removeIngredient(ingredient.text)}>x</span>
        </li>
      ))}

      {!isLoggedIn && items.map((ingredient) => (
        <li className="Ingredient" key={items.indexOf(ingredient)}>
           {ingredient.text}
           <span className="close" onClick={() => removeIngredient(ingredient.text)}>x</span>
        </li>
      ))}
  </>
  )
}
