import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FoodprintContext } from '../../store/foodprint-context';
import { validations } from '../../utils/Validation';
import { fetchFormat } from '../../utils/main';
import './Register.css';

const Register =  () => {
  const [ inputState, setInputState ] = useState({username: '', email: '', password: '', error: ''})
  const foodprintCtx = useContext(FoodprintContext);
  const { onLogin } = foodprintCtx.login;
  const nav = useNavigate();
  useEffect(() => {
    if (!validations.name(inputState.username) || !validations.email(inputState.email) || !validations.password(inputState.password)) {
      setInputState((prevState) => ({
        ...prevState,
        error: ''
      }));
    } else {
      setInputState((prevState) => ({
        ...prevState,
        error: ''
      }));
    }
  }, [ inputState.username, inputState.email, inputState.password ]);

  const usernameChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputState((prevState) => ({
      ...prevState,
      username: event.target.value
    }));
  };

  const emailChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputState((prevState) => ({
      ...prevState,
      email: event.target.value
    }));
  };

  const passwordChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputState((prevState) => ({
      ...prevState,
      password: event.target.value
    }));
  };

  const submitHandler = async (event: any) => {
    event.preventDefault();

    const data = {
      "name": inputState.username,
      "email": inputState.email,
      "password": inputState.password
    };

    const response = await fetchFormat('http://localhost:4000/register', 'POST', data);
    const json = await response.json();

    if( !json.emailExists ) {
      onLogin(true);
      nav('/');
    } else {
      setInputState((prevState) => ({
        ...prevState,
        error: 'That email is currently in use.'
      }));
    }
  }

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h2>Sign Up</h2>
        <form onSubmit={submitHandler} noValidate>

          <div className="username">
            <input type="text" name="username" placeholder="Username"  onChange={usernameChangeHandler} />
            {!validations.name(inputState.username) && <span style={{color: "red"}}>{'Username must be 5 characters long!'}</span>}
          </div>

          <div className="email">
            <input type="email" name="email" placeholder="E-mail" onChange={emailChangeHandler} />
            {!validations.name(inputState.email) &&  <span style={{color: "red"}}>{'Email is not valid!'}</span>}
          </div>

          <div className="password">
            <input type="password" name="password" placeholder="Password" onChange={passwordChangeHandler} />
            {!validations.name(inputState.password) &&  <span style={{color: "red"}}>{'Password must be eight characters long!'}</span>}
          </div>

          <div className="submit inUse">
            <button className="login-button" disabled={inputState.error.length > 0}>
              Register Me
            </button>

            <span style={{color: "red"}}>{inputState.error}</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
