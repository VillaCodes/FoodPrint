import { useState } from 'react'

import './Register.css';

const Regex = RegExp(/^\s?[A-Z0–9]+[A-Z0–9._+-]{0,}@[A-Z0–9._+-]+\.[A-Z0–9]{2,4}\s?$/i);

const Register =  () => {
  const [ form, setForm ] = useState({
    username : '',
    email : '',
    password : '',
      errors : {
        username : '',
        email : '',
        password : ''
      }
  })
  const errors = form.errors;

  const changeHandler = (event: any) => {
    event.preventDefault();
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value
    });

    switch (name) {
      case 'username':
        errors.username = value.length < 5 ? 'Username must be 5 characters long!': '';
        break;
      case 'email':
        errors.email = Regex.test(value) ? '': 'Email is not valid!';
        break;
      case 'password':
        errors.password = value.length < 8 ? 'Password must be eight characters long!': '';
        break;
      default:
        break;
    }
  }



  const submitHandler = (event: any) => {
    event.preventDefault();
    let valid = true;
    Object.values(errors).forEach(
      (val) => val.length > 0 && (valid = false)
    );
    if (valid == true){
      console.log()
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

          <div className="submit">
            <button disabled={false}>Register Me</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
