import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StyleSheet, css } from 'aphrodite';

import ContactListItem from './ContactListItem';
import ContactEmail from './ContactEmail';
import addIcon from './assets/add.svg';

function App() {
  const [contacts, setContacts] = useState([]);
  const [focusedContact, setFocusedContact] = useState();
  const [showEmail, toggleEmail] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [validationError, setError] = useState();

  useEffect(() => {
    axios.get('https://avb-contacts-api.herokuapp.com/contacts')
      .then(results => setContacts(results.data));
  }, []);

  useEffect(() => {
    if (validationError) setTimeout(() => setError(null), 3000);
  }, [validationError]);

  const deleteContact = async (id) => {
    try {
      await axios.delete(`https://avb-contacts-api.herokuapp.com/contacts/${id}`);
      const { data } = await axios.get('https://avb-contacts-api.herokuapp.com/contacts');
      setFocusedContact(null);
      setContacts(data);
    } catch {
      setError('Something Went Wrong...');
    }
  };

  const saveContact = async () => {
    let contactToSave = focusedContact;
    if (newEmail) contactToSave = { ...contactToSave, emails: [...contactToSave.emails, newEmail] };

    if (!contactToSave.firstName || contactToSave.firstName === '') {
      return setError('Missing First Name');
    }

    if (!contactToSave.lastName || contactToSave.lastName === '') {
      return setError('Missing Last Name');
    }

    try {
      const { data: updatedContact } = await axios.put(`https://avb-contacts-api.herokuapp.com/contacts/${focusedContact.id}`, contactToSave);
      setFocusedContact(updatedContact);
      setNewEmail('');
      toggleEmail(false);
      const { data } = await axios.get('https://avb-contacts-api.herokuapp.com/contacts');
      return setContacts(data);
    } catch {
      return setError('Something Went Wrong...');
    }
  };

  const createContact = async () => {
    let contactToSave = focusedContact;
    if (newEmail && newEmail !== '') contactToSave = { ...contactToSave, emails: [...contactToSave.emails, newEmail] };

    if (!contactToSave.firstName || contactToSave.firstName === '') {
      return setError('Missing First Name');
    }

    if (!contactToSave.lastName || contactToSave.lastName === '') {
      return setError('Missing Last Name');
    }

    try {
      const { data: updatedContact } = await axios.post('https://avb-contacts-api.herokuapp.com/contacts', contactToSave);
      setFocusedContact(updatedContact);
      setNewEmail('');
      toggleEmail(false);
      const { data } = await axios.get('https://avb-contacts-api.herokuapp.com/contacts');
      return setContacts(data);
    } catch (e) {
      return setError('Something Went Wrong...');
    }
  };

  return (
    <div className={css(styles.container)}>
      <div className={css(styles.contactsList)}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 className={css(styles.contactsHead)}>Contacts</h1>
          <button className={css(styles.addContact)} type="button" onClick={() => setFocusedContact({ firstName: '', lastName: '', emails: [] })}>
            <img className={css(styles.addContactIcon)} src={addIcon} alt="add contact" />
          </button>
        </div>
        <ul style={{ padding: 0, margin: 0 }}>
          {contacts.length > 0 && (
            contacts.map(contact => (
              <ContactListItem
                contact={contact}
                onClick={() => {
                  setFocusedContact(contact);
                  toggleEmail(false);
                  setNewEmail('');
                }}
              />
            ))
          )}
        </ul>
      </div>
      <div className={css(styles.editContact)}>
        {focusedContact && (
        <div style={{ height: '100%', width: '100%', padding: '30px' }}>
          <div className={css(styles.nameInputs)}>
            <div className={css(styles.nameInputWrap)}>
              <label className={css(styles.label)}>First Name</label>
              <input
                className={css(styles.input)}
                type="text"
                placeholder="First Name"
                value={focusedContact.firstName}
                onChange={e => setFocusedContact(prevContact => ({ ...prevContact, firstName: e.target.value }))}
              />
            </div>
            <div style={{ width: '30px' }} />
            <div className={css(styles.nameInputWrap)}>
              <label className={css(styles.label)}>Last Name</label>
              <input
                className={css(styles.input)}
                type="text"
                placeholder="Last Name"
                value={focusedContact.lastName}
                onChange={e => setFocusedContact(prevContact => ({ ...prevContact, lastName: e.target.value }))}
              />
            </div>
          </div>
          <p className={css(styles.emailLabel)}>Email</p>

          {focusedContact.emails.map(email => (
            <ContactEmail
              email={email}
              onClick={() => setFocusedContact(prevContact => ({ ...prevContact, emails: focusedContact.emails.filter(em => em !== email) }))}
            />
          ))}

          {showEmail ? (
            <input
              className={css(styles.input)}
              type="text"
              value={newEmail}
              placeholder="Email"
              onChange={e => setNewEmail(e.target.value)}
            />
          ) : (
            <button
              className={css(styles.addEmail)}
              onClick={() => toggleEmail(!showEmail)}
              type="button"
            >
              <img src={addIcon} alt="add email" />
              <p className={css(styles.addEmailText)}>add email</p>
            </button>
          )}

          {validationError && <p className={css(styles.validation)}>{validationError}</p>}

          <div className={css(styles.buttonCont)}>
            <button
              className={css(styles.editContactButton, styles.deleteContact)}
              onClick={() => deleteContact(focusedContact.id)}
              type="button"
            >
              Delete
            </button>
            <div style={{ display: 'flex' }}>
              <button
                className={css(styles.editContactButton, styles.cancel)}
                onClick={() => {
                  setFocusedContact(null);
                  toggleEmail(false);
                  setNewEmail('');
                }}
                type="button"
              >
                Cancel
              </button>
              <button
                className={css(styles.editContactButton, styles.saveContact)}
                onClick={focusedContact.id ? saveContact : createContact}
                type="button"
              >
                Save
              </button>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    font: 'lato',
  },
  contactsHead: {
    padding: '16px',
    fontSize: '36',
    font: 'lato',
    fontWeight: 400,
    margin: 0,
  },
  addContact: {
    border: 'none',
    background: 'none',
    padding: 0,
    marginRight: '20px',
    cursor: 'pointer',
  },
  addContactIcon: {
    height: '32px',
    width: '32px',
  },
  contactsList: {
    height: '100vh',
    maxWidth: '300px',
    width: '100%',
    backgroundColor: '#F8FAFF',
    overflow: 'scroll',
  },
  editContact: {
    width: '100%',
    height: '100vh',
    overflow: 'scroll',
  },
  label: {
    font: 'lato',
    fontSize: '12px',
    marginBottom: '8px',
    color: '#555555',
  },
  input: {
    color: '#444444',
    padding: '8px 12px',
    background: '#F9FBFF',
    border: '1px solid #D7E7FF',
  },
  nameInputs: {
    display: 'flex',
    width: '100%',
    fontSize: '18px',
    marginTop: '46px',
    marginBottom: '24px',
  },
  nameInputWrap: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
  },
  emailLabel: {
    color: '#555555',
    fontSize: '12px',
  },
  buttonCont: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 'calc(100vw - 360px)',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 30,
  },
  editContactButton: {
    height: '36px',
    width: '120px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',
    fontFamily: 'lato',
    fontSize: '20px',
    cursor: 'pointer',
  },
  deleteContact: {
    backgroundColor: '#FF5757',
    color: 'white',
  },
  saveContact: {
    backgroundColor: '#579AFF',
    color: 'white',
  },
  cancel: {
    backgroundColor: '#F9FBFF',
    border: '1px solid #579AFF',
    marginRight: '30px',
  },
  addEmail: {
    color: '#579AFF',
    border: 'none',
    background: 'none',
    display: 'flex',
    alignItems: 'center',
    padding: 0,
  },
  addEmailText: {
    marginLeft: '12px',
    fontSize: '18px',
  },
  validation: {
    color: '#FF5757',
    position: 'absolute',
    bottom: '96px',
    right: '30px',
    margin: 0,
    fontSize: '22px',
  },
});
