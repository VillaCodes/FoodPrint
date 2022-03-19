import React, {useContext} from "react";
import { FoodprintContext } from "../../store/ingredient-context";
import "./IngredientList.css"

export default function Ingredients () {
const {items, removeIngredient} = useContext(FoodprintContext).ingredients;

return (
  <>
    {items.map((ingredient) => (
        <li className="Ingredient">
           {ingredient.text}
           <span className="close" onClick={() => removeIngredient(ingredient.text)}>x</span>
        </li>
      ))}
    </>
  )
}
