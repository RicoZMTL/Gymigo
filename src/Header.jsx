import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SignupLogin from "./SignupLogin.jsx";

class UnconnectedHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      user: ""
    };
  }
  handleLogout = event => {
    event.preventDefault();
    this.props.dispatch({
      type: "logout"
    });
    this.setState({ loggedIn: false });
  };
  componentDidMount = async () => {
    event.preventDefault();
    await fetch("/userInfo", {
      method: "GET",
      body,
      credentials: "include"
    });
    return this.setState({ user: body.userProfile.fname });
  };

  render = () => {
    return (
      <div>
        {this.props.loggedIn === false ? (
          <div>
            <SignupLogin />
          </div>
        ) : (
          <div className="header">
            <div className="header">
              <div>GymiGo Logo</div>
              <div>Hello, {this.state.user}! </div>
              <button className="button"> Profile</button>
              <button className="button">Workouts</button>
              <button className="button" onClick={this.handleLogout}>
                Log out
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };
}
let mapStateToProps = state => {
  return { loggedIn: state.loggedIn };
};

let Header = connect(mapStateToProps)(UnconnectedHeader);
export default Header;
