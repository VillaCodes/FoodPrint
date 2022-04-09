import constants from '../../utils/Constants';

const {
  user,
  pass,
  success,
  fail
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

type Action = { type: typeof user, payload: string  }
  | { type: typeof pass, payload: string }
  | { type: 'setIsButtonDisabled', payload: boolean }
  | { type: typeof success, payload: string }
  | { type: typeof fail, payload: string }
  | { type: 'setIsError', payload: boolean };


const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case user:
      return {
        ...state,
        username: action.payload
      };
    case pass:
      return {
        ...state,
        password: action.payload
      };
    case 'setIsButtonDisabled':
      return {
        ...state,
        isButtonDisabled: action.payload
      };
    case success:
      return {
        ...state,
        helperText: action.payload,
        isError: false
      };
    case fail:
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
