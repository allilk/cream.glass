import React, { useEffect, useState } from "react";
import Link from "next/link";
import { slide as Menu } from "react-burger-menu";
import { getSession, signOut } from "next-auth/client";

const SideMenu = () => {
	const [user, setUser] = useState();

	useEffect(async () => {
		const resp = await getSession();
		if (resp) {
			setUser(resp.user);
		}
	}, []);

	const toggleMenu = ({ isOpen }) => {
		const menuWrap = document.querySelector(".bm-menu-wrap");
		isOpen
			? menuWrap.setAttribute("aria-hidden", false)
			: menuWrap.setAttribute("aria-hidden", true);
	};

	return (
		<Menu right noOverlay disableAutoFocus onStateChange={toggleMenu}>
			{user ? (
				<div className="noselect outline-none">
					<div>
						<Link href="/create">Create New Recipe</Link>
					</div>
					<div>
						<Link href={`/u/${user.id}`}>My Profile</Link>
					</div>
					<div>
						<Link href="/my-recipes">My Recipes</Link>
					</div>

					<div>
						<Link href="/settings">Settings</Link>
					</div>
					<div className="cursor-pointer" onClick={() => signOut()}>
						Logout
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
