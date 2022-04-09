import React, { useState, useEffect } from 'react';
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
    addRecipe: (title: string, id: number, image: string) => void;
    itemsReset: () => void;
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
  login: {
    isLoggedIn: false,
    onLogout: () => undefined,
    onLogin: (email: string, password: string) => undefined
  }
});

const FoodprintContextProvider: React.FC = (props) => {
  const [ingredients, setIngredients] = useState<Ingredients[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]> ([]);
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