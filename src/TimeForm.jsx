import React, { Component } from "react";
import { connect } from "react-redux";
class TimeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availabilities: {
        earlymorning: {
          timeslot: "Early Morning",
          value: false,
          timetitle: "Before 08:00"
        },
        morning: {
          timeslot: "Morning",
          value: false,
          timetitle: "08:00 - 12:00"
        },
        afternoon: {
          timeslot: "Afternoon",
          value: false,
          timetitle: "12:00 - 16:00"
        },
        earlyevening: {
          timeslot: "Early Evening",
          value: false,
          timetitle: "16:00 - 18:00"
        },
        evening: { timeslot: "Evening", value: false, timetitle: "After 18:00" }
      },
      toggleAnytime: true
    };
  }

  handleTimeslot = time => {
    return () => {
      let newAvailabilities = { ...this.state.availabilities };
      newAvailabilities[time].value = !newAvailabilities[time].value;
      this.setState({ availabilities: newAvailabilities });
      console.log("toggled timeslot", this.state.availabilities[time].value);
    };
  };

  handleAnytime = () => {
    let newAvailabilities = { ...this.state.availabilities };
    Object.keys(newAvailabilities).forEach(time => {
      return (newAvailabilities[time].value = this.state.toggleAnytime);
    });
    this.setState({ availabilities: newAvailabilities });
    this.setState({ toggleAnytime: !this.state.toggleAnytime });
  };

  handleSubmitTime = event => {
    event.preventDefault();
    let newAvailabilities = { ...this.state.availabilities };
    let availArray = [];
    Object.keys(newAvailabilities).forEach(time => {
      availArray.push(newAvailabilities[time].value);
    });
    availArray.includes(true)
      ? this.props.dispatch({
          type: "timeFormComplete",
          profileTimePayload: this.state.availabilities
        })
      : alert("Please choose an option!");
  };

  render() {
    return (
      <div className="form">
        <h2>What time slots do you want work out?</h2>
        {Object.keys(this.state.availabilities).map(time => {
          return (
            <button
              key={this.state.availabilities[time].timeslot}
              className={
                this.state.availabilities[time].value
                  ? "button scheduleButtonClicked"
                  : "button"
              }
              onClick={this.handleTimeslot(time)}
            >
              <h4>{this.state.availabilities[time].timeslot}</h4>
              {this.state.availabilities[time].timetitle}
            </button>
          );
        })}

        <button
          className={
            this.state.toggleAnytime ? "button" : "button scheduleButtonClicked"
          }
          onClick={this.handleAnytime}
        >
          <h4>Anytime</h4>
        </button>
        <button onClick={this.handleSubmitTime}>Next</button>
      </div>
    );
  }
}
export default connect()(TimeForm);
