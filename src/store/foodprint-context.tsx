import React, { SetStateAction, useEffect, useReducer } from 'react';
import Ingredients from '../models/ingredients';
import {Recipe, IngredientSearch, IngredientSearchDefault} from '../models/recipe';
import { RecipeInfo, RecipeInfoDefault } from '../models/recipeInfo';
import { initialState, reducer } from './foodprintReducer';
import { constants } from '../utils/Constants';
import { fetchID } from '../utils/main';

const {
  SET_ID,
  RESET,
  SET_RECIPES,
  SET_FAVORITES,
  SET_INGREDIENTS,
  SET_RECIPE_INFO,
  SET_IS_LOGGED_IN
} = constants;

type FoodprintContextObj = {
  ingredients: {
    items: Ingredients[];
    addIngredient: (text: string) => void;
    removeIngredient: (text: string) => void;
    setItems: ([]) => void;
  },
  recipes: {
    items: Recipe[];
    setRecipes: ([]) => void;
  },
  recipeSearchResults: {
    items: IngredientSearch[];
    setRecipeSearchResults: (response:IngredientSearch[]) => void;
  },
  recipeInfo: {
    items: RecipeInfo;
    setRecipeInfo: React.Dispatch<SetStateAction<RecipeInfo>>
  },
  login: {
    isLoggedIn: boolean,
    onLogout: () => void;
    onLogin: (loggedIn: boolean) => void,
    id: any
  },
  favorites: {
    items: Recipe[];
    addFavorite: (title: string, id: number, image: string) => void;
    removeFavorite: (id: number) => void;
    setFavorites: ([]) => void;
    isFavorite: (items: any, favorites: any) => boolean;
  }
};

export const FoodprintContext = React.createContext<FoodprintContextObj>({
  ingredients: {
    items: [],
    addIngredient: (text: string) => undefined,
    removeIngredient: () => undefined
  },
  recipes: {
    items: [],
    setRecipes: ([]) => undefined,
  },
  recipeSearchResults: {
    items: [],
    setRecipeSearchResults: (response: IngredientSearch[]) => undefined
  },
  recipeInfo: {
    items: RecipeInfoDefault,
    setRecipeInfo: () => undefined
  },
  login: {
    isLoggedIn: false,
    onLogout: () => undefined,
    onLogin: (loggedIn: boolean) => undefined,
    id: ''
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
  const [ state, dispatch ] = useReducer(reducer, initialState);

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
        dispatch({
          type: SET_IS_LOGGED_IN,
          payload: true
        });
      }
    }

    cookieCheck();
  }, []);

  const addIngredientHandler = (ingredientText: string) => {
    const newIngredient = new Ingredients(ingredientText);
    const updatedIngredients = state.ingredients.concat(newIngredient);
    dispatch({
      type: SET_INGREDIENTS,
      payload: updatedIngredients
    });
  };

  const removeIngredientHandler = (ingredient: string) => {
    const updatedIngredients =  state.ingredients.filter((prevIngredient: Ingredients) => prevIngredient.text !== ingredient)
    dispatch({
      type: SET_INGREDIENTS,
      payload: updatedIngredients
    });
  };

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

      dispatch({
        type: SET_IS_LOGGED_IN,
        payload: false
      })
      dispatch({
        type: RESET
      })
    } catch (error){
      console.log(error);
    }
  };

  const loginHandler = async (loggedIn: boolean) => {
    if (loggedIn) {
      dispatch({
        type: SET_IS_LOGGED_IN,
        payload: true
      });
      dispatch({
        type: SET_ID,
        payload: await fetchID()
      })
    };
  };

  const addFavoriteHandler = (title: string, id: number, image: string) => {
    const newFavorite = new Recipe(title, id, image);
    const updatedFavorites = state.favorites.concat(newFavorite);
    dispatch ({
      type: SET_FAVORITES,
      payload: updatedFavorites
    });
  };

  const removeFavoriteHandler = async (recipe: any) => {
    const updatedFavorites = state.favorites.filter((prevFavorites: any) => prevFavorites.id !== recipe);
    console.log(recipe, updatedFavorites);
    dispatch({
      type: SET_FAVORITES,
      payload: updatedFavorites
    });
  };

  const setFavoriteHandler = (array: any) => {
    dispatch({
      type: SET_FAVORITES,
      payload: array
    });
  };

  const isFavoriteHandler = ( id: number ) => {
    for (let i = 0; i < state.favorites.length; i++) {
      if (id === state.favorites[i].id) {
        return true;
      }
    }
    return false;
  };

  const resetIngredientHandler = (array: any) => {
    dispatch({
      type: SET_INGREDIENTS,
      payload: array
    });
  };

  const setRecipesHandler = (array: any) => {
    dispatch({
      type: SET_RECIPES,
      payload: array
    });
  };

  const setRecipeInfoHandler = (array: any) => {
    dispatch({
      type: SET_RECIPE_INFO,
      payload: array
    });
  };

  const setRecipeInfoHandler = (array: any) => {
    dispatch({
      type: SET_RECIPE_INFO,
      payload: array
    });
  };

  const foodprintContextValue: FoodprintContextObj = {
    ingredients: {
      items: state.ingredients,
      addIngredient: addIngredientHandler,
      removeIngredient: removeIngredientHandler,
      setItems: resetIngredientHandler
    },
    recipes: {
      items: state.recipes,
      setRecipes: setRecipesHandler
    },
    recipeSearchResults: {
      items: recipeSearchResults,
      setRecipeSearchResults: setRecipeSearchResults,
    },
    recipeInfo: {
      items: state.recipeInfo,
      setRecipeInfo: setRecipeInfoHandler
    },
    login: {
      isLoggedIn: state.isLoggedIn,
      onLogout: logoutHandler,
      onLogin: loginHandler,
      id: state.id
    },
    favorites: {
      items: state.favorites,
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
};

export default FoodprintContextProvider;
