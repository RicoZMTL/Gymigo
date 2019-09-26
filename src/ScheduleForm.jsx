import React, { Component } from "react";
import { connect } from "react-redux";
class ScheduleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availabilities: {
        Sunday: false,
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false
      },
      toggleEveryday: true
    };
  }

  handleAvailability = day => {
    return () => {
      let newAvailabilities = { ...this.state.availabilities };
      newAvailabilities[day] = !newAvailabilities[day];

      this.setState({ availabilities: newAvailabilities });
      console.log("toggled weekday", this.state.availabilities);
    };
  };

  handleEveryday = () => {
    let newAvailabilities = { ...this.state.availabilities };
    let availabilities = Object.values(newAvailabilities);
    let toggle = availabilities.some(day => day === false) ? true : false;
    for (var day in newAvailabilities) {
      newAvailabilities[day] = toggle;
    }
    this.setState({ availabilities: newAvailabilities });
    this.setState({ toggleEveryday: !this.state.toggleEveryday });
  };
  handleSubmitSchedule = async event => {
    event.preventDefault();
    let newAvailabilities = { ...this.state.availabilities };
    let availabilities = Object.values(newAvailabilities);
    let formFilled = availabilities.includes(true);
    formFilled
      ? this.props.dispatch({
          type: "scheduleFormComplete",
          profileSchedulePayload: this.state
        })
      : alert("Please choose an option!");
  };

  render() {
    return (
      <div className="form">
        <h2>What days do you want work out?</h2>
        {Object.keys(this.state.availabilities).map(day => {
          return (
            <button
              key={day}
              className={
                this.state.availabilities[day]
                  ? "button scheduleButtonClicked"
                  : "button"
              }
              onClick={this.handleAvailability(day)}
            >
              {day}
            </button>
          );
        })}

        <button
          className={
            this.state.toggleEveryday
              ? "button"
              : "button scheduleButtonClicked"
          }
          onClick={this.handleEveryday}
        >
          <h4> Everyday</h4>
        </button>
        <button onClick={this.handleSubmitSchedule}>Next</button>
      </div>
    );
  }
}
export default connect()(ScheduleForm);
