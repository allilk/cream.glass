import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import { Header } from "./components/Header";

import { RenderRecipe } from "./components/recipe/RenderRecipe";
import { Creator } from "./components/recipe/Creator";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
// import { Profile } from "./components/Profile"

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="App">
						<Header />
						<Switch>
							<Route path="/r/:slug" component={RenderRecipe} />
							<Route path="/create" component={Creator} />
							<Route path="/login" component={Login} />
							<Route path="/register" component={Register} />
							{/* <Route path="/profile" component={Profile}/> */}
							<Route path="/" component={Home} />
						</Switch>
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
