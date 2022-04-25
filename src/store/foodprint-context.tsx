import React, { SetStateAction, useState, useEffect } from 'react';
import Ingredients from '../models/ingredients';
import Recipe from '../models/recipe';
import {RecipeInfo, RecipeInfoDefault} from '../models/recipeInfo';

type FoodprintContextObj = {
  ingredients: {
    items: Ingredients[];
    addIngredient: (text: string) => void;
    removeIngredient: (text: string) => void;
  },
  recipes: {
    items: Recipe[];
    addRecipe: (title: string, id: number, image: string) => void;
    itemsReset: () => void;
  },
  recipeInfo: {
    items: RecipeInfo;
    recipeInfoReset: () => void;
    setRecipeInfo: React.Dispatch<SetStateAction<RecipeInfo>>
  },
  login: {
    isLoggedIn: boolean,
    onLogout: () => void;
    onLogin: (email: string, password: string) => void
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
    addRecipe: (text: string) => undefined,
    itemsReset: () => undefined
  },
  recipeInfo: {
    items: RecipeInfoDefault,
    recipeInfoReset: () => undefined,
    setRecipeInfo: () => undefined
  },
  login: {
    isLoggedIn: false,
    onLogout: () => undefined,
    onLogin: (email: string, password: string) => undefined
  }
});

const FoodprintContextProvider: React.FC = (props) => {
  const [ingredients, setIngredients] = useState<Ingredients[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recipeInfo, setRecipeInfo] = useState<RecipeInfo>(RecipeInfoDefault);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLogggedInInformation = localStorage.getItem('isLoggedIn');

    if(storedUserLogggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const addRecipeHandler = (recipeText: string, recipeID: number, recipeImage: string) => {
    const newRecipe = new Recipe(recipeText, recipeID, recipeImage);
    setRecipes((prevRecipe) => {
      return prevRecipe.concat(newRecipe);
    });
  }


  const itemsResetHandler = () => {
    return setRecipes([]);
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

  const recipeInfoResetHandler = () => {
    return setRecipeInfo(RecipeInfoDefault);
  }

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  }

  const loginHandler = () => {
    localStorage.setItem('isLoggedIn', '1')
    setIsLoggedIn(true)
  }

  const foodprintContextValue: FoodprintContextObj = {
    ingredients: {
      items: ingredients,
      addIngredient: addIngredientHandler,
      removeIngredient: removeIngredientHandler
    },
    recipes: {
      items: recipes,
      addRecipe: addRecipeHandler,
      itemsReset: itemsResetHandler
    },
    recipeInfo: {
      items: recipeInfo,
      recipeInfoReset: recipeInfoResetHandler,
      setRecipeInfo: setRecipeInfo
    },
    login: {
      isLoggedIn: isLoggedIn,
      onLogout: logoutHandler,
      onLogin: loginHandler
    }
  };


  return (
    <FoodprintContext.Provider value={foodprintContextValue}>
      {props.children}
    </FoodprintContext.Provider>
  )
}


export default FoodprintContextProvider;
