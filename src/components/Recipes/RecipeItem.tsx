import "./Recipes.css"
import './RecipeItem.css'
import Card from '../UI/Card';
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { FoodprintContext } from "../../store/foodprint-context";
import { readRecipe } from "../../utils/SpoonacularRequests";

const RecipeItem: React.FC<{recipeID: number, text: string, image: string, }> = (props) => {
  const navigate = useNavigate();
  const recipeNavigator = () => navigate(`/RecipePage/${props.recipeID.toString()}`)
  const foodprintCtx = useContext(FoodprintContext);
  const setRecipeInfo = foodprintCtx.recipeInfo.setRecipeInfo;

  async function fetchRecipeData () {
   const data = await readRecipe(props.recipeID.toString())

   setRecipeInfo(data)

   recipeNavigator()
  }
  
  return (
    <li key={props.recipeID}>
      <Card class='recipeCard'>
        <img className="card-header" src={props.image} />
        <h2>{props.text}</h2>
        <button className="button" onClick={fetchRecipeData}>
          <i className="fa-fa-chevron-right"></i>Recipe
        </button>
      </Card>
    </li>
  );
}
export default RecipeItem;
