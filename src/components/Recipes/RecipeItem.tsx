import "./Recipes.css"
import './RecipeItem.css'
import Card from '../UI/Card';
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { FoodprintContext } from "../../store/foodprint-context";
import { readRecipe } from "../../utils/SpoonacularRequests";

interface data {
  id: number;
  title: string;
  image: string;
}

interface props {
  data: data;
}

const RecipeItem: React.FC<props> = (props) => {
  const navigate = useNavigate();
  const recipe = props.data;
  const recipeNavigator = () => navigate(`/RecipePage/${recipe.id.toString()}`)
  const foodprintCtx = useContext(FoodprintContext);
  const setRecipeInfo = foodprintCtx.recipeInfo.setRecipeInfo;
  const searchResultInfo = foodprintCtx.recipeSearchResults.items;

  async function fetchRecipeData () {
   const data = await readRecipe(recipe.id.toString())

   setRecipeInfo(data)

   recipeNavigator()
  }

  const searchResult = searchResultInfo.filter((recipeItem) => recipe.id === recipeItem.id)[0]

  const missingIngredientList = searchResult.missedIngredients.map((missedIngredient) => {
    return <li key={missedIngredient.id}>{missedIngredient.amount} {missedIngredient.unitLong} {missedIngredient.name}</li>
  });

  const usedIngredientList = searchResult.usedIngredients.map((usedIngredient) => {
    return <li key={usedIngredient.id}>{usedIngredient.amount} {usedIngredient.unitLong} {usedIngredient.name}</li>
  });
  
  return (
    <li key={recipe.id}>
      <Card class='recipeCard'>
        <img className="card-header" src={recipe.image} />
        <h2>{recipe.title}</h2>

        <div className="missingIngredients">
          <p>{searchResult.missedIngredientCount} {searchResult.missedIngredientCount > 1 && searchResult.missedIngredientCount !== 0 ? `Missing Ingredients:` : `Missing Ingredient:`}</p>
          <ul>{missingIngredientList}</ul>
        </div>

        <div className="usedIngredients">
          <p>{searchResult.usedIngredientCount} {searchResult.usedIngredientCount > 1 ? `Current Ingredients:` : `Current Ingredient:`}</p>
          <ul>{usedIngredientList}</ul>
        </div>

        <button className="button" onClick={fetchRecipeData}>
          <i className="fa-fa-chevron-right"></i>Recipe
        </button>
      </Card>
    </li>
  );
}
export default RecipeItem;
