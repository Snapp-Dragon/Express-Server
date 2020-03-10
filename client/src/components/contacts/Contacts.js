import React, { useContext, Fragment } from 'react';
import ContactContext from '../../context/contact/contactContext';

const Contacts = () => {
  //initilize contactContext so we can have access to any state or action of this context
  const contactContext = useContext(ContactContext);

  // pull the list of contacts out from contact context

  const { contacts } = contactContext;

  return (
    <Fragment>
      {contacts.map(contact => (
        <h3>{contact.name}</h3>
      ))}
    </Fragment>
  );
};

export default Contacts;
