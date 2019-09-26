import React, { Component } from "react";
import { connect } from "react-redux";
class GymGoals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goals: {
        weightLoss: { goalName: "Weight Loss", value: false },
        hypertrophy: { goalName: "Hypertrophy", value: false },
        maintain: { goalName: "Maintain", value: false }
      }
    };
  }

  handleGoal = goal => {
    return () => {
      let newGoals = { ...this.state.goals };
      Object.keys(newGoals).forEach(keys => {
        newGoals[keys].value = false;
      });
      newGoals[goal].value = !newGoals[goal].value;
      this.setState({ goals: newGoals });
    };
  };

  handleSubmitGoals = event => {
    event.preventDefault();
    let newGoals = { ...this.state.goals };
    let goalsArray = [];
    Object.keys(newGoals).forEach(keys => {
      goalsArray.push(newGoals[keys].value);
    });
    goalsArray.includes(true)
      ? this.props.dispatch({
          type: "goalsFormComplete",
          profileGoalsPayload: this.state.goals
        })
      : alert("Please choose an option!");
  };

  render() {
    return (
      <div className="form">
        <h2>What is your main goal?</h2>
        {Object.keys(this.state.goals).map(goal => {
          return (
            <button
              key={this.state.goals[goal].goalName}
              className={
                this.state.goals[goal].value
                  ? "button scheduleButtonClicked"
                  : "button"
              }
              onClick={this.handleGoal(goal)}
            >
              <h4>{this.state.goals[goal].goalName}</h4>
            </button>
          );
        })}

        <button onClick={this.handleSubmitGoals}>Next</button>
      </div>
    );
  }
}
export default connect()(GymGoals);
