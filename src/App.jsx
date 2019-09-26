import React, { Component } from "react";
import { connect } from "react-redux";
import SignupLogin from "./SignupLogin.jsx";
import Frontpage from "./Frontpage.jsx";
import ProfileSetup from "./ProfileSetup.jsx";
import { store } from "./store.js";
class UnconnectedApp extends Component {
  render = () => {
    return this.props.login ? (
      this.props.profileComplete ? (
        <div>
          <Frontpage />
        </div>
      ) : (
        <ProfileSetup />
      )
    ) : (
      <div>
        <h2 className="front-title">GymiGo</h2>
        <SignupLogin />
      </div>
    );
  };
}
let mapStateToProps = state => {
  return { login: state.loggedIn, profileComplete: state.profileComplete };
};
let App = connect(mapStateToProps)(UnconnectedApp);
export default App;
