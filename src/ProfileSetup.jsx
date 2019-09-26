import React, { Component } from "react";
import { connect } from "react-redux";
import store from "./store.js";
import ProfileNameInput from "./ProfileNameInput.jsx";
import ScheduleForm from "./ScheduleForm.jsx";
import TimeForm from "./TimeForm.jsx";
import GymGoals from "./GymGoals.jsx";
import ExperienceLevel from "./ExperienceLevel.jsx";

class ProfileSetup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  completeHandler = async evt => {
    evt.preventDefault();
    this.props.dispatch({ type: "complete" });
    console.log("profile completed!");
    let body = new FormData();
    body.append("firstName", this.props.firstName);
    body.append("lastName", this.props.lastName);
    body.append(
      "availabilitiesSchedule",
      JSON.stringify(this.props.availabilitiesSchedule)
    );
    body.append(
      "availabilitiesTime",
      JSON.stringify(this.props.availabilitiesTime)
    );
    body.append("profileGoals", JSON.stringify(this.props.profileGoals));
    body.append("profileExp", JSON.stringify(this.props.profileExp));
    body.append("profileComplete", this.props.profileComplete);
    await fetch("/profileComplete", {
      method: "POST",
      body,
      credentials: "include"
    });
    console.log(body);
  };
  render() {
    return this.props.exp ? (
      <div className="form">
        <h2>Congratulations! Let's workout!</h2>
        <button
          className="button scheduleButtonClicked"
          onClick={this.completeHandler}
        >
          Complete
        </button>
      </div>
    ) : this.props.goals ? (
      <div>
        <ExperienceLevel />
      </div>
    ) : this.props.time ? (
      <div>
        <GymGoals />
      </div>
    ) : this.props.schedule ? (
      <div>
        <TimeForm />
      </div>
    ) : this.props.name ? (
      <div>
        <ScheduleForm />
      </div>
    ) : (
      <div>
        <ProfileNameInput />
      </div>
    );
  }
}
let mapStateToProps = st => {
  return {
    name: st.nameFormComplete,
    firstName: st.firstName,
    lastName: st.lastName,
    schedule: st.scheduleFormComplete,
    availabilitiesSchedule: st.availabilitiesSchedule,
    time: st.timeFormComplete,
    availabilitiesTime: st.availabilitiesTime,
    goals: st.goalsFormComplete,
    profileGoals: st.profileGoals,
    exp: st.experienceFormComplete,
    profileExp: st.profileExp,
    profileComplete: st.profileComplete
  };
};
export default connect(mapStateToProps)(ProfileSetup);
