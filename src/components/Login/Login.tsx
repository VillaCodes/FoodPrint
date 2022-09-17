import React, { useEffect, useContext, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FoodprintContext } from '../../store/foodprint-context';
import { validations } from '../../utils/Validation';
import { fetchFormat } from '../../utils/main';
import GoogleAuth from './GoogleAuth';
import './Login.css';

const Login = () => {
  const [ inputObj, setInputObj ] = useState({
    name: '',
    password: '',
    email: '',
    isButtonDisabled: true,
    error: {
      errorPresent: false,
      helperText: ''
    }
  });
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
    if (!validations.email(inputObj.email.trim()) || !validations.password(inputObj.password.trim())) {
     setInputObj((prevState) => ({
       ...prevState,
       isButtonDisabled: true
     }));
    } else {
      setInputObj((prevState) => ({
        ...prevState,
        isButtonDisabled: false
      }));
    }
  }, [ inputObj.email, inputObj.password, inputObj.error ]);

  const loginHandler: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();

    if (isMounted.current) {
      const data = {
        email: inputObj.email,
        password: inputObj.password
      }

      const result = await fetchFormat('http://localhost:4000/Login', 'POST', data);
      const json = await result.json();

      if (json.error) {
        return setInputObj((prevState) => ({
          ...prevState,
          error: {
            errorPresent: true,
            helperText: json.error
          }
        }));
      } else {
        // const id = await fetchID();
        setItems(json.ingredients);
        setFavorites(json.favorites);
        onLogin(json.loggedIn);
        nav('/');
        // set userId to state before return
        return;
      }
    }
  }

  const emailChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputObj((prevState) => ({
      ...prevState,
      email: event.target.value
    }));
  };

  const passwordChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputObj((prevState) => ({
      ...prevState,
      password: event.target.value
    }));
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

          {inputObj.error.errorPresent && <span style={{color: "red"}}>{inputObj.error.helperText}</span>}

          <button className="login-button" onClick={loginHandler} disabled={inputObj.isButtonDisabled}>
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
