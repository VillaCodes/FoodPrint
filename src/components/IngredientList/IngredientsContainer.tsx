import React, {useState, useContext} from "react";
import Ingredients from "./Ingredients";
import "./IngredientList.css"
import { FoodprintContext } from "../../store/foodprint-context";

export default function IngredientsContainer () {
   const [userIngredient, setUserIngredient] = useState<string>("");
   const { addIngredient, items } = useContext(FoodprintContext).ingredients;
   const { isLoggedIn } = useContext(FoodprintContext).login;

   const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
       event.preventDefault();
       const formattedIngredient = userIngredient.toLowerCase();
       items.map(e => e.text).includes(formattedIngredient) ? null : addIngredient(formattedIngredient);
       setUserIngredient("")
   }

   return (
        <ul className="Ingredients-Container">
            {!isLoggedIn && <header>Current Ingredients</header>}
            {isLoggedIn && <header>Pantry</header>}
            <Ingredients />
            {!isLoggedIn && <form onSubmit={submitHandler} data-testid="form">
              <input
                id="userIngredient"
                placeholder="Add an ingredient"
                type ="text"
                onChange={(event) => setUserIngredient(event?.target.value)}
                value={userIngredient}
              />
            </form>}
            {isLoggedIn && <form onSubmit={submitHandler} data-testid="form">
              <input
                id="userIngredient"
                placeholder="Add an ingredient"
                type ="text"
                onChange={(event) => setUserIngredient(event?.target.value)}
                value={userIngredient}
              />
            </form>}
        </ul>
    )
}
