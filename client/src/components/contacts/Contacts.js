import React, { useContext, Fragment } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from '../contacts/ContactItem';

const Contacts = () => {
  //initilize contactContext so we can have access to any state or action of this context
  const contactContext = useContext(ContactContext);

  // pull the list of contacts out from contact context

  const { contacts } = contactContext;

  return (
    <Fragment>
      {contacts.map(contact => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </Fragment>
  );
};

export default Contacts;
