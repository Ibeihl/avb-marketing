import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';

import deleteIcon from './assets/remove.svg';

function ContactEmail({ email, onClick }) {
  return (
    <div className={css(styles.emailWrapper)} key={email}>
      <div className={css(styles.emailOverLay)}>
        <p className={css(styles.email)}>{email}</p>
        <div className={css(styles.buttonOverLay)} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            className={css(styles.deleteEmail)}
            type="button"
            onClick={onClick}
          >
            <img className={css(styles.deleteEmailIcon)} src={deleteIcon} alt="remove email" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactEmail;

ContactEmail.propTypes = {
  email: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  emailWrapper: {
    position: 'relative',
    height: '24px',
    marginBottom: '8px',
  },
  email: {
    fontSize: '18px',
    lineHeight: '22px',
  },
  emailOverLay: {
    position: 'absolute',
    backgroundColor: 'white',
    top: 0,
    bottom: 0,
    left: 0,
  },
  buttonOverLay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    zIndex: 2,
    opacity: 0,
    right: -40,
    ':hover': {
      opacity: 1,
    },
  },
  deleteEmail: {
    border: 'none',
    background: 'none',
  },
  deleteEmailIcon: {
    height: '22px',
    width: '22px',
    cursor: 'pointer',
  },
});
