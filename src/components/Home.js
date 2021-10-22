import React from "react";

import { Categories } from "./recipe/Categories";
import { Recipes } from "./recipe/Recipes";
import { Message } from "./Message";

export const Home = () => {
	return (
		<div className="">
			<div className="block mx-4">
				<div className="pt-4">
					<Message />

					<div className="pb-4 text-lg font-semibold noselect">
						Categories
					</div>

					<Categories />

					<br />
					<div className="pb-4 text-lg font-semibold noselect">
						Recently Added
					</div>
					<Recipes from={1} to={7} />
				</div>
			</div>
		</div>
	);
};
