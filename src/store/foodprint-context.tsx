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
  },
  favorites: {
    items: Recipe[];
    addFavorite: (title: string, id: number, image: string) => void;
    removeFavorite: (id: number) => void;
    setFavorites: ([]) => void;
    isFavorite: (items: any, favorites: any) => boolean;
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
  },
  favorites: {
    items: [],
    addFavorite: (id: string) => undefined,
    removeFavorite: (id: number) => undefined,
    setFavorites: (array: any) => undefined,
    isFavorite: () => false
  }
});

const FoodprintContextProvider: React.FC = (props) => {
  const [ ingredients, setIngredients ] = useState<Ingredients[]>([]);
  const [ recipes, setRecipes ] = useState<Recipe[]>([]);
  const [ favorites, setFavorites ] = useState<Recipe[]>([]);
  const [ recipeInfo, setRecipeInfo ] = useState<RecipeInfo>(RecipeInfoDefault);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ recipeSearchResults, setRecipeSearchResults ] = useState<IngredientSearch[]>([IngredientSearchDefault]);

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
      return [...prevRecipe, newRecipe];
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

  const addFavoriteHandler = (title: string, id: number, image: string) => {
    const newFavorite = new Recipe(title, id, image);

    setFavorites((prevFavorites) => {
      return prevFavorites.concat(newFavorite);
    });
  };

  const removeFavoriteHandler = async (recipe: any) => {
    setFavorites((prevFavorites) => {
      return prevFavorites.filter(item => item.id !== recipe);
    });
  };

  const setFavoriteHandler = (array: any) => {
    setFavorites(array);
  };

  const isFavoriteHandler = (id: number, favorites: any) => {
    for (let i = 0; i < favorites.length; i++) {
      if (id === favorites[i].id) {
        return true;
      }
    }
    return false;
  };

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
      setRecipeSearchResults: setRecipeSearchResults,
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
    },
    favorites: {
      items: favorites,
      addFavorite: addFavoriteHandler,
      removeFavorite: removeFavoriteHandler,
      setFavorites: setFavoriteHandler,
      isFavorite: isFavoriteHandler
    }
  };


  return (
    <FoodprintContext.Provider value={foodprintContextValue}>
      {props.children}
    </FoodprintContext.Provider>
  )
}


export default FoodprintContextProvider;
