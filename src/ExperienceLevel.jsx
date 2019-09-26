import React, { Component } from "react";
import { connect } from "react-redux";
class ExperienceLevel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      experience: {
        Beginner: { expTime: "<1 year", value: false },
        Intermediate: { expTime: "2-3 years", value: false },
        Advanced: { expTime: "4+ years", value: false }
      }
    };
  }

  handleExperience = exp => {
    return () => {
      let newExp = { ...this.state.experience };
      Object.keys(newExp).forEach(keys => {
        newExp[keys].value = false;
      });

      newExp[exp].value = !newExp[exp].value;
      this.setState({ experience: newExp });
    };
  };

  handleSubmitExperience = event => {
    event.preventDefault();
    let newExp = { ...this.state.experience };
    let expArray = [];
    Object.keys(newExp).forEach(keys => {
      expArray.push(newExp[keys].value);
    });

    expArray.includes(true)
      ? this.props.dispatch({
          type: "experienceFormComplete",
          profileExpPayload: this.state.experience
        })
      : alert("Please choose an option!");
  };
  render() {
    return (
      <div className="form">
        <h2>What is your experience level?</h2>
        {Object.keys(this.state.experience).map(exp => {
          return (
            <button
              key={this.state.experience[exp].expTime}
              className={
                this.state.experience[exp].value
                  ? "button scheduleButtonClicked"
                  : "button"
              }
              onClick={this.handleExperience(exp)}
            >
              <h4>{exp}</h4>
              {this.state.experience[exp].expTime}
            </button>
          );
        })}

        <button onClick={this.handleSubmitExperience}>Next</button>
      </div>
    );
  }
}
export default connect()(ExperienceLevel);
