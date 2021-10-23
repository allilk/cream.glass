import React from "react";
import { useParams } from "react-router-dom";

import { Recipes } from "./Recipes";
import { Message } from "../Message";

import { convertName } from "../helpers/format";

export const Category = () => {
	const { categoryId } = useParams();

	return (
		<>
			<div />
			<div className="mx-4 pt-4">
				<div className="pb-4 text-lg font-semibold noselect">
					{convertName(categoryId)}
				</div>
				<Message />
				<Recipes from={1} to={20} category={categoryId} />
			</div>
		</>
	);
};
