import { useState } from 'react'

import './Register.css';

interface SignUpProps {
   name?: any;
   value?: any;
}
interface SignUpState {
   username : string,
   email : string,
   password : string,
   errors : {
      username :  string,
      email : string,
      password : string
   }
}

const Register =  () => {
  const [ form, setForm ] = useState({});

  const handleChange = (event: any) => {
    event.preventDefault();
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value
    })
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
  }

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} noValidate>

          <div className="fullName">
            <input type="text" name="fullName" placeholder="Full Name"  onChange={handleChange} />
          </div>

          <div className="email">
            <input type="email" name="email" placeholder="E-mail" onChange={handleChange} />
          </div>

          <div className="password" >
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
          </div>

          <div className="submit">
            <button>Register Me</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
