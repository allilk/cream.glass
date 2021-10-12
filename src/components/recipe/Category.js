import React from "react";
import { useParams } from "react-router-dom";

import { Recipes } from "./Recipes";
import { Message } from "../Message";
export const Category = () => {
	const { categoryId } = useParams();
	const convertName = (name) => {
		if (name) {
			return (
				name.charAt(0).toUpperCase() + name.slice(1).replace("_", " ")
			);
		}
	};
	return (
		<>
			<div />
			<div className="mx-4 pt-4">
				<div className="text-lg pb-4">{convertName(categoryId)}</div>
			</div>
			<Message />
			<Recipes from={1} to={20} category={categoryId} />
		</>
	);
};
