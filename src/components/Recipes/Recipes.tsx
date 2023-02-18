import React, { useState, useContext, useEffect, useRef } from 'react';
import { FoodprintContext } from '../../store/foodprint-context';
import { fetchData } from '../../utils/SpoonacularRequests';
import { debounce } from '../../utils/Debounce';
import SkeletonItem from './SkeletonComponents/SkeletonItem';
import List from './List';
import './Recipes.css';

const Recipes: React.FC = () => {
  const foodprintCtx = useContext(FoodprintContext);
  const setRecipes: (title: string, id: number, image: string) => void = foodprintCtx.recipes.setRecipes;
  const recipeList = foodprintCtx.recipes.items;
  const { items, queryString, setQueryString } = foodprintCtx.ingredients;
  const ingredientList = items;
  const timeout = useRef();
  const [ isLoading, setIsLoading ] = useState(false);

  useEffect(() => {
    if (ingredientList.length) {
      debounce( 200, setIsLoading, setQueryString, ingredientList, timeout );
    } else {
      foodprintCtx.recipes.setRecipes([]);
    }
  }, [ingredientList]);

  useEffect(() => {
    const abortCtrl = new AbortController();
    const options = { signal: abortCtrl.signal };

    if (queryString) {
      fetchData(setRecipes, queryString, options)
    }

    return () => abortCtrl.abort();
  }, [queryString]);

  return (
    <div className='list-container purple-font'>
      { recipeList?.length && !isLoading ? <List items={ recipeList } /> : (
            <h3>Start building your foodprint by adding ingredients to your pantry!</h3>
      )}
      {isLoading && [0, 1, 2, 3, 4].map(loading => (
        <SkeletonItem idx={loading} />
      ))}
    </div>
  );
};
export default Recipes;
