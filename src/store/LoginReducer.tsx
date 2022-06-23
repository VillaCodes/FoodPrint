import { constants } from '../utils/Constants';

const {
  SET_USERNAME,
  SET_PASSWORD,
  SET_EMAIL,
  ATTEMPT_SUCCESS,
  ATTEMPT_FAILED,
  SET_BUTTON_DISABLED,
  SET_ERROR
} = constants;

type State = {
  username: string
  password: string
  email: string
  isButtonDisabled: boolean
  helperText: string
  isError: boolean
}

export const initialState:State = {
  username: '',
  password: '',
  email: '',
  isButtonDisabled: true,
  helperText: '',
  isError: false
}

type Action = { type: SET_USERNAME, payload: string  }
  | { type: SET_PASSWORD, payload: string }
  | { type: SET_EMAIL, payload: string }
  | { type: SET_BUTTON_DISABLED, payload: boolean }
  | { type: ATTEMPT_SUCCESS, payload: string }
  | { type: ATTEMPT_FAILED, payload: string }
  | { type: SET_ERROR, payload: boolean };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_USERNAME:
      return {
        ...state,
        username: action.payload
      };
    case SET_PASSWORD:
      return {
        ...state,
        password: action.payload
      };
    case SET_EMAIL:
      return {
        ...state,
        email: action.payload
      };
    case SET_BUTTON_DISABLED:
      return {
        ...state,
        isButtonDisabled: action.payload
      };
    case ATTEMPT_SUCCESS:
      return {
        ...state,
        helperText: action.payload,
        isError: false
      };
    case ATTEMPT_FAILED:
      return {
        ...state,
        helperText: action.payload,
        isError: true
      };
    case SET_ERROR:
      return {
        ...state,
        isError: action.payload
    };
  }
}
