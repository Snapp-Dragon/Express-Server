//the use reducer hook allows us to have access to state as a functional component
import React, { useReducer } from 'react';

//import contactContext to make the state available to your other components
import AlertContext from '../alert/alertContext';

// random id generator to test data
import { v4 as uuid } from 'uuid';

//import contactReducer to handle changes to the state
import alertReducer from './alertReducer';

import { SET_ALERT, REMOVE_ALERT } from '../types';

//set initial state
const AlertState = props => {
  const initialState = [];

  //state allows us to access anything is our state  & dispatch allows us to dispatch objects to the reducer
  const [state, dispatch] = useReducer(alertReducer, initialState);

  /* Actions for the state*/

  //set alert

  const setAlert = (msg, type) => {
    const id = uuid();

    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id }
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
  };

  //return the provider to provide access to the state and actions to child components

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
