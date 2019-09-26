import React, { Component } from "react";
import { connect } from "react-redux";
import Matches from "./Matches.jsx";
import Header from "./Header.jsx";
class Frontpage extends Component {
  render() {
    return (
      <div>
        <div>
          <Header />
        </div>
        <div>
          <Matches />
        </div>
      </div>
    );
  }
}
export default connect()(Frontpage);
