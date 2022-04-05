import React, { useReducer, useEffect } from 'react'
import Card from '../UI/Card';
import reducer, { initialState } from './LoginReducer';

const Login = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

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


      const submitFormHandler = (event: React.FormEvent) => {
        event.preventDefault;
      }

  return (
    <form noValidate autoComplete="off" onSubmit={submitFormHandler}>
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
