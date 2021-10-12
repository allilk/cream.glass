import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth";

export const Menu = () => {
	const dispatch = useDispatch();
	let [visible, setVisible] = useState(false);
	const { user: currentUser } = useSelector((state) => state.auth);

	const changeVisibility = (event) => {
		event.preventDefault();
		if (!visible) {
			setVisible(true);
		} else {
			setVisible(false);
		}
	};
	const logOut = () => {
		dispatch(logout());
	};
	const theMenu = (
		<div className="bg-blue-400 p-10 py-6 ">
			<div className="space-y-2">
				<div>
					<Link to={"/u/" + currentUser.id}>My Profile</Link>
				</div>
				<div>
					<Link to="">My Recipes</Link>
				</div>
				<div>
					<Link to="">Settings</Link>
				</div>
				<div>
					<Link to="/" onClick={logOut}>
						Logout
					</Link>
				</div>
			</div>
		</div>
	);

	return (
		<div>
			<div
				className="text-2xl float-right -mt-2"
				onClick={changeVisibility}
			>
				≡
			</div>
			<br />
			{visible ? theMenu : ""}
		</div>
	);
};
