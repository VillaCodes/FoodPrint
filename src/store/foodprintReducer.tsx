import { constants } from '../utils/Constants';

const {
  SET_ID,
  RESET,
  SET_RECIPES,
  SET_FAVORITES,
  SET_INGREDIENTS,
  SET_RECIPE_INFO,
  SET_IS_LOGGED_IN,
  SET_QUERY
} = constants;

type State = {
  SET_ID: string
  RESET: {}
  SET_RECIPES: []
  SET_FAVORITES: []
  SET_INGREDIENTS: []
  SET_RECIPE_INFO: () => {}
  SET_IS_LOGGED_IN: boolean
  SET_QUERY: string
};

export const initialState:State = {
  id: '',
  recipes: [],
  favorites: [],
  ingredients: [],
  recipeInfo: () => {},
  isLoggedIn: false,
  queryString: ''
};

type Action = { type: SET_ID, payload: string }
  | { type: RESET }
  | { type: SET_RECIPES, payload: [] }
  | { type: SET_FAVORITES, payload: [] }
  | { type: SET_INGREDIENTS, payload: [] }
  | { type: SET_RECIPE_INFO, payload: [] }
  | { type: SET_IS_LOGGED_IN, payload: boolean }
  | { type: SET_QUERY, payload: [] }

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
        recipeInfo: action.payload
      };
    case SET_IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload
      };
    case SET_QUERY:
      let searchString = ''
      const array = action.payload;
      for (let i = 0; i < array.length; i++){
        if (i !== array.length - 1) {
          searchString += (array[i].text + ',+');
        } else {
          searchString += array[i].text;
        };
      };
    return {
      ...state,
      queryString: searchString
    }
  }
}
