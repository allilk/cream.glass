import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth";
import { slide as Menu } from "react-burger-menu";

export const SideMenu = () => {
	const dispatch = useDispatch();
	const { user: currentUser } = useSelector((state) => state.auth);

	const toggleMenu = ({ isOpen }) => {
		const menuWrap = document.querySelector(".bm-menu-wrap");
		isOpen
			? menuWrap.setAttribute("aria-hidden", false)
			: menuWrap.setAttribute("aria-hidden", true);
	};
	const logOut = () => {
		window.location.reload();
		dispatch(logout());
	};

	return (
		<Menu right noOverlay disableAutoFocus onStateChange={toggleMenu}>
			{currentUser ? (
				<div className="noselect outline-none">
					<div>
						<Link to="/create">Create New Recipe</Link>
					</div>
					<div>
						<Link to={"/u/" + currentUser.id}>My Profile</Link>
					</div>
					<div>
						<Link to="/my-recipes">My Recipes</Link>
					</div>

					<div>
						<Link to="/settings">Settings</Link>
					</div>
					<div>
						<Link to="/" onClick={logOut}>
							Logout
						</Link>
					</div>
				</div>
			) : (
				<div className="noselect outline-none">
					<div>
						<Link to="/login">Login</Link>
					</div>

					<div>
						<Link to="/register">Register</Link>
					</div>
				</div>
			)}
		</Menu>
	);
};
