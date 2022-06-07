import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./RecipePage.css"
import { FoodprintContext } from "../../store/foodprint-context";
import { readRecipe } from "../../utils/SpoonacularRequests";

const RecipePage: React.FC = () => {
  const foodprintCtx = useContext(FoodprintContext);
  const recipeInfo = foodprintCtx.recipeInfo.items;
  const setRecipeInfo = foodprintCtx.recipeInfo.setRecipeInfo;

  const {recipeID} = useParams();

  useEffect(() => {
    if (recipeID) {
    readRecipe(recipeID).then((response) => setRecipeInfo(response))
    }
}, [recipeID]);

    
    
  return (
    {recipeInfo} &&
    <div className="recipePage" data-testid="recipePage">
      <figure>
        <img src={recipeInfo.image} alt={recipeInfo.title}/>
      </figure>
      <h1>{recipeInfo.title}</h1>
      <p>{recipeInfo.instructions}</p>
    </div>
  )
};

export default RecipePage;