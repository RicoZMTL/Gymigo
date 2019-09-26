import React, { Component } from "react";
import { connect } from "react-redux";
class ProfileNameInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: ""
    };
  }
  handleFirstNameChange = event => {
    console.log("first name", event.target.value);
    this.setState({ firstName: event.target.value });
  };
  handleLastNameChange = event => {
    console.log("first name", event.target.value);
    this.setState({ lastName: event.target.value });
  };
  handleSubmitNameProfile = async event => {
    event.preventDefault();
    this.props.dispatch({
      type: "nameFormComplete",
      profileNamePayload: this.state
    });
  };
  render() {
    return (
      <div className="form">
        <h2>Tell us your name! </h2>
        <form onSubmit={this.handleSubmitNameProfile}>
          <input
            type="text"
            name="firstName"
            onChange={this.handleFirstNameChange}
            placeholder="First Name"
            required
          />

          <input
            type="text"
            name="lastName"
            onChange={this.handleLastNameChange}
            placeholder="Last Name"
            required
          />

          <button type="submit">Next</button>
        </form>
      </div>
    );
  }
}
export default connect()(ProfileNameInput);
