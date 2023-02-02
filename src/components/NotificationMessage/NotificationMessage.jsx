import css from './notificationMessage.module.css';
import PropTypes from 'prop-types';

export const NotificationMessage = ({ message }) => {
  return <p className={css.notification}>{message}</p>;
};

NotificationMessage.propTypes = { message: PropTypes.string.isRequired };
