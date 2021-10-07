import { Recipes } from "./Recipes";
import { Message } from "../Message";
import React from "react";

export const Category = (x) => {
	const identifier = x.match.params.slug;
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
				<div className="text-lg pb-4">{convertName(identifier)}</div>
			</div>
			<Message />
			<Recipes from={1} to={20} category={identifier} />
		</>
	);
};
