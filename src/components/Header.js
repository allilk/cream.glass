import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { clearMessage } from "../actions/message";
import { SideMenu } from "./Menu";

export const Header = () => {
	const dispatch = useDispatch();
	const location = useLocation();

	useEffect(() => {
		dispatch(clearMessage());
		const menuWrap = document.querySelector(".bm-menu-wrap");
		if (menuWrap) {
			menuWrap.setAttribute("aria-hidden", true);
		}
	}, [location]);

	return (
		<div>
			<div className="px-8 py-6 align-middle bg-dark inline-flex w-full overflow-x-hidden">
				<div className="flex-1 place-items-start">
					<div className="inline text-xl -ml-4 noselect">
						<Link to="">cream.glass</Link>
					</div>
					<div className="invisible md:visible inline pl-6 space-x-2 text-sm font-semibold">
						<Link to="">Users</Link>
						<Link to="">Categories</Link>
						<Link to="">Explore</Link>
					</div>
				</div>
				<div className="flex-1 place-items-end align-middle mt-1">
					<SideMenu />
				</div>
			</div>
		</div>
	);
};
