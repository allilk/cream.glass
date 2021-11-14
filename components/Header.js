import React, { useEffect } from "react";
import Link from "next/link";

import SideMenu from "./Menu";

const Header = () => {
	useEffect(() => {
		const menuWrap = document.querySelector(".bm-menu-wrap");
		if (menuWrap) {
			menuWrap.setAttribute("aria-hidden", true);
		}
	}, []);

	return (
		<div>
			<div className="px-8 py-6 align-middle bg-dark inline-flex w-full overflow-x-hidden">
				<div className="flex-1 place-items-start">
					<div className="inline text-xl -ml-4 noselect">
						<Link href="/">cream.glass</Link>
					</div>
					{/* <div className="invisible md:visible inline pl-6 space-x-2 text-sm font-semibold">
						<Link href="">Users</Link>
						<Link href="">Categories</Link>
						<Link href="">Explore</Link>
					</div> */}
				</div>
				<div className="flex-1 place-items-end align-middle mt-1 top-0">
					<SideMenu />
				</div>
			</div>
		</div>
	);
};

export default Header;
