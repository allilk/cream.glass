import React, { useState } from "react";
import Link from "next/link";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../actions/auth";
import { slide as Menu } from "react-burger-menu";

const SideMenu = (props) => {
	// const dispatch = useDispatch();
	// const { user: currentUser } = useSelector((state) => state.auth);
	const currentUser = false;
	const toggleMenu = ({ isOpen }) => {
		const menuWrap = document.querySelector(".bm-menu-wrap");
		isOpen
			? menuWrap.setAttribute("aria-hidden", false)
			: menuWrap.setAttribute("aria-hidden", true);
	};

	return (
		<Menu right noOverlay disableAutoFocus onStateChange={toggleMenu}>
			{currentUser ? (
				<div className="noselect outline-none">
					<div>
						<Link href="/create">Create New Recipe</Link>
					</div>
					<div>
						<Link href={"/u/"}>My Profile</Link>
					</div>
					<div>
						<Link href="/my-recipes">My Recipes</Link>
					</div>

					<div>
						<Link href="/settings">Settings</Link>
					</div>
					<div>
						<Link href="/">Logout</Link>
					</div>
				</div>
			) : (
				<div className="noselect outline-none">
					<div>
						<Link href="/login">Login</Link>
					</div>

					<div>
						<Link href="/register">Register</Link>
					</div>
				</div>
			)}
		</Menu>
	);
};

export default SideMenu;
