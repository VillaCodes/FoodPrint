import "./Recipes.css"
import './RecipeItem.css'
import Card from '../UI/Card';
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { FoodprintContext } from "../../store/foodprint-context";
import { readRecipe } from "../../utils/SpoonacularRequests";
import { favoriteChange } from '../../utils/main';
import { fetchID } from '../../utils/main';

const RecipeItem: React.FC<{recipeID: number, text: string, image: string, }> = (props) => {
  const navigate = useNavigate();
  const recipeNavigator = () => navigate(`/RecipePage/${props.recipeID.toString()}`)
  const foodprintCtx = useContext(FoodprintContext);
  const setRecipeInfo = foodprintCtx.recipeInfo.setRecipeInfo;
  const { addFavorite } = foodprintCtx.favorites;
  const { isLoggedIn } = foodprintCtx.login;

  async function fetchRecipeData () {
   const data = await readRecipe(props.recipeID.toString());

   setRecipeInfo(data);

   recipeNavigator();
 };

  const favoriteClickHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault;
    addFavorite(props.text, props.recipeID, props.image);

    favoriteChange({
      id: await fetchID(),
      recipe: {
        title: props.text,
        id: props.recipeID,
        image: props.image
      },
      action: 'add' });
  };

  return (
    <li key={props.recipeID}>
      <Card class='recipeCard'>
        <img className="card-header" src={props.image} />
        <h2>{props.text}</h2>
        <button className="button" onClick={fetchRecipeData}>
          <i className="fa-fa-chevron-right" />Recipe
        </button>
        {isLoggedIn && <button className="favorite" onClick={favoriteClickHandler}>
          Fav
        </button>}
      </Card>
    </li>
  );
}
export default RecipeItem;
