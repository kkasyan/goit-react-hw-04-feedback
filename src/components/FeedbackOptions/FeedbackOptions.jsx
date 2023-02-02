import PropTypes from 'prop-types';
import css from './feedbackOptions.module.css';
const shortid = require('shortid');

export const FeedbackOptions = ({ options, onLeaveFeedback }) => {
  return (
    <div className={css.buttonWrap}>
      {options.map(rateName => {
        const id = shortid.generate();
        return (
          <button
            key={id}
            onClick={() => {
              onLeaveFeedback(rateName);
            }}
            type="submit"
          >
            {rateName}
          </button>
        );
      })}
    </div>
  );
};

FeedbackOptions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onLeaveFeedback: PropTypes.func.isRequired,
};
