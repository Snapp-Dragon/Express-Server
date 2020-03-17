//the use reducer hook allows us to have access to state as a functional component
import React, { useReducer } from 'react';

//import contactContext to make the state available to your other components
import AuthContext from '../auth/authContext';

//import contactReducer to handle changes to the state
import authReducer from '../auth/authReducer';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';

//set initial state
const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  //state allows us to access anything is our state  & dispatch allows us to dispatch objects to the reducer
  const [state, dispatch] = useReducer(authReducer, initialState);

  /* Actions for the state*/

  // Load User
  // Register User
  // Log in user
  // Logout
  // clear errors

  //return the provider to provide access to the state and actions to child components

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
