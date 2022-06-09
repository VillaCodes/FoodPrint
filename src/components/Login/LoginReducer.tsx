import { constants } from '../../utils/Constants';

const {
  SET_USERNAME,
  SET_PASSWORD,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  SET_BUTTON_DISABLED,
  SET_ERROR
} = constants;

type State = {
  username: string
  password: string
  isButtonDisabled: boolean
  helperText: string
  isError: boolean
}

export const initialState:State = {
  username: '',
  password: '',
  isButtonDisabled: true,
  helperText: '',
  isError: false
}

type Action = { type: SET_USERNAME, payload: string  }
  | { type: SET_PASSWORD, payload: string }
  | { type: SET_BUTTON_DISABLED, payload: boolean }
  | { type: LOGIN_SUCCESS, payload: string }
  | { type: LOGIN_FAILED, payload: string }
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
    case SET_BUTTON_DISABLED:
      return {
        ...state,
        isButtonDisabled: action.payload
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        helperText: action.payload,
        isError: false
      };
    case LOGIN_FAILED:
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
