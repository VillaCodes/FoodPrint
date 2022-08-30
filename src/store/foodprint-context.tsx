import React, { SetStateAction, useState, useEffect } from 'react';
import Ingredients from '../models/ingredients';
import {Recipe, IngredientSearch, IngredientSearchDefault} from '../models/recipe';
import { RecipeInfo, RecipeInfoDefault } from '../models/recipeInfo';

type FoodprintContextObj = {
  ingredients: {
    items: Ingredients[];
    addIngredient: (text: string) => void;
    removeIngredient: (text: string) => void;
    setItems: ([]) => void;
  },
  recipes: {
    items: Recipe[];
    addRecipe: (title: string, id: number, image: string) => void;
    itemsReset: () => void;
  },
  recipeSearchResults: {
    items: IngredientSearch[];
    searchResultReset: () => void;
    setRecipeSearchResults: (response:IngredientSearch[]) => void;
  },
  recipeInfo: {
    items: RecipeInfo;
    recipeInfoReset: () => void;
    setRecipeInfo: React.Dispatch<SetStateAction<RecipeInfo>>
  },
  login: {
    isLoggedIn: boolean,
    onLogout: () => void;
    onLogin: (loggedIn: boolean) => void
  }
}

export const FoodprintContext = React.createContext<FoodprintContextObj>({
  ingredients: {
    items: [],
    addIngredient: (text: string) => undefined,
    removeIngredient: () => undefined,
    setItems: (array: any) => undefined
  },
  recipes: {
    items: [],
    addRecipe: (text: string) => undefined,
    itemsReset: () => undefined
  },
  recipeSearchResults: {
    items: [],
    searchResultReset: () => undefined,
    setRecipeSearchResults: (response: IngredientSearch[]) => undefined
  },
  recipeInfo: {
    items: RecipeInfoDefault,
    recipeInfoReset: () => undefined,
    setRecipeInfo: () => undefined
  },
  login: {
    isLoggedIn: false,
    onLogout: () => undefined,
    onLogin: (loggedIn: boolean) => undefined
  }
});

const FoodprintContextProvider: React.FC = (props) => {
  const [ ingredients, setIngredients ] = useState<Ingredients[]>([]);
  const [ recipes, setRecipes ] = useState<Recipe[]>([]);
  const [recipeSearchResults, setRecipeSearchResults] = useState<IngredientSearch[]>([IngredientSearchDefault])
  const [ recipeInfo, setRecipeInfo ] = useState<RecipeInfo>(RecipeInfoDefault);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  useEffect(() => {
    const cookieCheck = async () => {
      const result = await fetch('http://localhost:4000/check',
        {
          method: "GET",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      const json = await result.json();

      if (json.cookiePresent === true) {
        setIsLoggedIn(true);
      }
    }

    cookieCheck();
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

  const logoutHandler = async () => {
    try{
      const result = await fetch('http://localhost:4000/logout',
      {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
      }
    );
      const json = await result.json();
      
      setIsLoggedIn(false);
    } catch (error){
      console.log(error);
    }
  }

  const loginHandler = async (loggedIn: boolean) => {
    if (loggedIn) {
      setIsLoggedIn(true)
    }
  }

  const resetIngredientHandler = (array: any) => {
    setIngredients(array);
  }

  const searchResultResetHandler = () => {
    return setRecipeSearchResults([IngredientSearchDefault]);
  }

  const addSearchResultsHandler = (response: IngredientSearch[]) => {
    setRecipeSearchResults(response)
  }

  const foodprintContextValue: FoodprintContextObj = {
    ingredients: {
      items: ingredients,
      addIngredient: addIngredientHandler,
      removeIngredient: removeIngredientHandler,
      setItems: resetIngredientHandler
    },
    recipes: {
      items: recipes,
      addRecipe: addRecipeHandler,
      itemsReset: itemsResetHandler
    },
    recipeSearchResults: {
      items: recipeSearchResults,
      searchResultReset: searchResultResetHandler,
      setRecipeSearchResults: addSearchResultsHandler,
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