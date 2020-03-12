//the use reducer hook allows us to have access to state as a functional component
import React, { useReducer } from 'react';

// random id generator to test data
import { v4 as uuid } from 'uuid';

//import contactContext to make the state available to your other components
import ContactContext from '../contact/contactContext';

//import contactReducer to handle changes to the state
import contactReducer from './contactReducer';

import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CLEAR_FILTER
} from '../types';

//set initial state
const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Chad Farrington',
        email: 'sandrock11@hotmail.com',
        phone: '3614192',
        type: 'Personal'
      },

      {
        id: 2,
        name: 'Alexio Edwards',
        email: 'ate006@hotmail.com',
        phone: '392544371',
        type: 'Professional'
      },

      {
        id: 3,
        name: 'Franklyn minns',
        email: 'bigpun12@hotmail.com',
        phone: '32345321',
        type: 'Professional'
      }
    ]
  };

  //state allows us to access anything is our state  & dispatch allows us to dispatch objects to the reducer
  const [state, dispatch] = useReducer(contactReducer, initialState);

  /* Actions for the state*/

  // Add Contact

  const addContact = contact => {
    contact.id = uuid();

    dispatch({ type: ADD_CONTACT, payload: contact });
  };
  // Delete Contact

  const deleteContact = id => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };
  // Set Current Contact
  // Clear Current Contact
  // Update Contact
  // Filter Contacts
  // Clear Filter

  //return the provider to provide access to the state and actions to child components

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        addContact,
        deleteContact
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
