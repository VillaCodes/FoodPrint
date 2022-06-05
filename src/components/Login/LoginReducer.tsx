import { constants } from '../../utils/Constants';

const {
  SET_USERNAME,
  SET_PASSWORD,
  LOGIN_SUCCESS,
  LOGIN_FAILED
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

type Action = { type: typeof SET_USERNAME, payload: string  }
  | { type: typeof SET_PASSWORD, payload: string }
  | { type: 'setIsButtonDisabled', payload: boolean }
  | { type: typeof LOGIN_SUCCESS, payload: string }
  | { type: typeof LOGIN_FAILED, payload: string }
  | { type: 'setIsError', payload: boolean };


const reducer = (state: State, action: Action): State => {
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
    case 'setIsButtonDisabled':
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
    case 'setIsError':
      return {
        ...state,
        isError: action.payload
    };
  }
}

export default reducer;
