import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../actions/auth";
import { clearMessage } from "../actions/message";
import { Menu } from "./Menu";

export const Header = (props) => {
	const { user: currentUser } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const location = useLocation();

	useEffect(() => {
		dispatch(clearMessage());
	}, [location]);
	const logOut = () => {
		dispatch(logout());
	};
	return (
		<div>
			<div className="text-white p-4 bg-blue-400">
				<div className="inline absolute left-0 top-0 py-4 mx-4">
					<Link to="">cream.glass</Link>
					<div className="inline-flex pl-6 space-x-2 text-sm font-semibold">
						<Link to="">Users</Link>
						<Link to="">Categories</Link>
						<Link to="">Explore</Link>
					</div>
				</div>
				<div className={currentUser ? "" : "hidden"}>
					<div className="inline-flex absolute right-0 mx-4 space-x-8">
						{/* <div className="text-4xl -mt-3">
							<Link className="" to="/create">
								+
							</Link>
						</div> */}
						<div className="text-md">
							{currentUser ? <Menu /> : ""}
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
