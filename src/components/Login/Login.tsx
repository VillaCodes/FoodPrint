import React, { useReducer, useEffect } from 'react'
import Card from '../UI/Card';


type State = {
  username: string
  password: string
  isButtonDisabled: boolean
  helperText: string
  isError: boolean
}

const initialState:State = {
  username: '',
  password: '',
  isButtonDisabled: true,
  helperText: '',
  isError: false
}

type Action = { type: 'setUsername', payload: string  }
  | { type: 'setPassword', payload: string }
  | { type: 'setIsButtonDisabled', payload: boolean }
  | { type: 'loginSuccess', payload: string }
  | { type: 'loginFailed', payload: string }
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





const Login = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.username.trim() && state.password.trim()) {
     dispatch({
       type: 'setIsButtonDisabled',
       payload: false
     });
    } else {
      dispatch({
        type: 'setIsButtonDisabled',
        payload: true
      });
    }
  }, [state.username, state.password]);

  const loginHandler = () => {
    if (state.username === 'abc@email.com' && state.password === 'password') {
      dispatch({
        type: 'loginSuccess',
        payload: 'Login Successfully'
      });
    } else {
      dispatch({
        type: 'loginFailed',
        payload: 'Incorrect username or password'
      });
    }
  };

  const keyPressHandler = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 || event.which === 13) {
      state.isButtonDisabled || loginHandler();
    }
  };

  const usernameChangeHandler: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setUsername',
        payload: event.target.value
      });
    };


    const passwordChangeHandler: React.ChangeEventHandler<HTMLInputElement> =
      (event) => {
        dispatch({
          type: 'setPassword',
          payload: event.target.value
        });
      }

  return (
    <form noValidate autoComplete="off">
      <Card class='card'>
        <div>
          <input id='username' type='email' placeholder='Username' onChange={usernameChangeHandler} onKeyPress={keyPressHandler}/>
          <input id='password' type='password' placeholder='Password' onChange={passwordChangeHandler} onKeyPress={keyPressHandler}/>
        </div>
        <button onClick={loginHandler} disabled={state.isButtonDisabled}>Login</button>
      </Card>
    </form>
  );
}

export default Login;
