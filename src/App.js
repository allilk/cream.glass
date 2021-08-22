import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { RenderRecipe } from "./components/RenderRecipe";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import { Header } from "./components/Header";
import { Creator } from "./components/Creator";
// import { Register } from "./components/Register"
import { Login } from "./components/Login";
// import { Profile } from "./components/Profile"

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="App">
						<Header />
						<Switch>
							<Route path="/r/" component={RenderRecipe} />
							<Route path="/create" component={Creator} />
							{/* <Route path="/register" component={Register}/> */}
							<Route path="/login" component={Login} />
							{/* <Route path="/profile" component={Profile}/> */}
						</Switch>
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
