import { Component } from 'react';
import css from './app.module.css';

import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from './Section/Section';
import { NotificationMessage } from './NotificationMessage/NotificationMessage';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  elements = Object.keys(this.state);

  countTotalFeedback() {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  }

  countPositiveFeedbackPercentage() {
    const { good } = this.state;
    const total = this.countTotalFeedback();
    if (!total) {
      return 0;
    }
    const result = (good / total) * 100;
    return Number(result.toFixed(2));
  }

  onLeaveFeedback = rateName => {
    this.setState(prevState => {
      const value = prevState[rateName];

      return {
        [rateName]: value + 1,
      };
    });
  };

  render() {
    const { bad, good, neutral } = this.state;
    const total = this.countTotalFeedback();
    const positivePercentage = this.countPositiveFeedbackPercentage();

    return (
      <div className={css.wrap}>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={this.elements}
            onLeaveFeedback={this.onLeaveFeedback}
          />
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
              positivePercentage={positivePercentage}
            />
          )}
        </Section>
      </div>
    );
  }
}
