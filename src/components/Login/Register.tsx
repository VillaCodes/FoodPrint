import React, { useContext, useReducer, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FoodprintContext } from '../../store/foodprint-context';
import { initialState, reducer } from '../../store/LoginReducer';
import { validations } from '../../utils/Validation';
import './Register.css';
import { constants } from '../../utils/Constants';

const {
  SET_USERNAME,
  SET_EMAIL,
  SET_PASSWORD,
  ATTEMPT_FAILED,
  SET_ERROR
} = constants;

const Register =  () => {
  const [ state, dispatch ] = useReducer(reducer, initialState);
  const foodprintCtx = useContext(FoodprintContext);
  const { onLogin } = foodprintCtx.login;
  const nav = useNavigate();
  useEffect(() => {
    if (!validations.name(state.username) || !validations.email(state.email) || !validations.password(state.password)) {
      dispatch({
        type: SET_ERROR,
        payload: true
      })
    } else {
      dispatch({
        type: SET_ERROR,
        payload: false
      })
    }
  }, [ state.username, state.email, state.password ]);

  const usernameChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch({
      type: SET_USERNAME,
      payload: event.target.value
    });
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

  const submitHandler = async (event: any) => {
    event.preventDefault();

    const data = {
      "name": state.username,
      "email": state.email,
      "password": state.password
    }

    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    const response = await fetch('http://localhost:4000/register', options);
    const json = await response.json();

    if( !json.emailExists ) {
      onLogin(state.email, state.password);
      nav('/');
    } else {
      dispatch({
        type: ATTEMPT_FAILED,
        payload: 'That email is currently being used.'
      })
    }
  }

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h2>Sign Up</h2>
        <form onSubmit={submitHandler} noValidate>

          <div className="username">
            <input type="text" name="username" placeholder="Username"  onChange={usernameChangeHandler} />
            {!validations.name(state.username) && <span style={{color: "red"}}>{'Username must be 5 characters long!'}</span>}
          </div>

          <div className="email">
            <input type="email" name="email" placeholder="E-mail" onChange={emailChangeHandler} />
            {!validations.name(state.email) &&  <span style={{color: "red"}}>{'Email is not valid!'}</span>}
          </div>

          <div className="password">
            <input type="password" name="password" placeholder="Password" onChange={passwordChangeHandler} />
            {!validations.name(state.password) &&  <span style={{color: "red"}}>{'Password must be eight characters long!'}</span>}
          </div>

          <div className="submit inUse">
            <button className="login-button" disabled={state.isError}>
              Register Me
            </button>

            <span style={{color: "red"}}>{state.helperText}</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
