// broken currently

import React, { useEffect, useState } from "react";
import { getRecipe } from "./recipe/getRecipe";
import { useSelector } from "react-redux";
export const RenderRecipe = (identifier) => {
	const { user: currentUser } = useSelector((state) => state.auth);
	let result = {};
	useEffect(async () => {
		await getRecipe("W40nO", currentUser.token).then((x) => {
			result = x;
		});
	}, []);
	const items = result ? (
		[result].map((item, i) => {
			return <div key={i}>{item.title}</div>;
		})
	) : (
		<div>Loading</div>
	);
	console.log(items);
	return (
		<div>
			<div className="">
				<div id="title" className="my-4 text-4xl text-center">
					{items}
				</div>
				<center>
					<hr className="w-5/6 md:w-2/3" />
				</center>
				<br />
				<div id="ingredients" className="grid grid-cols-2">
					<div className="col-span-2 md:col-span-1 text-xl text-center mb-6 md:mb-0">
						Ingredients
					</div>
					<div className="col-span-2 md:col-span-1 text-center md:text-left">
						<div className="space-x-4">
							<div className="inline font-semibold">
								measurement
							</div>
							<div className="inline">ingredient.1</div>
						</div>
						<div className="space-x-4">
							<div className="inline font-semibold">
								measurement
							</div>
							<div className="inline">ingredient.2</div>
						</div>
						<div className="space-x-4">
							<div className="inline font-semibold">
								measurement
							</div>
							<div className="inline">ingredient.3</div>
						</div>
					</div>
				</div>
				<br />
				<center>
					<hr className="w-5/6 md:w-2/3" />
				</center>
				<br />
				<div id="steps" className="">
					<div className="text-xl text-center mb-6 md:mb-0">
						Steps
					</div>
				</div>
			</div>
		</div>
	);
};
