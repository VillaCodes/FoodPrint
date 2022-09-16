import "./Recipes.css"
import './RecipeItem.css'
import Card from '../UI/Card';
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { FoodprintContext } from "../../store/foodprint-context";
import { readRecipe } from "../../utils/SpoonacularRequests";
import { fetchFormat } from '../../utils/main';
import { fetchID } from '../../utils/main';

const RecipeItem: React.FC<{ recipeID: number, text: string, image: string, isFavorite: boolean }> = (props) => {
  const navigate = useNavigate();
  const recipeNavigator = () => navigate(`/RecipePage/${props.recipeID.toString()}`)
  const foodprintCtx = useContext(FoodprintContext);
  const setRecipeInfo = foodprintCtx.recipeInfo.setRecipeInfo;
  const { addFavorite, removeFavorite } = foodprintCtx.favorites;
  const { isLoggedIn } = foodprintCtx.login;
  const searchResultInfo = foodprintCtx.recipeSearchResults.items;

  async function fetchRecipeData () {
   const data = await readRecipe(props.recipeID.toString());

   setRecipeInfo(data);

   recipeNavigator();
 }

  const favoriteClickHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!props.isFavorite) {
      addFavorite(props.text, props.recipeID, props.image);
      fetchFormat('http://localhost:4000/favoriteAdd', 'POST', {
        id: await fetchID(),
        recipe: {
          title: props.text,
          id: props.recipeID,
          image: props.image
        }
      });
    } else {
      removeFavorite(props.recipeID);
      fetchFormat('http://localhost:4000/favoriteRemove', 'DELETE', {
        id: await fetchID(),
        recipe: {
          title: props.text,
          id: props.recipeID,
          image: props.image
        }
      })
    }
  };

  const searchResult = searchResultInfo.filter((recipeItem) => props.recipeID === recipeItem.id)[0]

  const missingIngredientList = searchResult.missedIngredients.map((missedIngredient) => {
    return <li key={missedIngredient.id}>{missedIngredient.amount} {missedIngredient.unitLong} {missedIngredient.name}</li>
  });

  const usedIngredientList = searchResult.usedIngredients.map((usedIngredient) => {
    return <li key={usedIngredient.id}>{usedIngredient.amount} {usedIngredient.unitLong} {usedIngredient.name}</li>
  });

  return (
    <li key={props.recipeID}>
      <Card class='recipeCard'>
        <img className="card-header" src={props.image} />
        <h2>{props.text}</h2>
        
        <div className="ingredients-container">
          <p>{searchResult.missedIngredientCount} {searchResult.missedIngredientCount > 1 && searchResult.missedIngredientCount !== 0 ? `Missing Ingredients:` : `Missing Ingredient:`}</p>
          <ul>{missingIngredientList}</ul>
        </div>
        
        <div className="ingredients-container">
          <p>{searchResult.usedIngredientCount} {searchResult.usedIngredientCount > 1 ? `Current Ingredients:` : `Current Ingredient:`}</p>
          <ul>{usedIngredientList}</ul>
        </div>
        
        <div className="flex-container">
          <button className="button" onClick={fetchRecipeData}>
            <i className="fa-fa-chevron-right" />Recipe
          </button >
          {isLoggedIn && <div className="favorite" onClick={favoriteClickHandler}>
            {!props.isFavorite ? <div className="noheart"></div> : <div className="heart"></div>}
          </div>}
        </div>
      </Card>
    </li>
  );
}
export default RecipeItem;
