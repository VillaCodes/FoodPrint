import React, { useReducer, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FoodprintContext } from '../../store/foodprint-context';
import { initialState, reducer } from './LoginReducer';
import { validations } from '../../utils/Validation';
import GoogleAuth from './GoogleAuth';
import './Login.css';

import { constants } from '../../utils/Constants';

const {
  SET_EMAIL,
  SET_PASSWORD,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  SET_BUTTON_DISABLED
} = constants;


const Login = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const foodprintCtx = useContext(FoodprintContext);
  const { onLogin } = foodprintCtx.login;
  const nav = useNavigate();

  useEffect(() => {
    if (validations.email(state.email.trim()) && validations.password(state.password.trim())) {
     dispatch({
       type: SET_BUTTON_DISABLED,
       payload: false
     });
    } else {
      dispatch({
        type: SET_BUTTON_DISABLED,
        payload: true
      });
    }
  }, [state.email, state.password]);

  const loginHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const data = {
      email: state.email,
      password: state.password
    }

    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    const result = await fetch('http://localhost:4000/Login', options);

    const json = await result.json();

    if (json.error) {
      return dispatch({
        type: LOGIN_FAILED,
        payload: `Something went wrong, please refresh the page`
      })
    }

    if (json.emailCheck) {
      return dispatch({
        type: LOGIN_FAILED,
        payload: `${json.emailCheck}`
      })
    }

    if (json.passwordMatch === true) {
      onLogin(state.username, state.password);
      nav('/');
      return dispatch({
        type: LOGIN_SUCCESS,
        payload: 'Login Successful'
      })
    } else {
      return dispatch({
        type: LOGIN_FAILED,
        payload: `${json.passwordMatch}`
      })
    }
  };

  const emailChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch({
      type: SET_EMAIL,
      payload: event.target.value
    });
  };


  const passwordChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch({
      type: SET_PASSWORD,
      payload: event.target.value
    });
  };

  return (
    <form noValidate autoComplete="off">
      <div className="wrapper">
        <div className='form-wrapper'>
          <h2>Log In</h2>
          <>
            <div className='email'>
              <input
                name='email'
                type='email'
                placeholder='E-mail'
                onChange={emailChangeHandler}
              />
            </div>

            <div className='password'>
              <input
                name='password'
                type='password'
                placeholder='Password'
                onChange={passwordChangeHandler}
              />
            </div>
          </>

          <GoogleAuth />

          {state.isError && <span style={{color: "red"}}>{state.helperText}</span>}

          <button onClick={loginHandler} disabled={state.isButtonDisabled}>Login</button>

          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
      </div>
    </form>
  );
}

export default Login;
