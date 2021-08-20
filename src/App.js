import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { RenderRecipe } from "./components/RenderRecipe";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Header } from "./components/Header";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route path="/r/" component={RenderRecipe} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
