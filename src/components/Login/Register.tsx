import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { FoodprintContext } from '../../store/foodprint-context';
import { validations } from '../../utils/Validation';
import './Register.css';

const Register =  () => {
  const foodprintCtx = useContext(FoodprintContext);
  const { onLogin } = foodprintCtx.login
  const nav = useNavigate();
  const [ form, setForm ] = useState({
    username : '',
    email : '',
    password : '',
      errors : {
        username : '',
        email : '',
        password : '',
        present: false,
      },
    emailUse: ''
  })
  const errors = form.errors;
  const emailUse = form.emailUse;

  const changeHandler = (event: any) => {
    event.preventDefault();
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value
    });

    switch (name) {
      case 'username':
        errors.username = !validations.name(value) ? 'Username must be 5 characters long!': '';
        if(errors.username.length > 0) {
          errors.present = true;
        }
        break;
      case 'email':
        errors.email = validations.email(value) ? '': 'Email is not valid!';
        if(errors.email.length > 0) {
          errors.present = true;
        }
        break;
      case 'password':
        errors.password = !validations.name(value) ? 'Password must be eight characters long!': '';
        if(errors.password.length > 0) {
          errors.present = true;
        }
        break;
      default:
        break;
    }
  }

  const submitHandler = async (event: any) => {
    event.preventDefault();

    const data = {
      "name": form.username,
      "email": form.email,
      "password": form.password
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
      onLogin(form.email, form.password);
      nav('/');
    } else {
      setForm({
        ...form,
        emailUse: 'That email is not available'
      });
    }
  }

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h2>Sign Up</h2>
        <form onSubmit={submitHandler} noValidate>

          <div className="username">
            <input type="text" name="username" placeholder="Username"  onChange={changeHandler} />
            {errors.username.length > 0 && <span style={{color: "red"}}>{errors.username}</span>}
          </div>

          <div className="email">
            <input type="email" name="email" placeholder="E-mail" onChange={changeHandler} />
            {errors.email.length > 0 &&  <span style={{color: "red"}}>{errors.email}</span>}
          </div>

          <div className="password" >
            <input type="password" name="password" placeholder="Password" onChange={changeHandler} />
            {errors.password.length > 0 &&  <span style={{color: "red"}}>{errors.password}</span>}
          </div>

          <div className="submit inUse">
            <button disabled={!errors.present}>Register Me</button>
            <span style={{color: "red"}}>{emailUse}</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
