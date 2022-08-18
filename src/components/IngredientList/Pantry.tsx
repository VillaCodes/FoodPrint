import React, { useState, useContext } from "react";
import Ingredients from "./Ingredients";
import "./IngredientList.css"
import { FoodprintContext } from "../../store/foodprint-context";
import Card from '../UI/Card';
import { fetchID } from '../../utils/main';

const Pantry = () => {
  const [ userIngredient, setUserIngredient ] = useState<string>("");
  //request to add ingredients
  //adding will require pushing an ingredient along with its id into the db
  const { addIngredient, items } = useContext(FoodprintContext).ingredients;

  const ingredientAdd = async (data: {id: string, ingredient: {id: string, text: string}}) => {
    const result = await fetch('http://localhost:4000/saveIngredient', {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const json = await result.json();

    json();
  }

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formattedIngredient = userIngredient.toLowerCase();
      ingredientAdd({id: await fetchID(), ingredient: {id: `${items.length}`, text: formattedIngredient}})
      items.map(e => e.text).includes(formattedIngredient) ? null : addIngredient(formattedIngredient);
      setUserIngredient("");
  }

  return (
    <Card class="card">
       <ul>
           <header>Current Ingredients</header>
           <Ingredients />
           <form onSubmit={submitHandler} data-testid="form">
             <input
               id="userIngredient"
               placeholder="Add an ingredient"
               type ="text"
               onChange={(event) => setUserIngredient(event?.target.value)}
               value={userIngredient}
             />
           </form>
       </ul>
    </Card>
   )
}
export default Pantry
