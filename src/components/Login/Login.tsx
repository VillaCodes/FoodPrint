import React, { useReducer, useEffect } from 'react'
import Card from '../UI/Card';
import { Link } from 'react-router-dom';
import './Login.css'
import reducer, { initialState } from './LoginReducer';

import constants from '../../utils/Constants';

const {
  SET_USERNAME,
  SET_PASSWORD,
  LOGIN_SUCCESS,
  LOGIN_FAILED
} = constants;


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
        type: LOGIN_SUCCESS,
        payload: 'Login Successfully'
      });
    } else {
      dispatch({
        type: LOGIN_FAILED,
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
        type: SET_USERNAME,
        payload: event.target.value
      });
    };


    const passwordChangeHandler: React.ChangeEventHandler<HTMLInputElement> =
      (event) => {
        dispatch({
          type: SET_PASSWORD,
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
        <Link className='signUp' to='/register'>New User?</Link>
      </Card>
    </form>
  );
}

export default Login;
