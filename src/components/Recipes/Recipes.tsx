import { useContext, useEffect, useState } from 'react';

import RecipeItem from './RecipeItem';
import Card from '../UI/Card';
import { FoodprintContext } from '../../store/ingredient-context';
import { fetchData } from '../../utils/SpoonacularRequests';

import "./Recipes.css";

const Recipes: React.FC = () => {
  const [ isFirstRender, setIsFirstRender ] = useState(true);

  const foodprintCtx = useContext(FoodprintContext);
  const addRecipe: (title: string, id: number, image: string) => void = foodprintCtx.recipes.addRecipe;
  const itemsReset = foodprintCtx.recipes.itemsReset;
  const ingredientList = foodprintCtx.ingredients.items;
  useEffect(() => {
    if(!isFirstRender) {
      itemsReset()
      fetchData(addRecipe, ingredientList);
    } else {
      setIsFirstRender(false);
    }
  }, [foodprintCtx.ingredients.items]);

  return (
    <>
      <Card class='card'>
        <ul>
          {foodprintCtx.recipes.items.map((item) => (
            <RecipeItem key={item.id} text={item.title} image={item.image} />
          ))}
        </ul>
      </Card>
    </>
  );
};
export default Recipes;
