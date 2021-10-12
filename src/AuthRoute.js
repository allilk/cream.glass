import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export function AuthRoute({ component: Component, ...rest }) {
	const { isLoggedIn: auth } = useSelector((state) => state.auth);
	return (
		<Route
			{...rest}
			render={(props) =>
				auth === true ? (
					<Component {...props} />
				) : (
					props.history.push("/login")
				)
			}
		/>
	);
}
