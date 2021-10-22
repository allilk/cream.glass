import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, useParams } from "react-router-dom";
import { Error404 } from "./components/Error";

export function AuthRoute({ component: Component, ...rest }) {
	const { isLoggedIn: auth } = useSelector((state) => state.auth);
	return (
		<Route
			{...rest}
			render={(props) =>
				auth === true ? (
					<Component {...props} />
				) : (
					<Redirect to="/login" />
				)
			}
		/>
	);
}
export function RecipeRoute({ component: Component, ...rest }) {
	const regex = /^[a-zA-Z0-9]+/g;

	return (
		<Route
			{...rest}
			render={(props) => {
				const { recipeId } = props.match.params;
				return recipeId.match(regex, recipeId)[0].length === 5 ? (
					<Component {...props} />
				) : (
					<Error404 {...props} />
				);
			}}
		/>
	);
}
