import React, { useState } from 'react';

const Login = () => {
  //component level state
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  //destructuring
  const { email, password } = user;

  //add to text field
  const onChange = e => {
    setUser({
      //copy current value of state,
      //the target gets the value
      ...user,
      [e.target.name]: [e.target.value]
    });
  };

  //on Submit
  const onSubmit = e => {
    e.preventDefault();

    console.log('Login Submit');
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Login</span>
      </h1>

      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input type='email' name='name' value={email} onChange={onChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='text'
            name='password'
            value={password}
            onChange={onChange}
          />
        </div>

        <input
          type='Submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Login;
