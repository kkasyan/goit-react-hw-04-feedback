import { useState } from 'react';
import css from './app.module.css';
import PropTypes from 'prop-types';

import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from './Section/Section';
import { NotificationMessage } from './NotificationMessage/NotificationMessage';

export const App = () => {
  const [state, setState] = useState({ good: 0, neutral: 0, bad: 0 });

  const elements = Object.keys(state);

  const { bad, good, neutral } = state;
  const total = good + neutral + bad;

  const countPositiveFeedbackPercentage = () => {
    if (!total) {
      return 0;
    }

    const result = (good / total) * 100;
    return Number(result.toFixed(2));
  };

  const onLeaveFeedback = rateName => {
    setState(prevState => {
      const value = prevState[rateName];

      return {
        ...prevState,
        [rateName]: value + 1,
      };
    });
  };

  return (
    <div className={css.wrap}>
      <Section title="Please leave feedback">
        <FeedbackOptions options={elements} onLeaveFeedback={onLeaveFeedback} />
      </Section>
      <Section title="Statistics">
        {!total ? (
          <NotificationMessage message={'There is no feedback!'} />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        )}
      </Section>
    </div>
  );
};

App.propTypes = {
  countPositiveFeedbackPercentage: PropTypes.func,
  onLeaveFeedback: PropTypes.func,
};
