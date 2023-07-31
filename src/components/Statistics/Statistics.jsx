import React from 'react';
import { FeedbackClients } from 'components/Feedback/feedbackclient';
import { ButtonFeedBack } from 'components/buttonsfeedback/buttons';

class Statistics extends React.Component {

  state = {
    good: 0,
    neutral: 0,
    bad: 0,
    total: 0,
  };

  handleClick = feedbackType => {
    this.setState(prevState => ({
      [feedbackType]: prevState[feedbackType] + 1,
      visible: true,
    }));
  };

  countTotalFeedback = event => {
    const { target } = event;
    if (target.type !== 'button') {
      return;
    }
    this.setState(prevState => ({
      total: prevState.total + 1,
    }));
  };

  countPositiveFeedbackPercentage = () => {
    const { good } = this.state;
    if (this.state.total === 0) {
      return 0;
    }
    return Math.round((good / this.state.total) * 100);
  };

  render() {
    return (
      <div>
        <h1>Please leave feedback</h1>
        <ButtonFeedBack
          onTotalFeedback={this.countTotalFeedback}
          handleClick={this.handleClick}
        />

        <h2>Statistics</h2>

        {this.state.visible ? (
          <FeedbackClients
            onCountPositive={this.countPositiveFeedbackPercentage}
            good={this.state.good}
            bad={this.state.bad}
            neutral={this.state.neutral}
            total={this.state.total}
          />
        ) : (
          <p>There is no feedback</p>
        )}
      </div>
    );
  }
}

export default Statistics;
