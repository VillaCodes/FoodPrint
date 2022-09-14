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

  async function fetchRecipeData () {
   const data = await readRecipe(props.recipeID.toString());

   setRecipeInfo(data);

   recipeNavigator();
 };

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

  return (
    <li key={props.recipeID}>
      <Card class='recipeCard'>
        <img className="card-header" src={props.image} />
        <h2>{props.text}</h2>
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
