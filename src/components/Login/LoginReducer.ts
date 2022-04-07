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

type Action = { type: user, payload: string  }
  | { type: pass, payload: string }
  | { type: 'setIsButtonDisabled', payload: boolean }
  | { type: success, payload: string }
  | { type: fail, payload: string }
  | { type: 'setIsError', payload: boolean };


const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setUsername':
      return {
        ...state,
        username: action.payload
      };
    case 'setPassword':
      return {
        ...state,
        password: action.payload
      };
    case 'setIsButtonDisabled':
      return {
        ...state,
        isButtonDisabled: action.payload
      };
    case 'loginSuccess':
      return {
        ...state,
        helperText: action.payload,
        isError: false
      };
    case 'loginFailed':
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
