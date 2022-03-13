import React from "react";
import Ingredients from "./Ingredients";
import "./IngredientList.css"

export default function IngredientsContainer () {
   
    
    return (
        <ul className="Ingredients-Container">
            <header>Current Ingredients</header>
            <Ingredients />
        </ul>
    )
}