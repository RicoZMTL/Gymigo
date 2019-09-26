import React, { Component } from "react";
import { connect } from "react-redux";
class Matches extends Component {
  render() {
    return (
      <div>
        <h2>Matches with pictures were meant to go here!</h2>
        <h2>Filtered by profile preferences for when to workout.</h2>
        <h2>Not quite at a workable state :P</h2>
      </div>
    );
  }
}
export default connect()(Matches);
