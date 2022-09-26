import './Recipes.css';
import './RecipeItem.css';
import Card from '../UI/Card';
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { FoodprintContext } from "../../store/foodprint-context";
import { readRecipe } from "../../utils/SpoonacularRequests";
import { fetchFormat } from '../../utils/main';

const RecipeItem: React.FC<{ recipeID: number, text: string, image: string }> = (props) => {
  const navigate = useNavigate();
  const recipeNavigator = () => navigate(`/RecipePage/${props.recipeID.toString()}`);
  const foodprintCtx = useContext(FoodprintContext);
  const setRecipesInfo = foodprintCtx.recipeInfo.setRecipeInfo;
  const { addFavorite, removeFavorite, isFavorite, items } = foodprintCtx.favorites;
  const { isLoggedIn, id } = foodprintCtx.login;
  let favCheck = isFavorite(props.recipeID, items);
  const searchResultInfo = foodprintCtx.recipeSearchResults.items;

  async function fetchRecipeData() {
    const data = await readRecipe(props.recipeID.toString());

   setRecipesInfo(data);

    recipeNavigator();
  }

  const favoriteClickHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const recipeBody = {
      id: id,
      recipe: {
        title: props.text,
        id: props.recipeID,
        image: props.image,
      },
    };

    if (!favCheck) {
      addFavorite(props.text, props.recipeID, props.image);
      fetchFormat('http://localhost:4000/favoriteAdd', 'POST', recipeBody);
    } else {
      removeFavorite(props.recipeID);
      fetchFormat('http://localhost:4000/favoriteRemove', 'DELETE', recipeBody);
    }
  };

  const searchResult = searchResultInfo?.filter((recipeItem) => props.recipeID === recipeItem.id)[0];

  const missingIngredientList = searchResult?.missedIngredients?.map((missedIngredient) => {
    return <li key={missedIngredient.id}>{missedIngredient.amount} {missedIngredient.unitLong} {missedIngredient.name}</li>;
  });

  const usedIngredientList = searchResult?.usedIngredients?.map((usedIngredient) => {
    return <li key={usedIngredient.id}>{usedIngredient.amount} {usedIngredient.unitLong} {usedIngredient.name}</li>;
  });

  return (
    <li key={props.recipeID}>
      <Card cardContainer='recipeCard'>
        <img className='card-header' src={props.image} />
        <h2>{props.text}</h2>

        <div className='ingredients-container'>
          <p>{searchResult?.missedIngredientCount} {searchResult?.missedIngredientCount > 1 && searchResult?.missedIngredientCount !== 0 ? 'Missing Ingredients:' : 'Missing Ingredient:'}</p>
          <ul>{missingIngredientList}</ul>
        </div>

        <div className='ingredients-container'>
          <p>{searchResult?.usedIngredientCount} {searchResult?.usedIngredientCount > 1 ? 'Current Ingredients:' : 'Current Ingredient:'}</p>
          <ul>{usedIngredientList}</ul>
        </div>

        <div className='flex-container'>
          <button className='button' onClick={fetchRecipeData}>
            <i className='fa-fa-chevron-right' />Recipe
          </button >
          {isLoggedIn && <div className='favorite' onClick={favoriteClickHandler}>
            {!favCheck ? <div className='noheart'></div> : <div className='heart'></div>}
          </div>}
        </div>
      </Card>
    </li>
  );
};
export default RecipeItem;
