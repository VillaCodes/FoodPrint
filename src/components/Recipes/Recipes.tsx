import React, { useState, useContext, useEffect, useRef, useCallback } from 'react';
import { FoodprintContext } from '../../store/foodprint-context';
import { fetchData } from '../../utils/SpoonacularRequests';
import { debounce } from '../../utils/Debounce';
import { IngredientSearch } from '../../models/recipe';
import SkeletonItem from './SkeletonComponents/SkeletonItem';
import List from './List';
import './Recipes.css';

const Recipes: React.FC = () => {
  const foodprintCtx = useContext(FoodprintContext);
  const setRecipes: (title: string, id: number, image: string) => void = foodprintCtx.recipes.setRecipes;
  const { items } = foodprintCtx.recipes;
  const ingredientList = foodprintCtx.ingredients.items;
  const timeout = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const debouncer = useCallback<any>(() => {debounce(fetchData, 1400, setIsLoading, setRecipes, ingredientList, timeout);}, [ingredientList]);

  useEffect(() => {
    if (ingredientList.length) {
      debouncer();
    }
  }, [ingredientList]);
  return (
    <div className='list-container'>
      { items?.length > 0 && !isLoading ? <List items={ items } /> : (
            <h3>Start building your foodprint by adding ingredients to your pantry!</h3>
      )}
      {isLoading && [0, 1, 2, 3, 4].map(loading => (
        <SkeletonItem idx={loading} />
      ))}
    </div>
  );
};
export default Recipes;
