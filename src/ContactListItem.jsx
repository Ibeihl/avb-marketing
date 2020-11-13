import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';

function ContactListItem({ contact, onClick }) {
  return (
    <li className={css(styles.contactItem)} key={contact.id}>
      <button
        className={css(styles.contactButton)}
        type="button"
        onClick={onClick}
      >
        <p>{`${contact.firstName} ${contact.lastName}`}</p>
      </button>
    </li>
  );
}

export default ContactListItem;

ContactListItem.propTypes = {
  contact: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  contactItem: {
    listStyleType: 'none',
    padding: '6px 20px',
  },
  contactButton: {
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    padding: 0,
  },
});
