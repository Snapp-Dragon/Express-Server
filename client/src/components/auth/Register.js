import React, { useState } from 'react';

const Register = () => {
  //component level state
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  //destructuring
  const { name, email, password, password2 } = user;

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

    console.log('Register Submit');
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span>
      </h1>

      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' value={name} onChange={onChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Name</label>
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
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            type='text'
            name='password2'
            value={password2}
            onChange={onChange}
          />
        </div>

        <input
          type='Submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Register;
