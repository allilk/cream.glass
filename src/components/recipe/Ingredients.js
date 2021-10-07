import React from "react";

export const Ingredients = (x) => {
	const ingredients = x.arr.map((item, i) => {
		return (
			<div key={i} className="space-x-4">
				<div className="inline font-semibold">
					{item.amount} {item.measure}
				</div>
				<div className="inline">{item.name}</div>
			</div>
		);
	});
	return (
		<div id="ingredients" className="grid grid-cols-2">
			<div className="col-span-2 md:col-span-1 text-xl text-center mb-6 md:mb-0">
				Ingredients
			</div>
			<div className="col-span-2 md:col-span-1 text-center md:text-left">
				{ingredients}
			</div>
		</div>
	);
};
