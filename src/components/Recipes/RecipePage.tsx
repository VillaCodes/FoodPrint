import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./RecipePage.css"
import { FoodprintContext } from "../../store/foodprint-context";
import { readRecipe } from "../../utils/SpoonacularRequests";
import { Steps } from "../../models/recipeInfo";

const RecipePage: React.FC = () => {
  const foodprintCtx = useContext(FoodprintContext);
  const recipeInfo = foodprintCtx.recipeInfo.items;
  const setRecipesInfo = foodprintCtx.recipeInfo.setRecipeInfo;

  const { recipeID } = useParams();

  useEffect(() => {
    if (recipeID) {
      readRecipe(recipeID).then((response) => setRecipesInfo(response));
    }
  }, [recipeID]);

const analyzedInstructions = recipeInfo.analyzedInstructions?.[0];
const individualInstructions = analyzedInstructions?.steps?.map((step: Steps) => {
  return <li key={step?.number}>{step?.number}: {step?.step}</li>
});
const ingredients = recipeInfo.extendedIngredients.map((ingredient) => {
  return <li key={ingredient.id}>{ingredient.name}: {ingredient.measures.metric.amount} {ingredient.measures.metric.unitLong}</li>
})

  return (
    {recipeInfo} &&
    <div className="recipePage" data-testid="recipePage">
      <figure>
        <img src={recipeInfo.image} alt={recipeInfo.title}/>
      </figure>
      <h1>{recipeInfo.title}</h1>
      <div className="ingredients">
        <ul>{ingredients}</ul>
      </div>
      <div className="instructions">
        <ul>{individualInstructions}</ul>
      </div>
    </div>
  )
};

export default RecipePage;
