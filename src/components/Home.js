import React from "react";

import { Categories } from "./recipe/Categories";
import { Recipes } from "./recipe/Recipes";
import { Message } from "./Message";

export const Home = () => {
	return (
		<div className="">
			<div className="block space-y-0 ">
				<div className="pt-4">
					<Message />

					<div className="mx-4 pb-4 text-lg">Categories</div>

					<center>
						<Categories />
					</center>
					<br />
					<div className="mx-4 pb-4 text-lg">Recently Added</div>
					<Recipes from={1} to={5} />
				</div>
			</div>
		</div>
	);
};
