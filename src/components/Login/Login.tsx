import React, { useReducer, useEffect, useContext, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FoodprintContext } from '../../store/foodprint-context';
import { initialState, reducer } from '../../store/LoginReducer';
import { validations } from '../../utils/Validation';
import { fetchFormat } from '../../utils/main';
import GoogleAuth from './GoogleAuth';
import './Login.css';

import { constants } from '../../utils/Constants';

const {
  SET_EMAIL,
  SET_PASSWORD,
  ATTEMPT_SUCCESS,
  ATTEMPT_FAILED,
  SET_BUTTON_DISABLED
} = constants;


const Login = () => {
  const [ state, dispatch ] = useReducer(reducer, initialState);
  const foodprintCtx = useContext(FoodprintContext);
  const isMounted = useRef(true);
  const nav = useNavigate();
  const { onLogin } = foodprintCtx.login;
  const { setItems } = foodprintCtx.ingredients;
  const { setFavorites } = foodprintCtx.favorites;

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    }
  }, []);

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
  }, [ state.email, state.password ]);

  const loginHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (isMounted.current) {
      const data = {
        email: state.email,
        password: state.password
      }

      const result = await fetchFormat('http://localhost:4000/Login', 'POST', data);
      const json = await result.json();

      if (json.error) {
        return dispatch({
          type: ATTEMPT_FAILED,
          payload: 'Something went wrong, please refresh the page'
        })
      }

      if (json.emailCheck) {
        return dispatch({
          type: ATTEMPT_FAILED,
          payload: `${json.emailCheck}`
        })
      }

      if (json.passwordMatch === true) {
        setItems(json.ingredients);
        setFavorites(json.favorites);
        onLogin(json.loggedIn);
        nav('/');
        return dispatch({
          type: ATTEMPT_SUCCESS,
          payload: 'Login Successful'
        })
      } else {
        return dispatch({
          type: ATTEMPT_FAILED,
          payload: `${json.passwordMatch}`
        })
      }
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

          <button className="login-button" onClick={loginHandler} disabled={state.isButtonDisabled}>
            Login
          </button>

          <Link to="/register">
            <button className="login-button">Register</button>
          </Link>
        </div>
      </div>
    </form>
  );
}

export default Login;
