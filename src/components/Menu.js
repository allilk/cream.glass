import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth";
import { slide as Menu } from "react-burger-menu";

export const SideMenu = () => {
	const dispatch = useDispatch();
	let [visible, setVisible] = useState(false);
	const { user: currentUser } = useSelector((state) => state.auth);

	const toggleMenu = ({ isOpen }) => {
		const menuWrap = document.querySelector(".bm-menu-wrap");
		isOpen
			? menuWrap.setAttribute("aria-hidden", false)
			: menuWrap.setAttribute("aria-hidden", true);
	};
	const logOut = () => {
		dispatch(logout());
	};
	return (
		<Menu right noOverlay onStateChange={toggleMenu}>
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
		</Menu>
	);
};
