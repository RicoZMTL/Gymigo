import React, { Component } from "react";
import { connect } from "react-redux";
class SignupLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      hidden: true,
      signupToggle: false
    };
  }
  handleEmailChange = event => {
    console.log("new email", event.target.value);
    this.setState({ email: event.target.value });
  };
  handlePasswordChange = event => {
    console.log("new password", event.target.value);
    this.setState({ password: event.target.value });
  };
  handleSubmitLogin = async evt => {
    evt.preventDefault();
    console.log("login form submitted");
    let body = new FormData();
    body.append("email", this.state.email);
    body.append("password", this.state.password);
    let response = await fetch("/login", {
      method: "POST",
      body,
      credentials: "include"
    });
    let responseBody = await response.text();
    console.log("responseBody from login", responseBody);
    let resBody = JSON.parse(responseBody);
    if (!resBody.success) {
      alert("login failed");
      return;
    }
    this.props.dispatch({ type: "login" });
  };
  handleSubmitSignup = async evt => {
    evt.preventDefault();
    console.log("signup form submitted");
    let body = new FormData();
    body.append("email", this.state.email);
    body.append("password", this.state.password);
    let response = await fetch("/signup", {
      method: "POST",
      body,
      credentials: "include"
    });
    let responseBody = await response.text();
    let resBody = JSON.parse(responseBody);
    if (!resBody.success) {
      alert("Username already exists!");
      return;
    }
  };
  handleToggleShow = () => {
    console.log("toggled hidden password");
    this.setState({ hidden: !this.state.hidden });
  };

  signupToggle = () => {
    console.log(this.state.signupToggle);
    this.setState({ signupToggle: !this.state.signupToggle });
  };

  render() {
    return this.state.signupToggle ? (
      <div className="login-page">
        <div className="form">
          <h2>Signup</h2>
          <form onSubmit={this.handleSubmitSignup} className="register-form">
            <input
              type="email"
              name="usremail"
              onChange={this.handleEmailChange}
              placeholder="Enter your email..."
              required
            />

            <input
              type={this.state.hidden ? "password" : "text"}
              name="current-password"
              onChange={this.handlePasswordChange}
              placeholder="Enter your password..."
              required
            />

            <input
              id="show-password"
              type="checkbox"
              onChange={this.handleToggleShow}
              hidden
            />
            <label for="show-password">Show Password</label>
            <button type="submit" className="signin-button">
              Signup!
            </button>
          </form>
          <p>Already registered?</p>
          <p className="message" onClick={this.signupToggle}>
            Sign in
          </p>
        </div>
      </div>
    ) : (
      <div className="login-page">
        <div className="form">
          <h2>Login </h2>
          <form onSubmit={this.handleSubmitLogin} className="login-form">
            <input
              type="text"
              name="email"
              onChange={this.handleEmailChange}
              placeholder="Enter your email..."
              required
            />

            <input
              type="password"
              name="current-password"
              onChange={this.handlePasswordChange}
              placeholder="Enter your password..."
            />

            <button type="submit" className="signin-button">
              Login!
            </button>
          </form>
          <p>Not registered? </p>
          <p className="message" onClick={this.signupToggle}>
            Create an account{" "}
          </p>
        </div>
      </div>
    );
  }
}
export default connect()(SignupLogin);
