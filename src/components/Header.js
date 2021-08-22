import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../actions/auth";
import { history } from "./helpers/history";

export const Header = () => {
	const { user: currentUser } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		history.listen((location) => {
			dispatch(clearMessage());
		});
	}, [dispatch]);

	const logOut = () => {
		dispatch(logout());
	};
	return (
		<div>
			<div className="text-white p-4 bg-blue-300">
				<div className="inline absolute left-0 top-0 py-4 mx-4">
					<Link to="">cream.glass</Link>
				</div>
				<div className={currentUser ? " " : "hidden"}>
					<div className="inline-flex absolute right-0 mx-4 space-x-8">
						<div className="">
							<Link className="" to="/create">
								➕
							</Link>
						</div>
						<div>
							<Link className="" to="/login" onClick={logOut}>
								Logout
							</Link>
						</div>
					</div>
				</div>
				<div className={currentUser ? "hidden" : ""}>
					<div className="inline-flex absolute right-0 mx-4 space-x-6">
						<div>
							<Link to="/login">Login</Link>
						</div>
						<div>
							<Link to="/register">Register</Link>
						</div>
					</div>
				</div>
				<br />
			</div>
		</div>
	);
};
