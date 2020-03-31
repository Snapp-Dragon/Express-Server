//the use reducer hook allows us to have access to state as a functional component
import React, { useReducer } from 'react';

import axios from 'axios';

//import contactContext to make the state available to your other components
import ContactContext from '../contact/contactContext';

//import contactReducer to handle changes to the state
import contactReducer from './contactReducer';

import {
  ADD_CONTACT,
  GET_CONTACTS,
  CLEAR_CONTACTS,
  DELETE_CONTACT,
  CONTACT_ERROR,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';

//set initial state
const ContactState = props => {
  const initialState = {
    contacts: null,

    current: null,

    filtered: null,

    error: null
  };

  //state allows us to access anything is our state  & dispatch allows us to dispatch objects to the reducer
  const [state, dispatch] = useReducer(contactReducer, initialState);

  /* Actions for the state*/

  //GET CONTACTS

  const getContacts = async () => {
    //create headers to send data
    try {
      const res = await axios.post('/api/contacts');

      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };

  // Add Contact
  const addContact = async contact => {
    //create headers to send data
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/contacts', contact, config);

      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };
  // Delete Contact

  const deleteContact = async id => {
    try {
      await axios.post(`/api/contacts/${id}`);

      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };

  //clear contacts
  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  // Set Current Contact

  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };
  // Clear Current Contact

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  //update contact
  const updateContact = contact => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  // Filter Contacts

  const filterContacts = text => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };
  // Clear Filter

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  //return the provider to provide access to the state and actions to child components

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        clearContacts,
        getContacts
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
