import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export class Location extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.onSubmit}>
          <input type="text" name="city" />
          <br></br>
          <input type="submit" name="submit" value="Explore!" />
        </form>
        <p>City: {this.props.display_name}</p>
        <img src={this.props.source} alt={this.props.display_name} />
      </div>
    );
  }
}

export default Location;
