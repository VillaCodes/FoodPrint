import { constants } from '../utils/Constants';

const {
  SET_ID,
  RESET,
  SET_RECIPES,
  ADD_RECIPE,
  SET_FAVORITES,
  SET_INGREDIENTS,
  SET_RECIPE_INFO,
  SET_IS_LOGGED_IN
} = constants;

type State = {
  SET_ID: string
  RESET: {}
  SET_RECIPES: []
  ADD_RECIPE: []
  SET_FAVORITES: []
  SET_INGREDIENTS: []
  SET_RECIPE_INFO: () => {}
  SET_IS_LOGGED_IN: boolean
};

export const initialState:State = {
  id: '',
  recipes: [],
  favorites: [],
  ingredients: [],
  recipeInfo: () => {},
  isLoggedIn: false
};

type Action = { type: SET_ID, payload: string }
  | { type: RESET }
  | { type: SET_RECIPES, payload: [] }
  | { type: SET_FAVORITES, payload: [] }
  | { type: SET_INGREDIENTS, payload: [] }
  | { type: SET_RECIPE_INFO, payload: [] }
  | { type: SET_IS_LOGGED_IN, payload: boolean }

  export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_ID:
      return {
        ...state,
        id: action.payload
      };
    case RESET:
      return initialState;
    case SET_RECIPES:
      return {
        ...state,
        recipes: action.payload
      };
    case SET_FAVORITES:
      return {
        ...state,
        favorites: action.payload
      };
    case SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.payload
      };
    case SET_RECIPE_INFO:
      return {
        ...state,
        recipeInfo: [ ...recipeInfo, action.payload ]
      };
    case SET_IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload
    };
  }
}
