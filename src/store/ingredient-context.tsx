import React, { useState } from 'react';
import Ingredients from '../models/ingredients';
import Recipe from '../models/recipe';

type FoodprintContextObj = {
  ingredients: {
    items: Ingredients[];
    addIngredient: (text: string) => void;
    removeIngredient: (text: string) => void;
  },
  recipes: {
    items: Recipe[];
    addRecipe: (text: string) => void;
  }
}

export const FoodprintContext = React.createContext<FoodprintContextObj>({
  ingredients: {
    items: [],
    addIngredient: (text: string) => undefined,
    removeIngredient: () => undefined
  },
  recipes: {
    items: [],
    addRecipe: (text: string) => undefined
  }
});

const FoodprintContextProvider: React.FC = (props) => {
  const [ingredients, setIngredients] = useState<Ingredients[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]> ([]);

  const addRecipeHandler = () => {
    setRecipes([(new Recipe('Mamas Braciole')), (new Recipe('Daddys Dish')), (new Recipe('Mothers Milk'))])
  }

  const addIngredientHandler = (ingredientText: string) => {
    const newIngredient = new Ingredients(ingredientText);

    setIngredients((prevIngredients) => {
      return prevIngredients.concat(newIngredient);
    });
  };

  const removeIngredientHandler = (ingredient: string) => {
    setIngredients((prevIngredients) => {
      return prevIngredients.filter(item => item.text !== ingredient);
    });
  };

  const foodprintContextValue: FoodprintContextObj = {
    ingredients: {
      items: ingredients,
      addIngredient: addIngredientHandler,
      removeIngredient: removeIngredientHandler
    },
    recipes: {
      items: recipes,
      addRecipe: addRecipeHandler
    }
  };

  return (
    <FoodprintContext.Provider value={foodprintContextValue}>
      {props.children}
    </FoodprintContext.Provider>
  )
}


export default FoodprintContextProvider;
