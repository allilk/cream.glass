import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import { Header } from "./components/Header";

import { Recipe } from "./components/recipe/Recipe";
import { Category } from "./components/recipe/Category";
import { Creator } from "./components/recipe/Creator";
import { Register } from "./components/auth/Register";
import { Login } from "./components/auth/Login";
import { Home } from "./components/Home";
import { AuthRoute } from "./AuthRoute";
import { Profile } from "./components/Profile";

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="App">
						<Header />
						<Switch>
							<Route
								exact
								path="/cat/:categoryId"
								component={Category}
							/>
							<AuthRoute
								exact
								path="/create"
								component={Creator}
							/>
							<Route exact path="/login" component={Login} />
							<Route
								exact
								path="/register"
								component={Register}
							/>
							<Route path="/u/:userId" component={Profile} />
							<Route exact path="/" component={Home} />
							<Route path="/:recipeId" component={Recipe} />
						</Switch>
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
