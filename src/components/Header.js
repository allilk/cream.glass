import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Header extends Component {
  render() {
    return (
      <div>
        <div style={{ backgroundColor: "#b2d5eb" }} className="text-white p-4">
          <div className="inline absolute left-0 top-0 py-4 mx-4">
            <Link to="">cream.glass</Link>
          </div>
          <div className="inline absolute right-0 top-0 text-2xl py-2 mx-4">
            <Link to="/create">+</Link>
          </div>
          <br />
        </div>
      </div>
    );
  }
}
